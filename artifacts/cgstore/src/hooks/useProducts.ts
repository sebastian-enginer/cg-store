import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../lib/productStore';
import { Perfume } from '../data/perfumes';

export function useProducts() {
  const [products, setProducts] = useState<Perfume[]>([]);

  const load = useCallback(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    load();
    const handleStorage = (e: Event) => {
      if (e.type === 'cgstore_products_changed' || (e instanceof StorageEvent && e.key === 'cgstore_products')) {
        load();
      }
    };
    window.addEventListener('cgstore_products_changed', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('cgstore_products_changed', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, [load]);

  return { products, refresh: load };
}
