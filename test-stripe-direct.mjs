// Test Stripe checkout langsung
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil"
});

async function testStripeCheckout() {
    try {
        console.log('🧪 Testing Stripe checkout with IDR...\n');
        
        // Test data yang mirip dengan cart yang bermasalah
        const testItems = [
            {
                name: "DANVOUY Womens T Shirt Casual Cotton Short",
                price: 50000, // 50,000 IDR
                quantity: 1,
                image: "https://example.com/image.jpg"
            }
        ];
        
        const lineItems = testItems.map(item => ({
            price_data: {
                currency: "idr",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100, // IDR menggunakan cents! 100 cents = 1 Rupiah
            },
            quantity: item.quantity,
        }));
        
        console.log('Line items to send to Stripe:');
        lineItems.forEach((item, index) => {
            console.log(`  ${index + 1}. ${item.price_data.product_data.name}`);
            console.log(`     currency: ${item.price_data.currency}`);
            console.log(`     unit_amount: ${item.price_data.unit_amount}`);
            console.log(`     quantity: ${item.quantity}`);
        });
        
        const totalAmount = lineItems.reduce((sum, item) => 
            sum + (item.price_data.unit_amount * item.quantity), 0
        );
        console.log(`\nTotal: ${totalAmount} IDR`);
        
        console.log('\n🚀 Creating Stripe checkout session...');
        
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:3002/checkout/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3002",
            shipping_address_collection: {
                allowed_countries: ["ID"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 50000 * 100, // 50,000 IDR dalam cents
                            currency: "idr",
                        },
                        display_name: "Standard Shipping",
                    },
                },
            ],
        });
        
        console.log('✅ Success! Checkout session created:');
        console.log(`Session ID: ${session.id}`);
        console.log(`URL: ${session.url}`);
        
    } catch (error) {
        console.error('❌ Error creating checkout session:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
        if (error.type) {
            console.error('Error type:', error.type);
        }
    }
}

testStripeCheckout();
