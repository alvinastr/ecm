/**
 * Create Test Cart with Dummy Products
 * 
 * Script ini akan membuat cart dengan produk dummy untuk testing
 */

require('dotenv').config();

// Simulasi dummy product data (seolah-olah dari Sanity)
const DUMMY_PRODUCTS = [
    {
        sanityId: 'dummy-product-1',
        title: '🎮 Gaming Laptop Test',
        price: 15000000, // 15 juta IDR
        image: '/dummy-laptop.jpg',
    },
    {
        sanityId: 'dummy-product-2',
        title: '🖱️ Wireless Mouse Test', 
        price: 250000, // 250rb IDR
        image: '/dummy-mouse.jpg',
    },
    {
        sanityId: 'dummy-product-3',
        title: '⌨️ Mechanical Keyboard Test',
        price: 750000, // 750rb IDR  
        image: '/dummy-keyboard.jpg',
    }
];

async function createTestCartDirect() {
    console.log('🛒 Creating test cart with dummy data...\n');
    
    try {
        // Import Prisma (simulating what the app would do)
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        
        // Create a test cart
        const cart = await prisma.cart.create({
            data: {
                id: `test-cart-${Date.now()}`,
                userId: null, // Anonymous cart
                items: {
                    create: DUMMY_PRODUCTS.map(product => ({
                        id: `item-${product.sanityId}-${Date.now()}`,
                        sanityProductId: product.sanityId,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                    }))
                }
            },
            include: {
                items: true
            }
        });
        
        console.log('✅ Test cart created successfully!');
        console.log(`🆔 Cart ID: ${cart.id}`);
        console.log('📦 Items in cart:');
        
        cart.items.forEach(item => {
            console.log(`   - ${item.title}: ${item.price.toLocaleString('id-ID')} IDR`);
        });
        
        const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        console.log(`💰 Total: ${total.toLocaleString('id-ID')} IDR`);
        
        console.log('\n🎯 Next steps:');
        console.log('1. Copy this cart ID');
        console.log('2. Use it to test checkout manually');
        console.log('3. Or run: node test-checkout-with-cart.js');
        
        await prisma.$disconnect();
        return cart.id;
        
    } catch (error) {
        console.error('❌ Error creating test cart:', error);
        throw error;
    }
}

// Alternative: Create test URL directly
async function createTestCheckoutUrl() {
    console.log('\n🔗 Creating direct checkout URL...\n');
    
    try {
        // This simulates what would happen in a real checkout flow
        const testCartData = {
            items: DUMMY_PRODUCTS.map(product => ({
                price_data: {
                    currency: 'idr',
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: product.price,
                },
                quantity: 1,
            }))
        };
        
        console.log('💳 Test checkout data prepared:');
        console.log(JSON.stringify(testCartData, null, 2));
        
        console.log('\n🎯 Manual test instructions:');
        console.log('1. Add products to cart via website UI');
        console.log('2. Or use the cart ID from above');
        console.log('3. Proceed to checkout');
        console.log('4. Use Stripe test card: 4242 4242 4242 4242');
        
    } catch (error) {
        console.error('❌ Error preparing checkout:', error);
    }
}

// Run both functions
async function runTest() {
    try {
        await createTestCartDirect();
        await createTestCheckoutUrl();
        
        console.log('\n🎉 Test data ready!');
        console.log('📊 Monitor at: https://us.umami.is/websites/419f751e-3163-47f7-a2d1-46ce3c3a1e8b');
        
    } catch (error) {
        console.error('❌ Test setup failed:', error);
        console.log('\n💡 Troubleshooting:');
        console.log('- Make sure database is running');
        console.log('- Check .env file configuration');
        console.log('- Ensure Prisma is properly setup');
    }
}

runTest();
