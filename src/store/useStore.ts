import { create } from 'zustand';
import type { Product, CartItem, Category, PaymentDetails } from '../types';
import { api } from '../services/api';

interface StoreState {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: (params?: any) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: (paymentDetails?: PaymentDetails) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  categories: [],
  cart: [],
  isLoading: false,
  error: null,

  fetchProducts: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const products = await api.getProducts(params);
      set({ products, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch products', isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await api.getCategories();
      set({ categories });
    } catch (error: any) {
      console.error('Failed to fetch categories', error);
    }
  },

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await api.getCart();
      set({ cart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch cart', isLoading: false });
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.addToCart(productId, quantity);
      const updatedCart = await api.getCart();
      set({ cart: updatedCart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to add to cart', isLoading: false });
    }
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      await api.updateCartItem(itemId, quantity);
      const updatedCart = await api.getCart();
      set({ cart: updatedCart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update cart item', isLoading: false });
    }
  },

  removeFromCart: async (itemId: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.removeFromCart(itemId);
      const updatedCart = await api.getCart();
      set({ cart: updatedCart, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to remove from cart', isLoading: false });
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.clearCart();
      set({ cart: [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to clear cart', isLoading: false });
    }
  },

  checkout: async (paymentDetails) => {
    set({ isLoading: true, error: null });
    try {
      const { cart } = get();
      if (cart.length === 0) throw new Error('Cart is empty');
      
      const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      await api.createOrder(cart, total, paymentDetails);
      set({ cart: [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to checkout', isLoading: false });
      throw error;
    }
  }
}));