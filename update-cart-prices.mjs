// Script to update cart items with current product prices from Sanity

import { PrismaClient } from '@prisma/client';
import { createClient } from '@sanity/client';

const prisma = new PrismaClient();

const sanityClient = createClient({
  projectId: 'zzufw9k8',
  dataset: 'production',
  apiVersion: '2025-04-03',
  useCdn: false,
  token: 'skfL5ViYmQgulL2OO4oA7mqubKTRVfLJ7ovAKmU4vZWjp28YzaZ8ntnPhO76TPOu4nuU3rIdOXOsBZ3s9dKVFo932YD5cRDWIVHo9Pp1bN7A7Fdsdq5MsN02ERcmVG88IBmMk6gBJBz8rqQ131lKwXjkhxsQmwsdRyzVuEdaIOe9nK6E8n6V'
});

async function updateCartItemPrices() {
  try {
    console.log('Updating cart item prices...');
    
    // Get all cart items
    const cartItems = await prisma.cartLineItem.findMany();
    console.log(`Found ${cartItems.length} cart items to check`);
    
    for (const item of cartItems) {
      console.log(`Checking item: ${item.title} (${item.sanityProductId})`);
      console.log(`  Current cart price: ${item.price} IDR`);
      
      // Get current price from Sanity
      const product = await sanityClient.fetch('*[_type == "product" && _id == $id][0]', { id: item.sanityProductId });
      
      if (product && product.price) {
        console.log(`  Sanity price: ${product.price} IDR`);
        
        if (Math.abs(item.price - product.price) > 1) { // If prices differ
          console.log(`  ⚠️ Price mismatch! Updating...`);
          
          await prisma.cartLineItem.update({
            where: { id: item.id },
            data: { price: product.price }
          });
          
          console.log(`  ✅ Updated to ${product.price} IDR`);
        } else {
          console.log(`  ✓ Price already up to date`);
        }
      } else {
        console.log(`  ⚠️ Product not found in Sanity, skipping...`);
      }
    }
    
    console.log('Cart item price update completed!');
    
  } catch (error) {
    console.error('Error updating cart item prices:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCartItemPrices();
