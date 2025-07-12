// Debug script untuk memeriksa cart yang bermasalah
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugCart() {
  try {
    console.log('🔍 Debugging cart data...\n');
    
    // Get all carts with items
    const carts = await prisma.cart.findMany({
      include: {
        items: true
      }
    });
    
    console.log(`Found ${carts.length} carts:`);
    
    for (const cart of carts) {
      console.log(`\n📦 Cart ID: ${cart.id}`);
      console.log(`   User ID: ${cart.userId || 'Anonymous'}`);
      console.log(`   Items: ${cart.items.length}`);
      
      let cartTotal = 0;
      
      cart.items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        
        console.log(`   ${index + 1}. ${item.title}`);
        console.log(`      - Price: ${item.price} IDR (type: ${typeof item.price})`);
        console.log(`      - Qty: ${item.quantity}`);
        console.log(`      - Subtotal: ${itemTotal} IDR`);
        
        // Check for potential issues
        if (item.price < 15000) {
          console.log(`      ⚠️ BELOW STRIPE MINIMUM!`);
        }
        if (typeof item.price !== 'number') {
          console.log(`      ⚠️ PRICE IS NOT A NUMBER!`);
        }
        if (item.price.toString().includes('.')) {
          console.log(`      ⚠️ PRICE HAS DECIMALS: ${item.price}`);
        }
      });
      
      console.log(`   💰 Cart Total: ${cartTotal} IDR`);
      
      if (cartTotal < 15000) {
        console.log(`   🚨 CART TOTAL BELOW MINIMUM!`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error debugging cart:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugCart();
