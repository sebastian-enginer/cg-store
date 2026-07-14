import { useState, useEffect } from "react";
import {
  Review,
  getStoredReviews,
  computeRatingSummary,
} from "../lib/reviewStore";

// 1. El Hook principal que ya teníamos
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Cargar las reseñas reales guardadas al iniciar
    setReviews(getStoredReviews());

    // Escuchar cuando se agrega una nueva reseña
    const handleUpdate = () => {
      setReviews(getStoredReviews());
    };

    window.addEventListener("reviews_updated", handleUpdate);

    return () => {
      window.removeEventListener("reviews_updated", handleUpdate);
    };
  }, []);

  return { reviews };
}

// 2. 🔑 LA FUNCIÓN FALTANTE: Esto es lo que necesita ProductCard.tsx para calcular las estrellitas en la página principal
export function useProductRating(productId: string) {
  const { reviews } = useReviews();

  const productReviews = reviews.filter((r) => r.productId === productId);
  const { average, count } = computeRatingSummary(productReviews);

  return { average, count };
}
