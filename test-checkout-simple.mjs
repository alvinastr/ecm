// Simple test to create a real cart and test checkout
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testCreateCheckout() {
  try {
    console.log('Creating test cart with proper prices...');
    
    // Create a test cart
    const cart = await prisma.cart.create({
      data: {
        id: crypto.randomUUID(),
        items: {
          create: [
            {
              id: crypto.randomUUID(),
              sanityProductId: '0e4780c7-c33f-4319-844f-f2934f252370',
              quantity: 1,
              title: 'Test Product',
              price: 150000, // 150,000 IDR - well above new minimum of 8,000 IDR ($0.50 USD)
              image: 'https://example.com/image.jpg'
            }
          ]
        }
      },
      include: {
        items: true
      }
    });
    
    console.log('Created cart:', cart.id);
    console.log('Cart items:', cart.items.map(item => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity
    })));
    
    // Test checkout URL creation
    const { createCheckoutSession } = await import('./src/actions/stripe-action.ts');
    const checkoutUrl = await createCheckoutSession(cart.id);
    
    console.log('✅ Success! Checkout URL:', checkoutUrl);
    
    // Clean up
    await prisma.cart.delete({ where: { id: cart.id } });
    console.log('Test cart cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testCreateCheckout();
