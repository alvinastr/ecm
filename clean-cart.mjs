import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanLowPriceCartItems() {
  try {
    console.log('Cleaning cart items with low prices...');
    
    // Find cart items with price under 15,000 IDR
    const lowPriceItems = await prisma.cartLineItem.findMany({
      where: {
        price: {
          lt: 15000
        }
      }
    });
    
    console.log(`Found ${lowPriceItems.length} cart items with price under 15,000 IDR:`);
    
    for (const item of lowPriceItems) {
      console.log(`- ${item.title}: ${item.price} IDR`);
    }
    
    if (lowPriceItems.length > 0) {
      // Delete these items
      const result = await prisma.cartLineItem.deleteMany({
        where: {
          price: {
            lt: 15000
          }
        }
      });
      
      console.log(`✅ Deleted ${result.count} cart items with low prices`);
    } else {
      console.log('✅ No cart items with low prices found');
    }
    
  } catch (error) {
    console.error('Error cleaning cart items:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanLowPriceCartItems();
