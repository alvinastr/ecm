import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

// Re-export from price-validation for consistency
export { 
    STRIPE_MINIMUM_AMOUNT_IDR,
    validatePriceForStripe,
    ensureStripeCompatiblePrice,
    validateCartForStripe
} from './price-validation';

// Navigation button utilities
export const getNavigationButtonClass = (variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary') => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  return cn(baseClasses, variants[variant]);
};

export const getNavigationLinkClass = (isActive: boolean = false) => {
  return cn(
    'text-sm font-medium transition-colors hover:text-gray-900',
    isActive ? 'text-gray-900 border-b-2 border-black' : 'text-gray-600'
  );
};

// Icon button utility
export const getIconButtonClass = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500';
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };
  
  return cn(baseClasses, sizes[size]);
};

// Breadcrumb utilities
export const getBreadcrumbClass = () => {
  return 'flex items-center space-x-2 text-sm text-gray-500';
};

export const getBreadcrumbItemClass = (isLast: boolean = false) => {
  return cn(
    'hover:text-gray-700 transition-colors',
    isLast ? 'text-gray-900 font-medium' : 'text-gray-500'
  );
};

// Mobile menu utilities
export const getMobileMenuButtonClass = () => {
  return 'inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden';
};

// Navigation helpers
export const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    // Convert segment to display name
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      name,
      href,
      isLast
    };
  });
};

// Navigation state helpers
export const isActiveRoute = (currentPath: string, targetPath: string, exact: boolean = false) => {
  if (exact) {
    return currentPath === targetPath;
  }
  return currentPath.startsWith(targetPath);
};

// Header sticky utilities
export const getStickyHeaderClass = () => {
  return 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200';
};

export const getHeaderContainerClass = () => {
  return 'w-full transition-all duration-200 ease-in-out';
};

// Page layout utilities for sticky header
export const getPageWithStickyHeaderClass = () => {
  return 'min-h-screen bg-gray-50';
};

export const getMainContentClass = () => {
  return 'relative z-10';
};