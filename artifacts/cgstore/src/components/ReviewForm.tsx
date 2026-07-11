import { useState, FormEvent } from 'react';
import { StarRating } from './StarRating';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useReviews } from '../hooks/useReviews';
import { Check } from 'lucide-react';

type ReviewFormProps = {
  productId: number;
};

export function ReviewForm({ productId }: ReviewFormProps) {
  const { addReview } = useReviews();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = name.trim().length > 0 && comment.trim().length > 0 && rating > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    addReview({ productId, name: name.trim(), rating, comment: comment.trim() });
    setName('');
    setRating(0);
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-4 border-t border-border">
      <h4 className="text-sm font-display tracking-widest uppercase text-foreground">
        Dejar una reseña
      </h4>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Tu calificación</span>
        <StarRating rating={rating} size={20} interactive onChange={setRating} />
      </div>

      <Input
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-transparent"
      />

      <Textarea
        placeholder="Comparte tu experiencia con este perfume..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-transparent min-h-[80px]"
      />

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full h-10 flex items-center justify-center text-sm font-medium tracking-widest uppercase rounded-md transition-all duration-300
          ${
            submitted
              ? 'bg-primary text-primary-foreground'
              : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-foreground'
          }`}
      >
        {submitted ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" /> ¡Gracias por tu reseña!
          </span>
        ) : (
          'Enviar reseña'
        )}
      </button>
    </form>
  );
}
