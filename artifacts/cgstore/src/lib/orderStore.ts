export type OrderItem = {
  perfumeName: string;
  brand: string;
  ml: number;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  total: number;
  status: 'Pendiente' | 'Completado';
};

const STORE_KEY = 'cgstore_orders';

export const getOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse orders from local storage", e);
  }
  
  return [];
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event('cgstore_orders_changed'));
};

export const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
  const orders = getOrders();
  const newOrder: Order = {
    ...orderData,
    id: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    status: 'Pendiente',
  };
  saveOrders([newOrder, ...orders]);
};

export const updateOrderStatus = (id: string, status: 'Pendiente' | 'Completado') => {
  const orders = getOrders();
  saveOrders(orders.map(o => o.id === id ? { ...o, status } : o));
};
