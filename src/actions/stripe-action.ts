"use server"

import Stripe from "stripe"
import { getCurrentSession } from "./auth";
import { getOrCreateCart } from "./cart-action";
import { STRIPE_MINIMUM_AMOUNT_IDR } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil"
});

export const createCheckoutSession = async (cartId: string) => {
    try {
        console.log('Creating checkout session for cartId:', cartId);
        
        const { user } = await getCurrentSession();
        console.log('Current user:', user?.email || 'Anonymous');
        
        const cart = await getOrCreateCart(cartId);
        console.log('Cart retrieved with', cart.items.length, 'items');

        if(cart.items.length === 0){
            throw new Error("Cart is empty");
        }

        // Filter out free items and ensure minimum amount for Stripe
        const paidItems = cart.items.filter(item => item.price > 0);
        console.log('Paid items:', paidItems.length, 'of', cart.items.length);
        
        // Debug: Log all cart items with their prices
        console.log('=== CART ITEMS DEBUG ===');
        cart.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.title}:`);
            console.log(`   - Price: ${item.price} (type: ${typeof item.price})`);
            console.log(`   - Quantity: ${item.quantity} (type: ${typeof item.quantity})`);
            console.log(`   - Total: ${item.price * item.quantity}`);
        });
        console.log('=== END CART ITEMS DEBUG ===');
        
        if (paidItems.length === 0) {
            throw new Error("Cart contains only free items. Cannot proceed to checkout.");
        }

        // Ensure each item meets minimum Stripe requirement and format correctly for IDR
        const lineItems = paidItems.map((item) => {
            // For IDR, Stripe uses cents format: 100 cents = 1 Rupiah
            // Fix floating point precision issues first
            const cleanPrice = Math.round(parseFloat(item.price.toString()));
            const finalPrice = Math.max(cleanPrice, STRIPE_MINIMUM_AMOUNT_IDR);
            const unitAmountInCents = finalPrice * 100; // Convert to cents
            
            console.log(`Processing item: ${item.title}`);
            console.log(`  - Original price: ${item.price} (${typeof item.price})`);
            console.log(`  - Clean price: ${cleanPrice} IDR`);
            console.log(`  - Final price: ${finalPrice} IDR`);
            console.log(`  - Unit amount (cents): ${unitAmountInCents}`);
            
            return {
                price_data: {
                    currency: "idr",
                    product_data: {
                        name: item.title,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: unitAmountInCents, // IDR in cents: 100 cents = 1 Rupiah
                },
                quantity: item.quantity,
            };
        });

        // Calculate total amount to ensure it meets Stripe minimum requirement
        const totalAmount = lineItems.reduce((sum, item) => 
            sum + (item.price_data.unit_amount * item.quantity), 0
        );
        
        // Convert back from cents to IDR for logging and validation
        const totalAmountIDR = totalAmount / 100;
        
        // Stripe minimum for IDR is approximately 15,000 IDR ($1 USD)
        if (totalAmountIDR < STRIPE_MINIMUM_AMOUNT_IDR) {
            throw new Error(`Total amount (${totalAmountIDR} IDR) is below minimum required for checkout. Minimum is ${STRIPE_MINIMUM_AMOUNT_IDR} IDR.`);
        }

        console.log('Line items prepared:');
        lineItems.forEach((item, index) => {
            const totalCents = item.price_data.unit_amount * item.quantity;
            const totalIDR = totalCents / 100;
            console.log(`  ${index + 1}. ${item.price_data.product_data.name}`);
            console.log(`     Unit Amount: ${item.price_data.unit_amount} cents (${item.price_data.unit_amount / 100} IDR)`);
            console.log(`     Quantity: ${item.quantity}`);
            console.log(`     Line Total: ${totalCents} cents (${totalIDR} IDR)`);
        });
        
        console.log('Total checkout amount:', totalAmount, 'cents (', totalAmountIDR, 'IDR )');
        console.log('Minimum required amount:', STRIPE_MINIMUM_AMOUNT_IDR, 'IDR');
        
        // Additional validation for Stripe
        if (totalAmount < 15000) {
            throw new Error(`Total amount ${totalAmount} IDR (≈$${(totalAmount/15000).toFixed(2)} USD) is below Stripe minimum requirement for IDR.`);
        }
        
        // Ensure no amount is accidentally converted to USD cents
        const hasInvalidAmount = lineItems.some(item => item.price_data.unit_amount < 1000);
        if (hasInvalidAmount) {
            throw new Error(`One or more items have suspiciously low amounts. Please check currency conversion.`);
        }

        console.log('=== STRIPE CHECKOUT SESSION CREATION ===');
        console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);
        console.log('Success URL will be:', `${process.env.NEXT_PUBLIC_BASE_URL!}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
        
        // Additional validation before sending to Stripe
        console.log('=== FINAL VALIDATION ===');
        console.log('Line items for Stripe:');
        lineItems.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item.price_data.product_data.name}`);
            console.log(`     currency: ${item.price_data.currency}`);
            console.log(`     unit_amount: ${item.price_data.unit_amount} (${typeof item.price_data.unit_amount})`);
            console.log(`     quantity: ${item.quantity}`);
            console.log(`     line_total: ${item.price_data.unit_amount * item.quantity}`);
        });
        console.log(`Total amount: ${totalAmount} IDR`);
        console.log(`Shipping: 50000 IDR`);
        console.log(`Grand total: ${totalAmount + 50000} IDR`);
        console.log('===========================');

        const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL!}`,
        customer_email: user?.email,
        metadata: {
            cartId: cart.id,
            userId: user?.id?.toString() || '-'
        },
        shipping_address_collection: {
            allowed_countries: ["ID"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 50000 * 100, // 50,000 IDR in cents
                        currency: "idr",
                    },
                    display_name: "Standard Shipping",
                    delivery_estimate: {
                        minimum: {
                            unit: "day",
                            value: 3,
                        },
                        maximum: {
                            unit: "day",
                            value: 7,
                        },
                    },
                },
            },
        ],
    });        if (!session.url) {
            throw new Error("Failed to create checkout session");
        }

        console.log('Checkout session created successfully:', session.id);
        return session.url;
        
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
}
