export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
}

const STORAGE_KEY = "cgstore_reviews_v1";

// 🔑 ESTA ES LA FUNCIÓN QUE VITE NO ENCONTRABA:
export function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Guarda la nueva reseña de forma permanente en el navegador
export function saveReview(review: Omit<Review, "id" | "createdAt">): Review {
  const newReview: Review = {
    ...review,
    id: `rev-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
  };

  const currentReviews = getStoredReviews();
  const updatedReviews = [newReview, ...currentReviews];

  // Guardado físico en el navegador
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));

  // Avisa a React que hay cambios para actualizar la pantalla al instante
  window.dispatchEvent(new Event("reviews_updated"));

  return newReview;
}

export function computeRatingSummary(reviews: Review[]) {
  if (reviews.length === 0) return { average: 5.0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: sum / reviews.length,
    count: reviews.length,
  };
}
