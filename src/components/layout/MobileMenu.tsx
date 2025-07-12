'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu, User, ShoppingBag, Heart, Search } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useShallow } from 'zustand/shallow';

interface MobileMenuProps {
  user: {
    id: number;
    email: string;
  } | null;
  onLogout: () => void;
}

const MobileMenu = ({ user, onLogout }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { getTotalItems: getCartItems } = useCartStore(
    useShallow((state) => ({
      getTotalItems: state.getTotalItems,
    }))
  );
  
  const { getTotalItems: getWishlistItems } = useWishlistStore();
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
      
      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <Link href="/" onClick={closeMenu}>
              <span className="text-xl font-bold text-gray-900">KLIK MART</span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* User Section */}
          <div className="p-4 border-b bg-blue-50">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Welcome back!</p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-3">Join KLIK MART for exclusive deals!</p>
                <div className="space-y-2">
                  <Link
                    href="/auth/sign-in"
                    onClick={closeMenu}
                    className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    onClick={closeMenu}
                    className="block w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-300 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="p-4 border-b">
            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/search"
                onClick={closeMenu}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Search</span>
              </Link>
              
              <button
                onClick={() => {
                  closeMenu();
                  // Open cart
                  useCartStore.getState().open();
                }}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <ShoppingBag className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Cart</span>
                {getCartItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItems()}
                  </span>
                )}
              </button>
              
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Heart className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Wishlist</span>
                {getWishlistItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getWishlistItems()}
                  </span>
                )}
              </Link>
            </div>
            
            {/* Additional Quick Links */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <Link
                href="/deals"
                onClick={closeMenu}
                className="flex items-center justify-center p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span className="text-red-600 font-medium text-sm">🔥 Hot Deals</span>
              </Link>
              
              <Link
                href="/categories"
                onClick={closeMenu}
                className="flex items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-600 font-medium text-sm">📂 Categories</span>
              </Link>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🏠 Home
              </Link>
              
              <Link
                href="/search"
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🛍️ All Products
              </Link>
              
              <Link
                href="/category"
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                📂 Categories
              </Link>
              
              {user && (
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  👤 My Profile
                </Link>
              )}
              
              {user && (
                <Link
                  href="/orders"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  📦 My Orders
                </Link>
              )}
              
              {user && (
                <Link
                  href="/reviews"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ⭐ My Reviews
                </Link>
              )}
              
              <Link
                href="/about"
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ℹ️ About Us
              </Link>
              
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                📞 Contact
              </Link>
            </div>
          </nav>
          
          {/* Footer */}
          {user && (
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
              >
                🚪 Sign Out
              </button>
            </div>
          )}
          
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © 2025 KLIK MART. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
