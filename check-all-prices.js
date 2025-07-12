const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zzufw9k8',
  dataset: 'production',
  apiVersion: '2025-04-03',
  useCdn: false,
  token: 'skfL5ViYmQgulL2OO4oA7mqubKTRVfLJ7ovAKmU4vZWjp28YzaZ8ntnPhO76TPOu4nuU3rIdOXOsBZ3s9dKVFo932YD5cRDWIVHo9Pp1bN7A7Fdsdq5MsN02ERcmVG88IBmMk6gBJBz8rqQ131lKwXjkhxsQmwsdRyzVuEdaIOe9nK6E8n6V'
});

async function checkAllProductPrices() {
  try {
    console.log('Checking all product prices...');
    
    // Get all products
    const products = await client.fetch('*[_type == "product"] | order(price asc)');
    
    console.log(`Found ${products.length} products:`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}: ${product.price} IDR`);
    });
    
    // Check for any products under 15,000 IDR
    const lowPriceProducts = products.filter(p => p.price < 15000);
    if (lowPriceProducts.length > 0) {
      console.log('\n🚨 Products still under 15,000 IDR:');
      lowPriceProducts.forEach(product => {
        console.log(`- ${product.title}: ${product.price} IDR`);
      });
    } else {
      console.log('\n✅ All products have prices above 15,000 IDR');
    }
    
  } catch (error) {
    console.error('Error checking prices:', error);
  }
}

checkAllProductPrices();
