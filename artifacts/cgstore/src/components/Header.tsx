import { ShoppingBag } from 'lucide-react';
import { Logo3D } from './Logo3D';

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
};

export function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass h-16 flex items-center px-4 md:px-8 justify-between transition-all duration-300">
      <div className="flex-1">
        <Logo3D size="sm" />
      </div>
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold font-display tracking-[0.2em] text-foreground uppercase">
          c<span className="text-primary">g</span>store
        </h1>
      </div>
      <div className="flex-1 flex justify-end">
        <button 
          onClick={onCartClick}
          className="relative cursor-pointer hover:text-primary transition-colors duration-300 bg-transparent border-none p-2 flex items-center justify-center"
          aria-label="Abrir carrito"
        >
          <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
