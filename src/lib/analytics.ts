import { trackClientEvent, umamiTrackEvent } from './umami';

// E-commerce specific tracking functions

export interface ProductViewData {
  productId: string;
  productTitle: string;
  category?: string;
  price: number;
}

export interface AddToCartData {
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
}

export interface RemoveFromCartData {
  productId: string;
  productTitle: string;
  quantity: number;
}

export interface SearchData {
  query: string;
  resultsCount: number;
}

export interface CategoryViewData {
  category: string;
  productsCount: number;
}

// Client-side tracking functions
export const trackProductView = (data: ProductViewData) => {
  const eventData: Record<string, string | number | boolean> = {
    product_id: data.productId,
    product_title: data.productTitle,
    price: data.price,
  };
  
  if (data.category) {
    eventData.category = data.category;
  }
  
  trackClientEvent('product_view', eventData);
};

export const trackAddToCart = (data: AddToCartData) => {
  trackClientEvent('add_to_cart', {
    product_id: data.productId,
    product_title: data.productTitle,
    quantity: data.quantity,
    price: data.price,
    total_value: data.price * data.quantity,
  });
};

export const trackRemoveFromCart = (data: RemoveFromCartData) => {
  trackClientEvent('remove_from_cart', {
    product_id: data.productId,
    product_title: data.productTitle,
    quantity: data.quantity,
  });
};

export const trackSearch = (data: SearchData) => {
  trackClientEvent('search', {
    query: data.query,
    results_count: data.resultsCount,
  });
};

export const trackCategoryView = (data: CategoryViewData) => {
  trackClientEvent('category_view', {
    category: data.category,
    products_count: data.productsCount,
  });
};

export const trackCartOpen = () => {
  trackClientEvent('cart_open');
};

export const trackCartClose = () => {
  trackClientEvent('cart_close');
};

export const trackSignUp = (source?: string) => {
  trackClientEvent('sign_up', {
    source: source || 'direct',
  });
};

export const trackSignIn = (source?: string) => {
  trackClientEvent('sign_in', {
    source: source || 'direct',
  });
};

// Server-side tracking functions
export const trackServerProductView = async (data: ProductViewData & { userId?: string }) => {
  const trackingData: Record<string, string | number | boolean> = {
    product_id: data.productId,
    product_title: data.productTitle,
    price: data.price,
  };
  
  if (data.category) {
    trackingData.category = data.category;
  }
  
  if (data.userId) {
    trackingData.user_id = data.userId;
  }
  
  await umamiTrackEvent({
    name: 'product_view_server',
    data: trackingData,
    url: `/product/${data.productId}`,
  });
};

export const trackServerUserRegistration = async (data: { userId: string; source?: string }) => {
  await umamiTrackEvent({
    name: 'user_registration',
    data: {
      user_id: data.userId,
      source: data.source || 'direct',
    },
    url: '/auth/sign-up',
  });
};

export const trackServerOrderCreated = async (data: {
  orderId: string;
  userId?: string;
  orderTotal: number;
  itemsCount: number;
}) => {
  const trackingData: Record<string, string | number | boolean> = {
    order_id: data.orderId,
    order_total: data.orderTotal,
    items_count: data.itemsCount,
  };
  
  if (data.userId) {
    trackingData.user_id = data.userId;
  }
  
  await umamiTrackEvent({
    name: 'order_created',
    data: trackingData,
    url: '/checkout/success',
  });
};
