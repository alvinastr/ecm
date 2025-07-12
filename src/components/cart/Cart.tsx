'use client';

import { createCheckoutSession } from '@/actions/stripe-action';
import { formatPrice, STRIPE_MINIMUM_AMOUNT_IDR } from '@/lib/utils';
import { trackRemoveFromCart } from '@/lib/analytics';
import { trackClientEvent } from '@/lib/umami';
import { useCartStore, type CartItem as CartItemType } from '@/stores/cart-store';
import { Loader2, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const freeShippingAmount = 100000; // 100,000 IDR for free shipping (approximately $6.25)

const CartItem = ({item}: {item: CartItemType}) => {
    const { removeItem, updateQuantity } = useCartStore(
        useShallow((state) => ({
            removeItem: state.removeItem,
            updateQuantity: state.updateQuantity,
        }))
    );

    const isFreeItem = item.price === 0;

    const handleRemoveItem = async (id: string) => {
        // Track remove from cart
        try {
            trackRemoveFromCart({
                productId: id,
                productTitle: item.title,
                quantity: item.quantity,
            });
        } catch (error) {
            console.warn('Failed to track remove from cart:', error);
        }
        
        await removeItem(id);
    };

    return (
        <div key={`cart-item-${item.id}`} className='flex gap-4 p-4 hover:bg-gray-50'>
            <div className='relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border'>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover'
                />
            </div>

            <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-gray-900 truncate'>
                    {item.title}
                </h3>
                <div className='text-sm text-gray-500 mt-1'>
                    {isFreeItem ? (
                        <span className='text-emerald-600 font-medium'>FREE</span>
                    ) : (
                        formatPrice(item.price)
                    )}
                </div>
                <div className='flex items-center gap-3 mt-2'>
                    {isFreeItem ? (
                        <div className='text-sm text-emerald-600 font-medium'>
                            Prize Item
                        </div>
                    ) : (
                        <>
                            <select
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                className='border rounded-md px-2 py-1 text-sm bg-white'
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={`cart-qty-slct-${item.id}-${num}`} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className='text-red-500 text-sm hover:text-red-600'
                            >
                                Remove
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

const Cart = () => {
    const { cartId, items, close, isOpen, syncWithUser, setLoaded, getTotalPrice, getTotalItems } = useCartStore(
        useShallow((state) => ({
            cartId: state.cartId,
            items: state.items,
            close: state.close,
            isOpen: state.isOpen,
            syncWithUser: state.syncWithUser,
            setLoaded: state.setLoaded,
            getTotalPrice: state.getTotalPrice,
            getTotalItems: state.getTotalItems,
        }))
    );

    useEffect(() => {
        const initCart = async () => {
            await useCartStore.persist.rehydrate();
            await syncWithUser();
            setLoaded(true);
        };

        initCart();
    }, [setLoaded, syncWithUser]);

    const [loadingProceed, setLoadingProceed] = useState<boolean>(false);
    const handleProceedToCheckout = async () => {
        if(!cartId || loadingProceed) {
            return;
        }
        
        // Validate minimum amount before proceeding
        const totalPrice = getTotalPrice();
        
        if (totalPrice < STRIPE_MINIMUM_AMOUNT_IDR) {
            alert(`Minimum checkout amount is ${formatPrice(STRIPE_MINIMUM_AMOUNT_IDR)}. Please add more items to your cart.`);
            return;
        }
        
        setLoadingProceed(true);
        
        try {
            console.log('Starting checkout process with cartId:', cartId);
            console.log('Total amount:', totalPrice, 'IDR');
            
            const checkoutUrl = await createCheckoutSession(cartId);
            console.log('Checkout URL received:', checkoutUrl);

            // Track checkout event
            try {
                trackClientEvent('proceed_to_checkout', {
                    cartId: cartId,
                    totalPrice: getTotalPrice(),
                    currency: 'IDR',
                });
            } catch(trackingError) {
                console.warn('Analytics tracking failed:', trackingError);
            }

            // Redirect to Stripe checkout
            window.location.href = checkoutUrl;
            
        } catch (error) {
            console.error('Checkout failed:', error);
            console.error('Error details:', {
                name: error instanceof Error ? error.name : 'Unknown',
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : 'No stack trace',
                cartId,
                totalPrice: getTotalPrice(),
                itemCount: items.length
            });
            setLoadingProceed(false);
            
            // Show user-friendly error message
            const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session. Please try again.';
            alert(`Checkout Error: ${errorMessage}`);
        }
    }

    const totalPrice = getTotalPrice();

    const remainingForFreeShipping = useMemo(() => {
        return Math.max(0, freeShippingAmount - totalPrice);
    }, [totalPrice]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className='fixed inset-0  bg-opacity-50 z-50 transition-opacity backdrop-blur-sm'
                    onClick={close}
                />
            )}

            {/* Cart Drawer */}
            <div
                className={`
                    fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out z-50
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className='flex flex-col h-full'>
                    {/* Cart Header */}
                    <div className='flex items-center justify-between p-4 border-b bg-gray-50'>
                        <div className='flex items-center gap-2'>
                            <ShoppingCart className='w-5 h-5' />
                            <h2 className='text-lg font-semibold'>Shopping Cart</h2>
                            <span className='bg-gray-200 px-2 py-1 rounded-full text-sm font-medium'>
                                {getTotalItems()}
                            </span>
                        </div>
                        <button
                            onClick={close}
                            className='p-2 hover:bg-gray-200 rounded-full transition-colors'
                        >
                            <X className='w-5 h-5' />
                        </button>
                    </div>
                    
                    {/* Cart Items */}
                    <div className='flex-1 overflow-y-auto'>
                        {items.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                                    <ShoppingCart className='w-8 h-8 text-gray-400' />
                                </div>
                                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                    Your cart is empty
                                </h3>
                                <p className='text-gray-500 mb-6'>
                                    Looks like you have not added any items to your cart yet!
                                </p>
                                <Link
                                    href="/"
                                    onClick={close}
                                    className='bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors'
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className='divide-y'>
                                {items.map((item) => (
                                    <CartItem key={'cart-item-'+item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Footer */}
                    {items.length > 0 && (
                        <div className='border-t'>
                            {/* Shipping progress */}
                            {remainingForFreeShipping > 0 ? (
                                <div className='p-4 bg-blue-50 border-b'>
                                    <div className='flex items-center gap-2 text-blue-800 mb-2'>
                                        <span>🚚</span>
                                        <span className='font-medium'>
                                            Add {formatPrice(remainingForFreeShipping)} more for FREE shipping
                                        </span>
                                    </div>
                                    <div className='w-full bg-blue-200 rounded-full h-2'>
                                        <div
                                            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                                            style={{ width: `${Math.min(100, (totalPrice / freeShippingAmount) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='p-4 bg-green-50 border-b'>
                                    <div className='flex items-center gap-2 text-green-800'>
                                        <span>✨</span>
                                        <span className='font-medium'>
                                            You have unlocked FREE shipping!
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Order summary & checkout */}
                            <div className='p-4 space-y-4'>
                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-500'>Subtotal</span>
                                        <span className='font-medium'>{formatPrice(totalPrice)}</span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-500'>Shipping</span>
                                        <span className='font-medium'>
                                            {remainingForFreeShipping > 0 ? 'Calculated at checkout' : 'FREE'}
                                        </span>
                                    </div>
                                </div>

                                <div className='border-t pt-4'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <span className='font-medium text-lg'>Total</span>
                                        <span className='font-bold text-lg'>{formatPrice(totalPrice)}</span>
                                    </div>

                                    {/* Minimum amount warning */}
                                    {totalPrice < STRIPE_MINIMUM_AMOUNT_IDR && (
                                        <div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
                                            <div className='flex items-center gap-2 text-yellow-800 text-sm'>
                                                <span>⚠️</span>
                                                <span className='font-medium'>
                                                    Minimum checkout amount is {formatPrice(STRIPE_MINIMUM_AMOUNT_IDR)}. 
                                                    Add {formatPrice(STRIPE_MINIMUM_AMOUNT_IDR - totalPrice)} more to proceed.
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className={`w-full py-4 rounded-full font-bold transition-colors flex items-center justify-center ${
                                            totalPrice < STRIPE_MINIMUM_AMOUNT_IDR 
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                                : 'bg-black text-white hover:bg-gray-900'
                                        }`}
                                        onClick={handleProceedToCheckout}
                                        disabled={loadingProceed || totalPrice < STRIPE_MINIMUM_AMOUNT_IDR}
                                    >
                                        {loadingProceed ? (
                                            <div className='flex items-center gap-1'>
                                                Navigating to checkout...
                                                <Loader2 className='w-4 h-4 animate-spin' />
                                            </div>
                                        ) : 'Proceed to Checkout'}
                                    </button>

                                    <div className='mt-4 space-y-2'>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <span>🔒</span>
                                            <span>Secure checkout</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <span>🔄</span>
                                            <span>30-day returns</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <span>💳</span>
                                            <span>All major payment methods accepted</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;