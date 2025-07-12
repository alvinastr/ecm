'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlistStore, WishlistItem } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';

const WishlistItemCard = ({ item }: { item: WishlistItem }) => {
  const { removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  
  const handleRemoveFromWishlist = () => {
    removeItem(item.id);
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    // Optionally remove from wishlist after adding to cart
    // removeItem(item.id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link href={`/product/${item.id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
          title="Remove from wishlist"
        >
          <Heart className="w-4 h-4 text-red-500 fill-current group-hover:text-red-600" />
        </button>
      </div>
      
      <div className="p-4">
        <Link href={`/product/${item.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(item.price)}
          </span>
          <span className="text-sm text-gray-500">
            Added {new Date(item.addedAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={handleRemoveFromWishlist}
            className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
            title="Remove from wishlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const { items, clearWishlist, getTotalItems } = useWishlistStore();
  
  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };
  
  const handleAddAllToCart = () => {
    const { addItem } = useCartStore.getState();
    
    items.forEach(item => {
      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    });
    
    // Optionally clear wishlist after adding all to cart
    // clearWishlist();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shopping</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span>My Wishlist</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} saved for later
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="flex space-x-3">
              <button
                onClick={handleAddAllToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add All to Cart</span>
              </button>
              
              <button
                onClick={handleClearWishlist}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
        
        {/* Content */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Save items you love to your wishlist and never lose track of them again!
              </p>
              <Link
                href="/"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <WishlistItemCard key={item.id} item={item} />
              ))}
            </div>
            
            {/* Bottom Actions */}
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-lg p-6 inline-block">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  💡 Pro Tip
                </h3>
                <p className="text-gray-600">
                  Keep an eye on your wishlist items - we&apos;ll notify you when they go on sale!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
