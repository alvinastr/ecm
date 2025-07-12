/**
 * Test script untuk Umami tracking
 * Jalankan dengan: node test-umami.mjs
 */

import { umamiTrackEvent, umamiTrackCheckoutSuccessEvent } from './src/lib/umami.js';

async function testUmamiTracking() {
    console.log('🧪 Testing Umami Analytics...');
    
    try {
        // Test basic event tracking
        console.log('📊 Testing basic event tracking...');
        await umamiTrackEvent({
            name: 'test_event',
            url: '/test',
            data: {
                test_property: 'test_value',
                timestamp: new Date().toISOString()
            }
        });
        console.log('✅ Basic event tracked successfully');
        
        // Test checkout success event
        console.log('🛒 Testing checkout success event...');
        await umamiTrackCheckoutSuccessEvent({
            cartId: 'test_cart_123',
            email: 'test@example.com',
            orderId: 'TEST_ORDER_456',
            orderTotal: 150000,
            orderCurrency: 'IDR'
        });
        console.log('✅ Checkout success event tracked successfully');
        
        console.log('🎉 All Umami tests passed!');
        console.log('📈 Check your Umami dashboard for the test events');
        
    } catch (error) {
        console.error('❌ Umami test failed:', error);
        console.log('💡 Make sure your UMAMI_WEBSITE_ID is set in .env file');
    }
}

// Run the test
testUmamiTracking();
