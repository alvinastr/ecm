import { createCheckoutSession } from './src/actions/stripe-action.js';

// Test function to check if checkout session creation works
async function testCheckout() {
  try {
    console.log('Testing checkout session creation...');
    
    // Create a test cart ID (you may need to use a real cart ID from your database)
    const testCartId = 'test-cart-id';
    
    const checkoutUrl = await createCheckoutSession(testCartId);
    console.log('Success! Checkout URL:', checkoutUrl);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testCheckout();
