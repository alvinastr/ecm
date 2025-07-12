# Umami Analytics Setup Guide

This guide explains how to set up Umami analytics for your e-commerce application.

## What is Umami?

Umami is a simple, fast, privacy-focused alternative to Google Analytics. It's open-source and can be self-hosted or used as a service.

## Quick Setup (COMPLETED) ✅

### ✅ Step 1: Website ID Already Configured
- **Website ID**: `419f751e-3163-47f7-a2d1-46ce3c3a1e8b`
- **Umami Domain**: `https://us.umami.is`
- **Dashboard**: [https://us.umami.is/websites/419f751e-3163-47f7-a2d1-46ce3c3a1e8b](https://us.umami.is/websites/419f751e-3163-47f7-a2d1-46ce3c3a1e8b)

### ✅ Step 2: Environment Variables Updated
Your `.env` file has been configured with:
```env
UMAMI_WEBSITE_ID=419f751e-3163-47f7-a2d1-46ce3c3a1e8b
NEXT_PUBLIC_UMAMI_WEBSITE_ID=419f751e-3163-47f7-a2d1-46ce3c3a1e8b
UMAMI_API_URL=https://us.umami.is
NEXT_PUBLIC_UMAMI_SRC=https://us.umami.is/script.js
```

### ✅ Step 3: Restart Application (COMPLETED)
```bash
npm run dev
# Server running at: http://localhost:3003
```

### ✅ Step 4: Test & Verify (READY TO TEST)
1. ✅ Open your website in browser: [http://localhost:3003](http://localhost:3003)
2. 🔄 Check Umami dashboard for visitor data: [Dashboard Link](https://us.umami.is/websites/419f751e-3163-47f7-a2d1-46ce3c3a1e8b)
3. 🛒 Test a checkout to see custom events

### 🧪 Verification Command
Run this to verify your setup:
```bash
node verify-umami.js
```

## API Key Usage (Optional)
Your API key: `api_VARnbIA98hh0Cy0zcN3YnqLSih6VM9kh`

This can be used for:
- Server-side API calls to Umami
- Retrieving analytics data programmatically
- Managing websites via API

## Setup Options

### Option 1: Use Umami Cloud (Recommended)

1. Go to [Umami Cloud](https://cloud.umami.is)
2. Sign up for a free account
3. Create a new website
4. Copy your website ID

### Option 2: Self-host Umami

1. Follow the [Umami self-hosting guide](https://umami.is/docs/install)
2. Deploy Umami to your preferred platform
3. Create a website in your Umami dashboard
4. Note your domain and website ID

## Configuration

1. Copy the environment variables from `.env.umami.example` to your `.env.local`:

```bash
# For Umami Cloud
UMAMI_WEBSITE_ID=your-website-id-here
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
UMAMI_API_URL=https://analytics.umami.is
NEXT_PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js
```

```bash
# For self-hosted Umami
UMAMI_WEBSITE_ID=your-website-id-here
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
UMAMI_API_URL=https://your-umami-domain.com
NEXT_PUBLIC_UMAMI_SRC=https://your-umami-domain.com/script.js
```

2. Replace `your-website-id-here` with your actual website ID from Umami

## Features Implemented

### 1. Client-side Tracking

- Page views are automatically tracked
- Custom events can be tracked using `trackClientEvent()`
- Cart interactions are tracked (proceed to checkout)

### 2. Server-side Tracking

- Checkout success events are tracked from the Stripe webhook
- Order completion data is sent to Umami

### 3. Events Tracked

| Event | Type | Data |
|-------|------|------|
| `proceed_to_checkout` | Client | cartId, totalPrice, currency |
| `checkout_success` | Server | cartId, email, orderId, orderTotal, orderCurrency |

## Usage Examples

### Client-side Event Tracking

```typescript
import { trackClientEvent } from '@/lib/umami';

// Track a custom event
trackClientEvent('product_view', {
  productId: 'product-123',
  category: 'electronics'
});

// Track add to cart
trackClientEvent('add_to_cart', {
  productId: 'product-123',
  quantity: 2,
  price: 99.99
});
```

### Server-side Event Tracking

```typescript
import { umamiTrackEvent } from '@/lib/umami';

// Track any server-side event
await umamiTrackEvent({
  name: 'user_registration',
  data: {
    source: 'organic',
    plan: 'free'
  },
  url: '/auth/sign-up'
});
```

## Verification

1. Start your development server: `npm run dev`
2. Open your browser's developer tools
3. Check the Network tab for requests to your Umami domain
4. Visit your Umami dashboard to see real-time data

## Privacy Features

- No cookies are used by default
- No personal data is collected
- GDPR compliant
- Lightweight script (~2KB)
- Open source and transparent

## Troubleshooting

### Script not loading

1. Check that your environment variables are set correctly
2. Verify your Umami domain is accessible
3. Check browser console for errors

### Events not tracking

1. Verify your website ID is correct
2. Check that the Umami script loaded successfully
3. Look for error messages in the browser console
4. Ensure your Umami instance is running (for self-hosted)

### Server-side tracking not working

1. Check your API URL is correct
2. Verify network connectivity from your server
3. Look at server logs for error messages

## Additional Resources

- [Umami Documentation](https://umami.is/docs)
- [Umami GitHub Repository](https://github.com/umami-software/umami)
- [Privacy Policy Generator for Umami](https://umami.is/privacy)
