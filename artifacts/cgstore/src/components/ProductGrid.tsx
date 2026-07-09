import { motion, AnimatePresence } from 'framer-motion';
import { Perfume, PerfumeVariant } from '../data/perfumes';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, variant: PerfumeVariant) => void;
};

export function ProductGrid({ perfumes, onAddToCart }: ProductGridProps) {
  if (perfumes.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-display text-muted-foreground mb-2">Sin resultados</h3>
        <p className="text-sm text-muted-foreground/60">
          Intenta con otros filtros o términos de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-32">
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {perfumes.map((perfume) => (
            <motion.div
              key={perfume.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ProductCard perfume={perfume} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
