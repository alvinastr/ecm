/**
 * Simple Stripe Test - Manual Setup
 * 
 * Panduan lengkap untuk test Stripe checkout dengan dummy data
 */

console.log('🧪 Stripe Test Guide - Dummy Data Setup\n');

console.log('📋 PANDUAN TEST STRIPE CHECKOUT:');
console.log('=====================================\n');

console.log('1️⃣ BUKA WEBSITE:');
console.log('   http://localhost:3003\n');

console.log('2️⃣ TAMBAH PRODUK KE CART:');
console.log('   - Browse produk yang ada');
console.log('   - Klik "Add to Cart" pada beberapa produk');
console.log('   - Pastikan total cart minimal 50,000 IDR\n');

console.log('3️⃣ BUKA CART & CHECKOUT:');
console.log('   - Klik icon cart di header');
console.log('   - Klik "Proceed to Checkout"\n');

console.log('4️⃣ GUNAKAN DATA TEST STRIPE:');
console.log('   📄 Card Number: 4242 4242 4242 4242');
console.log('   📅 Expiry: 12/28 (atau tanggal future lainnya)');
console.log('   🔐 CVC: 123 (atau 3 digit lainnya)');
console.log('   📧 Email: test@example.com');
console.log('   👤 Name: Test User');
console.log('   🏠 Address: Isi dengan data dummy\n');

console.log('5️⃣ COMPLETE PAYMENT:');
console.log('   - Klik "Pay now"');
console.log('   - Tunggu redirect ke success page');
console.log('   - Check orders page: http://localhost:3003/orders\n');

console.log('6️⃣ VERIFY TRACKING:');
console.log('   - Check Umami dashboard: https://us.umami.is/websites/419f751e-3163-47f7-a2d1-46ce3c3a1e8b');
console.log('   - Look for "checkout_success" event');
console.log('   - Check server logs untuk webhook\n');

console.log('🎯 ALTERNATIF - QUICK TEST:');
console.log('1. Jalankan: node create-test-orders.mjs (untuk demo orders)');
console.log('2. Jalankan: node create-test-cart.mjs (untuk test checkout)\n');

console.log('💳 STRIPE TEST CARDS LAINNYA:');
console.log('─────────────────────────────');
console.log('✅ Success: 4242 4242 4242 4242');
console.log('❌ Declined: 4000 0000 0000 0002');
console.log('⚠️  Requires 3DS: 4000 0025 0000 3155');
console.log('💰 Insufficient funds: 4000 0000 0000 9995\n');

console.log('📊 WHAT GETS TRACKED:');
console.log('─────────────────────');
console.log('• Page views (automatic)');
console.log('• Proceed to checkout event');
console.log('• Checkout success event (from webhook)');
console.log('• Order data in Sanity CMS');
console.log('• Cart deletion after success');
console.log('• New order visible in Orders page\n');

console.log('🔍 DEBUGGING:');
console.log('─────────────');
console.log('• Check browser Network tab for Umami requests');
console.log('• Check server terminal for webhook logs');
console.log('• Verify environment variables: node verify-umami.js');
console.log('• Check Stripe dashboard: https://dashboard.stripe.com/test/events\n');

console.log('🎉 Ready to test! Start with: http://localhost:3003');
