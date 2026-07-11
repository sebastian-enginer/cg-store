import { useState, useEffect, useCallback } from 'react';
import { getOrders, Order } from '../lib/orderStore';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const load = useCallback(() => {
    setOrders(getOrders());
  }, []);

  useEffect(() => {
    load();
    const handleStorage = (e: Event) => {
      if (e.type === 'cgstore_orders_changed' || (e instanceof StorageEvent && e.key === 'cgstore_orders')) {
        load();
      }
    };
    window.addEventListener('cgstore_orders_changed', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('cgstore_orders_changed', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, [load]);

  return { orders, refresh: load };
}
