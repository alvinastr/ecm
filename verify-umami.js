#!/usr/bin/env node

/**
 * Umami Analytics Test & Verification Script
 * 
 * This script helps verify your Umami setup is working correctly.
 */

// Load environment variables
require('dotenv').config();

console.log('🧪 Umami Analytics Setup Verification\n');

// Check environment variables
const requiredEnvVars = [
    'UMAMI_WEBSITE_ID',
    'NEXT_PUBLIC_UMAMI_WEBSITE_ID',
    'UMAMI_API_URL',
    'NEXT_PUBLIC_UMAMI_SRC'
];

console.log('📋 Checking environment variables...');
let allVarsSet = true;

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        console.log(`✅ ${varName}: ${value}`);
    } else {
        console.log(`❌ ${varName}: NOT SET`);
        allVarsSet = false;
    }
});

if (!allVarsSet) {
    console.log('\n❌ Some environment variables are missing. Please check your .env file.');
    process.exit(1);
}

console.log('\n✅ All environment variables are configured correctly!');

console.log('\n📊 Umami Setup Summary:');
console.log('==========================================');
console.log(`Website ID: ${process.env.UMAMI_WEBSITE_ID}`);
console.log(`Umami Domain: ${process.env.UMAMI_API_URL}`);
console.log(`Script URL: ${process.env.NEXT_PUBLIC_UMAMI_SRC}`);
console.log(`Dashboard: ${process.env.UMAMI_API_URL}/websites/${process.env.UMAMI_WEBSITE_ID}`);

console.log('\n🎯 Next Steps:');
console.log('1. Make sure your Next.js app is running');
console.log('2. Open your website in a browser');
console.log('3. Check your Umami dashboard for visitor data');
console.log('4. Test a checkout process to see custom events');

console.log('\n🔗 Quick Links:');
console.log(`Dashboard: ${process.env.UMAMI_API_URL}/websites/${process.env.UMAMI_WEBSITE_ID}`);
console.log('Local App: http://localhost:3003');

console.log('\n📈 Events being tracked:');
console.log('- Page views (automatic)');
console.log('- Checkout success (webhook)');
console.log('- Custom events (manual)');

console.log('\n🎉 Setup verification complete!');
