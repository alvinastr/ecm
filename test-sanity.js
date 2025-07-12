const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zzufw9k8',
  dataset: 'production',
  apiVersion: '2025-04-03',
  useCdn: false,
  token: 'skj49bT7ia8ipS0kLxGGopY3hVoBXB8fdxZxddIauKLVv08ZMImMMVG7emzjQkGH9fHfP8VY0XsByYl9wU6b2ydX9ycHYn3eLSSZtbehVHDT69QG85MeawVpyGYWXCAVwy3L3KyGFdLUkT2vW05dj2jGlHp1Yyc2TtLlbt9QH8dCuUtGLW9s'
});

async function testSanity() {
  try {
    console.log('Testing Sanity connection...');
    
    // Test basic connection
    const result = await client.fetch('*[_type == "product"][0...5]');
    console.log('Products found:', result.length);
    console.log('Products:', JSON.stringify(result, null, 2));
    
    // Test specific product by ID
    const specificProduct = await client.fetch('*[_type == "product"][0]');
    if (specificProduct) {
      console.log('\nFirst product ID:', specificProduct._id);
      console.log('First product title:', specificProduct.title);
      console.log('First product price:', specificProduct.price);
    }
    
  } catch (error) {
    console.error('Error connecting to Sanity:', error);
  }
}

testSanity();
