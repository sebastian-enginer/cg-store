import { useState, useEffect, useRef } from 'react';
import { Perfume, PerfumeVariant } from '../data/perfumes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';

type ProductCardProps = {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, variant: PerfumeVariant) => void;
};

export function ProductCard({ perfume, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<PerfumeVariant>(perfume.variants[0]);
  const [isAdded, setIsAdded] = useState(false);
  const priceRef = useRef<HTMLDivElement>(null);

  // Trigger pulse animation when price changes
  useEffect(() => {
    if (priceRef.current) {
      priceRef.current.classList.remove('animate-pulse-price');
      // trigger reflow
      void priceRef.current.offsetWidth;
      priceRef.current.classList.add('animate-pulse-price');
    }
  }, [selectedVariant.price]);

  const handleAdd = () => {
    onAddToCart(perfume, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col bg-card rounded-xl border border-card-border overflow-hidden transition-all duration-400 ease-out hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
      {/* Image container */}
      <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden flex items-center justify-center p-6">
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-background/80 backdrop-blur-sm px-2 py-1 rounded-sm text-foreground">
            {perfume.gender}
          </span>
        </div>
        {perfume.imagePath ? (
          <img
            src={perfume.imagePath}
            alt={perfume.name}
            className="object-contain w-full h-full drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted animate-pulse rounded-md" />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs font-display tracking-[0.2em] text-muted-foreground uppercase mb-1">
            {perfume.brand}
          </p>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2 leading-tight">
            {perfume.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
            {perfume.description}
          </p>
        </div>

        <div className="flex items-end justify-between mb-5 mt-auto">
          <div className="w-1/2">
            <Select
              value={selectedVariant.ml.toString()}
              onValueChange={(val) => {
                const variant = perfume.variants.find((v) => v.ml.toString() === val);
                if (variant) setSelectedVariant(variant);
              }}
            >
              <SelectTrigger className="w-full h-9 bg-transparent border-border focus:ring-primary/20 text-sm">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {perfume.variants.map((v) => (
                  <SelectItem key={v.ml} value={v.ml.toString()}>
                    {v.ml} ml
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block mb-0.5">Precio</span>
            <div
              ref={priceRef}
              className="text-lg font-bold font-display text-primary tracking-wide transition-colors"
            >
              ${selectedVariant.price}
            </div>
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={isAdded}
          className={`w-full h-11 flex items-center justify-center text-sm font-medium tracking-widest uppercase transition-all duration-400 ease-out rounded-md
            ${
              isAdded
                ? 'bg-primary text-primary-foreground'
                : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground'
            }
          `}
        >
          {isAdded ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Agregado
            </span>
          ) : (
            'Agregar al carrito'
          )}
        </button>
      </div>
    </div>
  );
}
