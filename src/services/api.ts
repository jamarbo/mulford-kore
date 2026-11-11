import type { Product, Category, CartItem, Order } from '../types';
import { mockProducts, mockCategories } from '../mocks/data';

// Simulating network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Database State
let cart: CartItem[] = [];
let orders: Order[] = [];

// Helper for generating IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const api = {
  // Products
  getProducts: async (params?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; sort?: string }): Promise<Product[]> => {
    await delay(600);
    let results = [...mockProducts];

    if (params?.category) {
      results = results.filter(p => p.category === params.category);
    }
    if (params?.search) {
      const search = params.search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
    }
    if (params?.minPrice !== undefined) {
      results = results.filter(p => p.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      results = results.filter(p => p.price <= params.maxPrice!);
    }
    if (params?.sort) {
      if (params.sort === 'price-asc') results.sort((a, b) => a.price - b.price);
      if (params.sort === 'price-desc') results.sort((a, b) => b.price - a.price);
      if (params.sort === 'name-asc') results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  },

  getProduct: async (id: string): Promise<Product> => {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    await delay(300);
    return [...mockCategories];
  },

  // Cart
  getCart: async (): Promise<CartItem[]> => {
    await delay(400);
    return [...cart];
  },

  addToCart: async (productId: string, quantity: number): Promise<CartItem> => {
    await delay(500);
    const product = mockProducts.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) throw new Error('Not enough stock');

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    }

    const newItem: CartItem = {
      id: generateId(),
      productId,
      product,
      quantity
    };
    cart.push(newItem);
    return newItem;
  },

  updateCartItem: async (itemId: string, quantity: number): Promise<CartItem> => {
    await delay(400);
    const item = cart.find(i => i.id === itemId);
    if (!item) throw new Error('Cart item not found');
    if (item.product.stock < quantity) throw new Error('Not enough stock');
    
    item.quantity = quantity;
    return item;
  },

  removeFromCart: async (itemId: string): Promise<void> => {
    await delay(400);
    cart = cart.filter(i => i.id !== itemId);
  },

  clearCart: async (): Promise<void> => {
    await delay(300);
    cart = [];
  },

  // Orders
  createOrder: async (items: CartItem[], total: number): Promise<Order> => {
    await delay(800);
    const order: Order = {
      id: generateId(),
      items: [...items],
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    orders.push(order);
    cart = []; // Clear cart on successful order
    return order;
  }
};