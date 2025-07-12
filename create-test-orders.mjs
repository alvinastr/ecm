/**
 * Create Test Orders - Dummy Data Generator
 * 
 * Script ini membuat test orders di Sanity untuk demo orders page
 */

import { createClient } from 'next-sanity';
import { config } from 'dotenv';

// Load environment variables
config();

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

// Sample test orders data
const testOrders = [
    {
        _type: 'order',
        orderNumber: 'TEST001',
        orderDate: new Date().toISOString(),
        customerId: '1', // Change this to match your user ID
        customerEmail: 'test@example.com',
        customerName: 'Test User',
        stripeCustomerId: 'cus_test123',
        stripeCheckoutSessionId: 'cs_test_session123',
        stripePaymentIntentId: 'pi_test_payment123',
        totalPrice: 150000,
        shippingAddress: {
            _type: 'shippingAddress',
            name: 'Test User',
            line1: 'Jl. Test Street No. 123',
            line2: 'Apartment 4B',
            city: 'Jakarta',
            state: 'DKI Jakarta',
            postalCode: '12345',
            country: 'Indonesia',
        },
        orderItems: [
            {
                _type: 'orderItem',
                _key: 'item1',
                quantity: 2,
                price: 75000,
            },
        ],
        status: 'PROCESSING',
    },
    {
        _type: 'order',
        orderNumber: 'TEST002',
        orderDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        customerId: '1',
        customerEmail: 'test@example.com',
        customerName: 'Test User',
        stripeCustomerId: 'cus_test124',
        stripeCheckoutSessionId: 'cs_test_session124',
        stripePaymentIntentId: 'pi_test_payment124',
        totalPrice: 250000,
        shippingAddress: {
            _type: 'shippingAddress',
            name: 'Test User',
            line1: 'Jl. Another Street No. 456',
            city: 'Bandung',
            state: 'Jawa Barat',
            postalCode: '54321',
            country: 'Indonesia',
        },
        orderItems: [
            {
                _type: 'orderItem',
                _key: 'item2',
                quantity: 1,
                price: 250000,
            },
        ],
        status: 'SHIPPED',
    },
    {
        _type: 'order',
        orderNumber: 'TEST003',
        orderDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        customerId: '1',
        customerEmail: 'test@example.com',
        customerName: 'Test User',
        stripeCustomerId: 'cus_test125',
        stripeCheckoutSessionId: 'cs_test_session125',
        stripePaymentIntentId: 'pi_test_payment125',
        totalPrice: 180000,
        shippingAddress: {
            _type: 'shippingAddress',
            name: 'Test User',
            line1: 'Jl. Sample Road No. 789',
            city: 'Surabaya',
            state: 'Jawa Timur',
            postalCode: '98765',
            country: 'Indonesia',
        },
        orderItems: [
            {
                _type: 'orderItem',
                _key: 'item3',
                quantity: 3,
                price: 60000,
            },
        ],
        status: 'DELIVERED',
    },
];

async function createTestOrders() {
    console.log('🧪 Creating test orders in Sanity...\n');

    try {
        for (const orderData of testOrders) {
            console.log(`📝 Creating order ${orderData.orderNumber}...`);
            
            const result = await sanityClient.create(orderData);
            
            console.log(`✅ Created order ${orderData.orderNumber} with ID: ${result._id}`);
        }

        console.log('\n🎉 All test orders created successfully!');
        console.log('\n📋 Test Orders Summary:');
        console.log('================================');
        testOrders.forEach(order => {
            console.log(`• ${order.orderNumber} - ${order.status} - IDR ${order.totalPrice.toLocaleString()}`);
        });

        console.log('\n🔗 Next Steps:');
        console.log('1. Visit http://localhost:3003/orders to see the orders');
        console.log('2. Make sure you\'re logged in with the correct user ID');
        console.log('3. If orders don\'t show, check that customerId matches your user ID');

    } catch (error) {
        console.error('❌ Error creating test orders:', error);
        console.log('\n💡 Troubleshooting:');
        console.log('- Check your SANITY_API_WRITE_TOKEN in .env');
        console.log('- Verify Sanity project ID and dataset');
        console.log('- Make sure order schema is defined in Sanity');
    }
}

// Run the script
createTestOrders();
