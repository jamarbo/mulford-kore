export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export type PaymentMethodType = 'credit' | 'debit' | 'pse' | 'nequi' | 'cash';

export interface PaymentDetails {
  method: PaymentMethodType;
  // Credit/Debit Card
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  // PSE
  bank?: string;
  documentType?: string;
  documentNumber?: string;
  // Nequi
  phone?: string;
  // Cash
  cashOutlet?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentDetails?: PaymentDetails;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}