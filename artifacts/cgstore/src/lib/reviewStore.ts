export interface Review {
  id: string;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
}

const STORAGE_KEY = "cgstore_reviews";

const SEED_REVIEWS: Review[] = [
  {
    id: "seed-1",
    productId: 1,
    name: "Valentina R.",
    rating: 5,
    comment: "Huele exactamente como el original, dura todo el día.",
    createdAt: Date.parse("2026-04-02T10:00:00"),
  },
  {
    id: "seed-2",
    productId: 1,
    name: "Andrés P.",
    rating: 4,
    comment: "Muy buena fragancia, llegó bien empacada y rápido.",
    createdAt: Date.parse("2026-04-15T14:30:00"),
  },
  {
    id: "seed-3",
    productId: 2,
    name: "Carlos M.",
    rating: 5,
    comment: "El clásico de siempre, llegó perfecto y sellado de fábrica.",
    createdAt: Date.parse("2026-04-20T09:15:00"),
  },
  {
    id: "seed-6",
    productId: 2,
    name: "Roberto T.",
    rating: 4,
    comment: "Muy fresco y elegante, ideal para el día a día.",
    createdAt: Date.parse("2026-05-09T11:20:00"),
  },
  {
    id: "seed-4",
    productId: 3,
    name: "Daniela S.",
    rating: 5,
    comment: "Mi favorito, la proyección es increíble para la noche.",
    createdAt: Date.parse("2026-05-01T18:45:00"),
  },
  {
    id: "seed-5",
    productId: 3,
    name: "Juan F.",
    rating: 4,
    comment: "Excelente relación calidad-precio, lo recomiendo.",
    createdAt: Date.parse("2026-05-12T20:00:00"),
  },
];

function readFromStorage(): Review[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  // First load: seed with example reviews so the store doesn't look empty
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REVIEWS));
  return SEED_REVIEWS;
}

function writeToStorage(reviews: Review[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event("cgstore_reviews_changed"));
}

export function getReviews(): Review[] {
  return readFromStorage();
}

export function getReviewsForProduct(productId: number): Review[] {
  return readFromStorage().filter((r) => r.productId === productId);
}

export function addReview(review: Omit<Review, "id" | "createdAt">): Review {
  const newReview: Review = {
    ...review,
    id: `rev-${Math.random().toString(36).slice(2, 11)}`,
    createdAt: Date.now(),
  };

  const current = readFromStorage();
  writeToStorage([newReview, ...current]);

  return newReview;
}

export function computeRatingSummary(reviews: Review[]) {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: sum / reviews.length,
    count: reviews.length,
  };
}
