import { Umami } from '@umami/node';

// Configure with your Umami instance
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const UMAMI_API_URL = process.env.UMAMI_API_URL || 'https://us.umami.is';

// Initialize Umami client for server-side tracking
const umami = new Umami({
  hostUrl: UMAMI_API_URL,
  websiteId: UMAMI_WEBSITE_ID,
});

interface CheckoutSuccessEventData {
  cartId: string;
  email: string;
  orderId: string;
  orderTotal: number;
  orderCurrency: string;
}

interface TrackEventData {
  name: string;
  data?: Record<string, string | number | boolean>;
  url?: string;
  referrer?: string;
  hostname?: string;
}

export async function umamiTrackCheckoutSuccessEvent(eventData: CheckoutSuccessEventData) {
  if (!UMAMI_WEBSITE_ID) {
    console.warn('Umami Website ID not configured');
    return;
  }

  try {
    await umami.track({
      website: UMAMI_WEBSITE_ID,
      url: '/checkout/success',
      name: 'checkout_success',
      data: {
        cart_id: eventData.cartId,
        email: eventData.email,
        order_id: eventData.orderId,
        order_total: eventData.orderTotal,
        order_currency: eventData.orderCurrency,
      },
    });
  } catch (error) {
    console.error('Failed to track checkout success event:', error);
  }
}

export async function umamiTrackEvent(eventData: TrackEventData) {
  if (!UMAMI_WEBSITE_ID) {
    console.warn('Umami Website ID not configured');
    return;
  }

  try {
    await umami.track({
      website: UMAMI_WEBSITE_ID,
      url: eventData.url || '/',
      name: eventData.name,
      data: eventData.data,
      referrer: eventData.referrer,
      hostname: eventData.hostname,
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

// Client-side Umami script injection helper
export function getUmamiScript(websiteId: string, src: string = 'https://analytics.umami.is/script.js') {
  return {
    src,
    'data-website-id': websiteId,
    async: true,
    defer: true,
  };
}

// Helper function to check if Umami is available on client-side
export function isUmamiAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return !!((window as unknown) as Record<string, unknown>).umami;
}

// Client-side tracking helper
export function trackClientEvent(eventName: string, eventData?: Record<string, string | number | boolean>) {
  if (!isUmamiAvailable()) {
    console.warn('Umami not available on client-side');
    return;
  }

  try {
    const umami = ((window as unknown) as Record<string, unknown>).umami as { track: (name: string, data?: Record<string, string | number | boolean>) => void };
    umami.track(eventName, eventData);
  } catch (error) {
    console.error('Failed to track client event:', error);
  }
}
