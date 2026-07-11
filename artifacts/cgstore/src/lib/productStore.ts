import { perfumes as seedPerfumes, Perfume } from '../data/perfumes';

const STORE_KEY = 'cgstore_products';

export const getProducts = (): Perfume[] => {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse products from local storage", e);
  }
  
  // Seed
  localStorage.setItem(STORE_KEY, JSON.stringify(seedPerfumes));
  return seedPerfumes;
};

export const saveProducts = (products: Perfume[]) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('cgstore_products_changed'));
};

export const addProduct = (product: Omit<Perfume, 'id'>) => {
  const products = getProducts();
  const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  saveProducts([...products, { ...product, id }]);
};

export const updateProduct = (product: Perfume) => {
  const products = getProducts();
  saveProducts(products.map(p => p.id === product.id ? product : p));
};

export const deleteProduct = (id: number) => {
  const products = getProducts();
  saveProducts(products.filter(p => p.id !== id));
};
