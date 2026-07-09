import { motion, AnimatePresence } from 'framer-motion';

type CartBarProps = {
  cartCount: number;
  cartTotal: number;
  onCheckout: () => void;
};

export function CartBar({ cartCount, cartTotal, onCheckout }: CartBarProps) {
  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-dark rounded-2xl p-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4 text-white">
              <div className="bg-primary/20 text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold font-display">
                {cartCount}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/60 uppercase tracking-widest font-display">
                  Total
                </span>
                <span className="text-lg font-bold font-display text-primary">
                  ${cartTotal}
                </span>
              </div>
            </div>
            
            <button
              onClick={onCheckout}
              className="bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-xl font-medium tracking-wide shadow-lg shadow-[#25D366]/20 transition-all duration-300 ease-out flex items-center gap-2 hover:-translate-y-1"
            >
              Comprar por WhatsApp
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
