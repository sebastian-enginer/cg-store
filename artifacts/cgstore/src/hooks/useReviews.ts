import { useState, useEffect, useCallback, useMemo } from 'react';
import { getReviews, addReview as addReviewToStore, Review, computeRatingSummary } from '../lib/reviewStore';

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const load = useCallback(() => {
    setReviews(getReviews());
  }, []);

  useEffect(() => {
    load();
    const handleChange = (e: Event) => {
      if (e.type === 'cgstore_reviews_changed' || (e instanceof StorageEvent && e.key === 'cgstore_reviews')) {
        load();
      }
    };
    window.addEventListener('cgstore_reviews_changed', handleChange);
    window.addEventListener('storage', handleChange);
    return () => {
      window.removeEventListener('cgstore_reviews_changed', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, [load]);

  const addReview = useCallback((input: Omit<Review, 'id' | 'createdAt'>) => {
    addReviewToStore(input);
  }, []);

  return { reviews, addReview, refresh: load };
}

export function useProductRating(productId: number) {
  const { reviews } = useReviews();
  return useMemo(
    () => computeRatingSummary(reviews.filter((r) => r.productId === productId)),
    [reviews, productId],
  );
}
