import { Product } from './Product';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'credit-card' | 'pix' | 'boleto';
  createdAt: string;
  updatedAt: string;
}