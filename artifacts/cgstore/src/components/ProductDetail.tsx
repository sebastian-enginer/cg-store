import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Perfume } from '../data/perfumes';
import { StarRating } from './StarRating';
import { ReviewForm } from './ReviewForm';
import { useReviews } from '../hooks/useReviews';
import { computeRatingSummary } from '../lib/reviewStore';

type ProductDetailProps = {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
};

export function ProductDetail({ perfume, isOpen, onClose }: ProductDetailProps) {
  const { reviews } = useReviews();

  const productReviews = useMemo(
    () =>
      perfume
        ? reviews.filter((r) => r.productId === perfume.id).sort((a, b) => b.createdAt - a.createdAt)
        : [],
    [reviews, perfume],
  );

  const { average, count } = useMemo(() => computeRatingSummary(productReviews), [productReviews]);

  if (!perfume) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg bg-card border-card-border">
        <DialogHeader>
          <p className="text-xs font-display tracking-[0.2em] text-muted-foreground uppercase">
            {perfume.brand}
          </p>
          <DialogTitle className="font-display text-2xl">{perfume.name}</DialogTitle>
          <DialogDescription>{perfume.description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <StarRating rating={average} size={16} />
          <span className="text-sm text-muted-foreground">
            {count > 0 ? `${average.toFixed(1)} (${count} reseña${count === 1 ? '' : 's'})` : 'Sin reseñas aún'}
          </span>
        </div>

        <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-1">
          {productReviews.length === 0 ? (
            <p className="text-sm text-muted-foreground/70 italic">
              Sé el primero en compartir tu experiencia con este perfume.
            </p>
          ) : (
            productReviews.map((review) => (
              <div key={review.id} className="pb-3 border-b border-border last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{review.name}</span>
                  <StarRating rating={review.rating} size={12} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        <ReviewForm productId={perfume.id} />
      </DialogContent>
    </Dialog>
  );
}
