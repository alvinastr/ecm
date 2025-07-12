'use client';
import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlist-store';
import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const WishlistButton = ({ product, size = 'md', className = '' }: WishlistButtonProps) => {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  
  const isInList = isInWishlist(product._id);
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInList) {
      removeItem(product._id);
    } else {
      if (product.title && product.price && product.image) {
        addItem({
          id: product._id,
          title: product.title,
          price: product.price,
          image: urlFor(product.image).url(),
        });
      }
    }
  };
  
  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  return (
    <button
      onClick={handleToggleWishlist}
      className={`
        ${sizeClasses[size]}
        ${isInList 
          ? 'bg-red-500 text-white' 
          : 'bg-white text-gray-400 hover:text-red-500'
        }
        rounded-full shadow-md hover:shadow-lg transition-all duration-200 
        border border-gray-200 hover:border-red-300 group
        ${className}
      `}
      title={isInList ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart 
        className={`
          ${iconSizes[size]} 
          ${isInList ? 'fill-current' : 'group-hover:fill-red-100'}
          transition-colors duration-200
        `} 
      />
    </button>
  );
};

export default WishlistButton;
