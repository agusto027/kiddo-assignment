import { create } from 'zustand';
import { useCallback } from 'react';
import type { Product } from '../types/actions';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: Record<string, CartItem>;
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

function computeCartCount(items: Record<string, CartItem>): number {
  return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Zustand store for cart state.
 * Components subscribe via selectors (e.g. useCartCount) so only
 * subscribers to changed slices re-render — homepage feed stays stable.
 */
export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  cartCount: 0,

  addToCart: (product: Product, quantity = 1) => {
    set((state) => {
      const existing = state.items[product.id];
      const updatedItems = {
        ...state.items,
        [product.id]: {
          product,
          quantity: (existing?.quantity ?? 0) + quantity,
        },
      };
      return {
        items: updatedItems,
        cartCount: computeCartCount(updatedItems),
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const existing = state.items[productId];
      if (!existing) return state;

      const updatedItems = { ...state.items };
      if (existing.quantity <= 1) {
        delete updatedItems[productId];
      } else {
        updatedItems[productId] = {
          ...existing,
          quantity: existing.quantity - 1,
        };
      }
      return {
        items: updatedItems,
        cartCount: computeCartCount(updatedItems),
      };
    });
  },

  clearCart: () => set({ items: {}, cartCount: 0 }),

  getItemQuantity: (productId: string) => {
    return get().items[productId]?.quantity ?? 0;
  },
}));

/** Selector hook — only cart badge re-renders when count changes */
export function useCartCount(): number {
  return useCartStore((state) => state.cartCount);
}

export function useCartActions() {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return { addToCart, removeFromCart };
}

export function useAddToCartCallback() {
  const addToCart = useCartStore((state) => state.addToCart);
  return useCallback(
    (product: Product, quantity?: number) => addToCart(product, quantity),
    [addToCart],
  );
}
