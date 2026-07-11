import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../hooks/useCart';

type CartSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  removeFromCart: (perfumeId: number, variantMl: number) => void;
  onCheckout: () => void;
};

export function CartSheet({
  isOpen,
  onClose,
  cart,
  cartTotal,
  removeFromCart,
  onCheckout,
}: CartSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-card border-l border-border p-0">
        <div className="p-6 pb-4 border-b border-border">
          <SheetHeader>
            <SheetTitle className="text-2xl font-display font-light uppercase tracking-widest text-foreground">
              Tu Carrito
            </SheetTitle>
            <SheetDescription>
              Revisa los productos antes de finalizar tu compra.
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <p className="text-lg font-display uppercase tracking-widest mb-2">
                Carrito Vacío
              </p>
              <p className="text-sm">Agrega algunas fragancias para continuar.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.perfume.id}-${item.variant.ml}`}
                className="flex items-center gap-4 bg-background p-3 rounded-lg border border-border"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                  {item.perfume.imagePath ? (
                    <img
                      src={item.perfume.imagePath}
                      alt={item.perfume.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs uppercase font-display opacity-50">CG</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {item.perfume.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate uppercase tracking-wider">
                    {item.perfume.brand}
                  </p>
                  <p className="text-xs mt-1">
                    {item.variant.ml}ml x {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-primary mt-1">
                    ${item.variant.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.perfume.id, item.variant.ml)}
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors shrink-0"
                  aria-label="Eliminar producto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                Total Estimado
              </span>
              <span className="text-xl font-bold font-display text-primary">
                ${cartTotal}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full h-12 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-medium uppercase tracking-widest text-sm transition-all duration-300 rounded-md shadow-md"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
