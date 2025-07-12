/**
 * Test Stripe Checkout dengan Dummy Data
 * 
 * Script ini akan:
 * 1. Membuat cart dummy
 * 2. Menambahkan produk dummy
 * 3. Menjalankan checkout dengan data test Stripe
 */

import { getOrCreateCart, updateCartItem } from './src/actions/cart-action.js';
import { createCheckoutSession } from './src/actions/stripe-action.js';

// Dummy product data
const DUMMY_PRODUCTS = [
    {
        id: 'test-product-1',
        title: 'Test Product - Laptop Gaming',
        price: 15000000, // 15 juta IDR
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        quantity: 1
    },
    {
        id: 'test-product-2', 
        title: 'Test Product - Mouse Wireless',
        price: 250000, // 250rb IDR
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        quantity: 2
    },
    {
        id: 'test-product-3',
        title: 'Test Product - Mechanical Keyboard',
        price: 750000, // 750rb IDR
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
        quantity: 1
    }
];

async function createDummyCart() {
    console.log('🛒 Creating dummy cart with test products...');
    
    try {
        // Create or get cart
        const cart = await getOrCreateCart();
        console.log(`✅ Cart created/retrieved: ${cart.id}`);
        
        // Add dummy products to cart
        for (const product of DUMMY_PRODUCTS) {
            await updateCartItem(cart.id, product.id, {
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: product.quantity
            });
            console.log(`✅ Added to cart: ${product.title} - ${product.quantity}x ${product.price.toLocaleString('id-ID')} IDR`);
        }
        
        // Calculate total
        const total = DUMMY_PRODUCTS.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        console.log(`💰 Total cart value: ${total.toLocaleString('id-ID')} IDR`);
        
        return cart.id;
        
    } catch (error) {
        console.error('❌ Error creating dummy cart:', error);
        throw error;
    }
}

async function testStripeCheckout() {
    console.log('🧪 Starting Stripe Test Checkout Process...\n');
    
    try {
        // Step 1: Create dummy cart
        const cartId = await createDummyCart();
        
        // Step 2: Create checkout session
        console.log('\n💳 Creating Stripe checkout session...');
        const checkoutUrl = await createCheckoutSession(cartId);
        
        console.log('✅ Checkout session created successfully!');
        console.log(`🔗 Checkout URL: ${checkoutUrl}`);
        
        console.log('\n📋 Test Instructions:');
        console.log('1. Click the checkout URL above');
        console.log('2. Use Stripe test card: 4242 4242 4242 4242');
        console.log('3. Use any future expiry date (e.g., 12/28)');
        console.log('4. Use any 3-digit CVC (e.g., 123)');
        console.log('5. Use any valid email and name');
        console.log('6. Complete the checkout');
        console.log('7. Check Umami dashboard for checkout_success event');
        
        console.log('\n🎯 What will be tracked:');
        console.log('- Stripe webhook will fire checkout.session.completed');
        console.log('- Umami will track checkout_success event');
        console.log('- Cart will be deleted after successful payment');
        
        return { cartId, checkoutUrl };
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        throw error;
    }
}

// Run the test
testStripeCheckout()
    .then(({ cartId, checkoutUrl }) => {
        console.log('\n🎉 Test setup complete!');
        console.log(`Cart ID: ${cartId}`);
        console.log(`Checkout URL: ${checkoutUrl}`);
    })
    .catch(error => {
        console.error('❌ Test setup failed:', error);
    });
