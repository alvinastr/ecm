/**
 * Price validation utilities for Stripe compatibility
 * Note: Stripe IDR uses cents format (100 cents = 1 IDR)
 */

export const STRIPE_MINIMUM_AMOUNT_IDR = 15000;

/**
 * Convert IDR to Stripe cents format
 */
export const convertIDRToStripeCents = (amountIDR: number): number => {
  return Math.round(amountIDR * 100);
};

/**
 * Convert Stripe cents back to IDR
 */
export const convertStripeCentsToIDR = (amountCents: number): number => {
  return Math.round(amountCents / 100);
};

/**
 * Validates if a price meets Stripe minimum requirements
 */
export const validatePriceForStripe = (price: number): { 
  isValid: boolean; 
  message?: string; 
  suggestedPrice?: number 
} => {
  if (price < STRIPE_MINIMUM_AMOUNT_IDR) {
    return {
      isValid: false,
      message: `Price ${price.toLocaleString('id-ID')} IDR is below Stripe minimum of ${STRIPE_MINIMUM_AMOUNT_IDR.toLocaleString('id-ID')} IDR`,
      suggestedPrice: STRIPE_MINIMUM_AMOUNT_IDR
    };
  }
  
  return { isValid: true };
};

/**
 * Ensures a price meets Stripe minimum (used in checkout)
 */
export const ensureStripeCompatiblePrice = (price: number): number => {
  return Math.max(price, STRIPE_MINIMUM_AMOUNT_IDR);
};

/**
 * Format price with proper IDR formatting
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Check if a cart total is valid for Stripe checkout
 */
export const validateCartForStripe = (items: Array<{ price: number; quantity: number }>): {
  isValid: boolean;
  total: number;
  invalidItems: Array<{ index: number; price: number }>;
  message?: string;
} => {
  const invalidItems: Array<{ index: number; price: number }> = [];
  let total = 0;
  
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    if (item.price < STRIPE_MINIMUM_AMOUNT_IDR) {
      invalidItems.push({ index, price: item.price });
    }
  });
  
  if (invalidItems.length > 0) {
    return {
      isValid: false,
      total,
      invalidItems,
      message: `${invalidItems.length} item(s) below minimum price`
    };
  }
  
  if (total < STRIPE_MINIMUM_AMOUNT_IDR) {
    return {
      isValid: false,
      total,
      invalidItems: [],
      message: `Cart total ${formatPrice(total)} is below minimum ${formatPrice(STRIPE_MINIMUM_AMOUNT_IDR)}`
    };
  }
  
  return {
    isValid: true,
    total,
    invalidItems: []
  };
};
