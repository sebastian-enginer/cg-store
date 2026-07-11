export type Review = {
  id: string;
  productId: number;
  name: string;
  rating: number; // 1-5
  comment: string;
  createdAt: number;
};

const STORE_KEY = 'cgstore_reviews';

const seedReviews: Review[] = [
  {
    id: 'seed-1',
    productId: 1,
    name: 'Marcos R.',
    rating: 5,
    comment: 'Huele exactamente como el original, entrega rápida y muy bien empacado.',
    createdAt: Date.parse('2026-05-02T10:00:00'),
  },
  {
    id: 'seed-2',
    productId: 1,
    name: 'Daniela G.',
    rating: 4,
    comment: 'Excelente fijación, dura todo el día. Repetiré compra.',
    createdAt: Date.parse('2026-05-14T15:30:00'),
  },
  {
    id: 'seed-3',
    productId: 2,
    name: 'Carlos M.',
    rating: 5,
    comment: 'El clásico de siempre, llegó perfecto y sellado de fábrica.',
    createdAt: Date.parse('2026-04-20T09:15:00'),
  },
  {
    id: 'seed-6',
    productId: 2,
    name: 'Roberto T.',
    rating: 4,
    comment: 'Muy fresco y elegante, ideal para el día a día.',
    createdAt: Date.parse('2026-05-09T11:20:00'),
  },
  {
    id: 'seed-4',
    productId: 3,
    name: 'Valentina P.',
    rating: 5,
    comment: 'Me encantó el empaque y el aroma es tal cual el original.',
    createdAt: Date.parse('2026-05-28T18:45:00'),
  },
  {
    id: 'seed-5',
    productId: 3,
    name: 'Andrea L.',
    rating: 4,
    comment: 'Muy bueno, aunque esperaba un poco más de duración.',
    createdAt: Date.parse('2026-06-03T12:00:00'),
  },
];

export const getReviews = (): Review[] => {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse reviews from local storage', e);
  }

  localStorage.setItem(STORE_KEY, JSON.stringify(seedReviews));
  return seedReviews;
};

export const saveReviews = (reviews: Review[]) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event('cgstore_reviews_changed'));
};

export const getReviewsForProduct = (productId: number): Review[] => {
  return getReviews()
    .filter((r) => r.productId === productId)
    .sort((a, b) => b.createdAt - a.createdAt);
};

export const addReview = (input: Omit<Review, 'id' | 'createdAt'>) => {
  const reviews = getReviews();
  const newReview: Review = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
  saveReviews([...reviews, newReview]);
};

export const computeRatingSummary = (reviews: Review[]): { average: number; count: number } => {
  if (reviews.length === 0) return { average: 0, count: 0 };
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return { average: Math.round((total / reviews.length) * 10) / 10, count: reviews.length };
};
