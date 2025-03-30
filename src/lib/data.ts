
import { Product, Order, User } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Macallan 12 Year',
    category: 'Whisky',
    description: 'Single malt Scotch whisky aged for 12 years with notes of vanilla and oak.',
    price: 89.99,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '2',
    name: 'Hendrick\'s Gin',
    category: 'Gin',
    description: 'Scottish gin infused with rose and cucumber.',
    price: 34.99,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '3',
    name: 'Grey Goose Vodka',
    category: 'Vodka',
    description: 'Premium French vodka made from high-quality wheat.',
    price: 29.99,
    stock: 36,
    image: 'https://images.unsplash.com/photo-1617171544581-28a5b06b5a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Don Julio 1942',
    category: 'Tequila',
    description: 'Luxury añejo tequila aged for at least two and a half years.',
    price: 149.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1581704976910-4d5cb3a91288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '5',
    name: 'Veuve Clicquot',
    category: 'Champagne',
    description: 'Brut Yellow Label champagne with apple and citrus notes.',
    price: 59.99,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1594372830925-9aea3bd60a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Lagavulin 16 Year',
    category: 'Whisky',
    description: 'Islay single malt Scotch whisky with intense peat smoke.',
    price: 94.99,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1589111538098-3cef0eda6e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    name: 'Patrón Silver',
    category: 'Tequila',
    description: 'Premium silver tequila with citrus and light pepper notes.',
    price: 44.99,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1592861611585-c8a97ef2b97f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: 'Moët & Chandon',
    category: 'Champagne',
    description: 'Imperial Brut champagne with vibrant fruitiness.',
    price: 49.99,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1627608238900-b95c1be4e5df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

export const orders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '555-123-4567',
    items: [
      { productId: '1', quantity: 1, product: products.find(p => p.id === '1')! },
      { productId: '2', quantity: 2, product: products.find(p => p.id === '2')! }
    ],
    status: 'confirmed',
    totalAmount: 159.97,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2023-05-15T10:30:00Z',
    pickupDate: '2023-05-17T15:00:00Z'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerPhone: '555-987-6543',
    items: [
      { productId: '4', quantity: 1, product: products.find(p => p.id === '4')! }
    ],
    status: 'pending',
    totalAmount: 149.99,
    paymentStatus: 'pending',
    createdAt: '2023-05-16T14:45:00Z',
    pickupDate: '2023-05-18T16:30:00Z'
  },
  {
    id: '3',
    customerName: 'Robert Johnson',
    customerEmail: 'robert.j@example.com',
    customerPhone: '555-555-5555',
    items: [
      { productId: '5', quantity: 3, product: products.find(p => p.id === '5')! },
      { productId: '8', quantity: 2, product: products.find(p => p.id === '8')! }
    ],
    status: 'ready',
    totalAmount: 279.95,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    createdAt: '2023-05-14T09:15:00Z',
    pickupDate: '2023-05-17T11:00:00Z'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'customer'
  }
];

// Helper functions to simulate a database
let productsData = [...products];
let ordersData = [...orders];
let usersData = [...users];

export const getProducts = () => productsData;
export const getProduct = (id: string) => productsData.find(p => p.id === id);
export const updateProduct = (product: Product) => {
  const index = productsData.findIndex(p => p.id === product.id);
  if (index !== -1) {
    productsData[index] = product;
    return product;
  }
  return null;
};

export const getOrders = () => ordersData;
export const getOrder = (id: string) => ordersData.find(o => o.id === id);
export const createOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
  const newOrder = {
    ...order,
    id: `${ordersData.length + 1}`,
    createdAt: new Date().toISOString()
  };
  ordersData = [...ordersData, newOrder];
  return newOrder;
};
export const updateOrder = (order: Order) => {
  const index = ordersData.findIndex(o => o.id === order.id);
  if (index !== -1) {
    ordersData[index] = order;
    return order;
  }
  return null;
};

export const getUsers = () => usersData;
export const getUser = (id: string) => usersData.find(u => u.id === id);
