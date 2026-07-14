import { useState } from "react";
import { saveReview } from "../lib/reviewStore";
import { Star } from "lucide-react";

type ReviewFormProps = {
  productId: string;
};

export function ReviewForm({ productId }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    // Guardamos de verdad en el LocalStorage
    saveReview({
      productId,
      name: name.trim(),
      rating,
      comment: comment.trim(),
    });

    // Limpiamos el formulario y mostramos éxito
    setName("");
    setComment("");
    setRating(5);
    setIsSubmitted(true);

    // Ocultar el mensaje de éxito después de 3 segundos
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {isSubmitted && (
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center rounded-lg animate-in fade-in">
          ¡Gracias! Tu opinión real ha sido guardada.
        </div>
      )}

      {/* Selector de Estrellas Interactivo */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider mr-1">
          Calificación:
        </span>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="p-1 hover:scale-110 transition-transform cursor-pointer"
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  star <= (hoveredRating ?? rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Input de Nombre */}
      <input
        type="text"
        placeholder="Tu nombre o apodo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full h-9 px-3 bg-background/50 border border-border/60 rounded-lg text-xs outline-none focus:border-primary transition-colors text-foreground"
      />

      {/* Textarea de Comentario */}
      <textarea
        placeholder="¿Qué te pareció su aroma, duración y proyección?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={3}
        className="w-full p-3 bg-background/50 border border-border/60 rounded-lg text-xs outline-none focus:border-primary transition-colors resize-none text-foreground leading-relaxed"
      />

      {/* Botón de Envío */}
      <button
        type="submit"
        className="w-full h-9 bg-foreground text-background hover:bg-primary font-display font-medium uppercase tracking-widest text-[10px] rounded-lg transition-colors cursor-pointer"
      >
        Publicar Opinión
      </button>
    </form>
  );
}
