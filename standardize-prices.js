const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zzufw9k8',
  dataset: 'production',
  apiVersion: '2025-04-03',
  useCdn: false,
  token: 'skfL5ViYmQgulL2OO4oA7mqubKTRVfLJ7ovAKmU4vZWjp28YzaZ8ntnPhO76TPOu4nuU3rIdOXOsBZ3s9dKVFo932YD5cRDWIVHo9Pp1bN7A7Fdsdq5MsN02ERcmVG88IBmMk6gBJBz8rqQ131lKwXjkhxsQmwsdRyzVuEdaIOe9nK6E8n6V'
});

const STRIPE_MINIMUM_AMOUNT_IDR = 15000;

async function standardizeAllPrices() {
  try {
    console.log('🔄 Standardizing all product prices for Stripe compatibility...');
    console.log(`📏 Minimum price requirement: ${STRIPE_MINIMUM_AMOUNT_IDR} IDR\n`);
    
    // Get all products
    const products = await client.fetch('*[_type == "product"] | order(price asc)');
    console.log(`📦 Found ${products.length} products to check\n`);
    
    let updatedCount = 0;
    let alreadyOkCount = 0;
    
    for (const product of products) {
      const currentPrice = product.price;
      
      if (currentPrice < STRIPE_MINIMUM_AMOUNT_IDR) {
        // Round up to nearest reasonable price above minimum
        const newPrice = Math.max(STRIPE_MINIMUM_AMOUNT_IDR, Math.ceil(currentPrice / 1000) * 1000);
        
        console.log(`🔧 Updating: ${product.title}`);
        console.log(`   Old: ${currentPrice.toLocaleString('id-ID')} IDR`);
        console.log(`   New: ${newPrice.toLocaleString('id-ID')} IDR\n`);
        
        await client
          .patch(product._id)
          .set({ price: newPrice })
          .commit();
          
        updatedCount++;
      } else {
        console.log(`✅ OK: ${product.title} - ${currentPrice.toLocaleString('id-ID')} IDR`);
        alreadyOkCount++;
      }
    }
    
    console.log('\n📊 SUMMARY:');
    console.log(`✅ Already compliant: ${alreadyOkCount} products`);
    console.log(`🔧 Updated: ${updatedCount} products`);
    console.log(`💰 All products now meet Stripe minimum of ${STRIPE_MINIMUM_AMOUNT_IDR.toLocaleString('id-ID')} IDR`);
    
    // Final verification
    const lowPriceProducts = await client.fetch(`*[_type == "product" && price < ${STRIPE_MINIMUM_AMOUNT_IDR}]`);
    if (lowPriceProducts.length === 0) {
      console.log('🎉 SUCCESS: All prices are now Stripe-compatible!');
    } else {
      console.log(`⚠️ WARNING: ${lowPriceProducts.length} products still below minimum`);
    }
    
  } catch (error) {
    console.error('❌ Error standardizing prices:', error);
  }
}

standardizeAllPrices();
