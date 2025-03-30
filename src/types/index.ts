
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod?: string;
  createdAt: string;
  pickupDate?: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
};

export interface MpesaPayment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  orderId?: string;
  timestamp: string;
}

export interface PreOrder {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  depositAmount: number;
  totalAmount: number;
  paymentStatus: 'deposit_paid' | 'fully_paid' | 'pending';
  paymentMethod: string;
  expectedDate: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
}
