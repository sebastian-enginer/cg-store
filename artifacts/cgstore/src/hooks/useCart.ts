import { useState, useMemo, useCallback } from 'react';
import { Perfume, PerfumeVariant } from '../data/perfumes';

export type CartItem = {
  perfume: Perfume;
  variant: PerfumeVariant;
  quantity: number;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = useCallback((perfume: Perfume, variant: PerfumeVariant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.perfume.id === perfume.id && item.variant.ml === variant.ml
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.perfume.id === perfume.id && item.variant.ml === variant.ml
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { perfume, variant, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((perfumeId: number, variantMl: number) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.perfume.id === perfumeId && item.variant.ml === variantMl)
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.variant.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    isModalOpen,
    setIsModalOpen,
  };
}
