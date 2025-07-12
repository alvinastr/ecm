import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  addedAt: Date;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) =>
        set((state) => {
          // Check if item already exists
          const existingItem = state.items.find((wishlistItem) => wishlistItem.id === item.id);
          if (existingItem) {
            return state; // Don't add duplicates
          }
          
          return {
            items: [...state.items, { ...item, addedAt: new Date() }],
          };
        }),
      
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      
      isInWishlist: (id) => {
        const items = get().items;
        return items.some((item) => item.id === id);
      },
      
      clearWishlist: () =>
        set(() => ({
          items: [],
        })),
      
      getTotalItems: () => {
        const items = get().items;
        return items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
