import { useState, useMemo, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Perfume } from "../data/perfumes";
import { StarRating } from "./StarRating";
import { ReviewForm } from "./ReviewForm";
import { useReviews } from "../hooks/useReviews";
import { useCart } from "../hooks/useCart";
import { computeRatingSummary } from "../lib/reviewStore";
import { ShoppingBag, Star, Sparkles, ShieldCheck } from "lucide-react";

type ProductDetailProps = {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
};

export function ProductDetail({
  perfume,
  isOpen,
  onClose,
}: ProductDetailProps) {
  const { reviews } = useReviews();
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (perfume && perfume.variants && perfume.variants.length > 0) {
      setSelectedVariant(perfume.variants[0]);
    }
  }, [perfume]);

  const productReviews = useMemo(
    () =>
      perfume
        ? reviews
            .filter((r) => r.productId === perfume.id)
            .sort((a, b) => b.createdAt - a.createdAt)
        : [],
    [reviews, perfume],
  );

  const { average, count } = useMemo(
    () => computeRatingSummary(productReviews),
    [productReviews],
  );

  if (!perfume) return null;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart(perfume, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  // Buscamos la propiedad de la imagen de forma segura
  const perfumeImage = perfume.imagePath || (perfume as any).imageUrl || "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-card border-card-border p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin">
          {/* SECCIÓN SUPERIOR: DETALLE DEL PRODUCTO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* COLUMNA IZQUIERDA: IMAGEN (Corregida para que se vea) */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-background/40 border border-border/40 flex items-center justify-center group shadow-inner">
              {perfumeImage ? (
                <img
                  src={perfumeImage}
                  alt={perfume.name}
                  className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Si falla la carga, intenta con una ruta relativa por si acaso
                    (e.target as HTMLImageElement).src =
                      `/assets/${perfumeImage.split("/").pop()}`;
                  }}
                />
              ) : (
                <div className="text-xs text-muted-foreground">
                  Sin imagen disponible
                </div>
              )}
              <div className="absolute top-3 left-3 bg-foreground/5 backdrop-blur-md border border-foreground/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                  Original
                </span>
              </div>
            </div>

            {/* COLUMNA DERECHA: INFORMACIÓN Y PRECIOS */}
            <div className="flex flex-col h-full justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="text-xs font-display tracking-[0.25em] text-primary uppercase font-bold">
                    {perfume.brand}
                  </p>
                  <div className="flex items-center gap-1.5 bg-foreground/5 px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-xs font-bold text-foreground">
                      {count > 0 ? average.toFixed(1) : "5.0"}
                    </span>
                  </div>
                </div>

                <h2 className="font-display text-3xl font-light uppercase tracking-wide text-foreground mb-4">
                  {perfume.name}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {perfume.description}
                </p>
              </div>

              {/* Selector de tamaños (ml) */}
              {perfume.variants && perfume.variants.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    Selecciona el Tamaño:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {perfume.variants.map((v: any) => (
                      <button
                        key={v.ml}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all duration-200 cursor-pointer ${
                          selectedVariant?.ml === v.ml
                            ? "bg-foreground text-background border-foreground font-bold"
                            : "bg-background/40 text-muted-foreground border-border"
                        }`}
                      >
                        {v.ml} ml
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Precio y Añadir */}
              <div className="pt-4 border-t border-border/40 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    Precio:
                  </span>
                  <span className="text-3xl font-mono font-light text-foreground">
                    $
                    {selectedVariant
                      ? selectedVariant.price.toLocaleString("es-CO")
                      : "0"}{" "}
                    COP
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`w-full h-12 rounded-xl font-display font-medium uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedAnimation
                      ? "bg-emerald-500 text-background"
                      : "bg-foreground text-background hover:bg-primary"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <ShieldCheck className="w-4 h-4" /> ¡Añadido Exitosamente!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Añadir al Carrito
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* SECCIÓN INFERIOR: RESEÑAS REALES */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-sm font-display uppercase tracking-widest text-foreground font-medium border-l-2 border-primary pl-3">
                Opiniones de Clientes ({count})
              </h3>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {productReviews.length === 0 ? (
                  <div className="bg-background/20 rounded-xl p-6 text-center border border-dashed border-border">
                    <p className="text-xs text-muted-foreground/70 italic">
                      Aún no hay opiniones reales para este perfume. ¡Sé el
                      primero en dejar la tuya abajo!
                    </p>
                  </div>
                ) : (
                  productReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 bg-background/30 rounded-xl border border-border/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                          {review.name}
                        </span>
                        <StarRating rating={review.rating} size={10} />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="md:col-span-5 bg-background/25 border border-border/40 rounded-xl p-5 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                ¿Tienes esta fragancia?
              </h4>
              <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                Escribe tu reseña 100% real para que quede guardada de forma
                permanente.
              </p>
              <div className="pt-2">
                <ReviewForm productId={perfume.id} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
