import { useState } from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
};

export function StarRating({ rating, size = 14, interactive = false, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayValue = hovered ?? rating;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
      {stars.map((s) => {
        const filled = s <= Math.round(displayValue);
        return (
          <button
            key={s}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHovered(s)}
            onClick={(e) => {
              e.stopPropagation();
              if (interactive) onChange?.(s);
            }}
            className={interactive ? 'cursor-pointer' : 'cursor-default pointer-events-none'}
            aria-label={`${s} estrella${s > 1 ? 's' : ''}`}
          >
            <Star
              style={{ width: size, height: size }}
              className={
                filled
                  ? 'fill-primary text-primary transition-colors'
                  : 'fill-transparent text-muted-foreground/40 transition-colors'
              }
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
