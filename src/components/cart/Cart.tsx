"use client";

import { useCartStore } from "@/stores/cart-store";
import {
  LucideShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const Cart = () => {
  const { close, isOpen, syncWithUser, setLoaded, getTotalItems } =
    useCartStore(
      useShallow((state) => ({
        close: state.close,
        isOpen: state.isOpen,
        syncWithUser: state.syncWithUser,
        setLoaded: state.setLoaded,
        getTotalItems: state.getTotalItems,
      }))
    );
  useEffect(() => {
    const initCart = async () => {
      await useCartStore.persist.rehydrate();
      await syncWithUser();
      setLoaded(true);
    };

    initCart();
  }, []);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50  z-50 transition-opacity backdrop-blur-sm"
          onClick={close}
        />
      )}
      {/* Cart */}
      <div
        className={`
            fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl
            transform transition-transform duration-300 ease-in-out z-50
            ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-4">
              <LucideShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you have not added any items to your cart yet!
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={"cart-item-" + item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          {/* Cart Footer */}
        </div>
      </div>
    </>
  );
};

export default Cart;
