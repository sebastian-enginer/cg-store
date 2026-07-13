import { ShoppingBag, Search } from "lucide-react"; // 🌟 Añadimos 'Search' aquí
import { Logo3D } from "./Logo3D";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
  onTrackingClick: () => void; // 🌟 Añadimos la función para abrir el modal
};

export function Header({
  cartCount,
  onCartClick,
  onTrackingClick,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center px-4 md:px-8 justify-between transition-colors duration-300 bg-white/30 dark:bg-black/50 backdrop-blur-[12px] border-b border-black/5 dark:border-white/10">
      <div className="flex items-center">
        <Logo3D size="sm" />
      </div>

      <div className="flex items-center gap-3">
        {/* 🌟 BOTÓN ELEGANTE DE RASTREAR PEDIDO */}
        <button
          onClick={onTrackingClick}
          className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300 px-2 py-2 cursor-pointer"
          aria-label="Rastrear pedido"
        >
          <Search className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <span className="hidden sm:inline">Rastrear</span>
        </button>

        <ThemeToggle />

        <button
          onClick={onCartClick}
          className="relative cursor-pointer text-primary hover:text-primary/80 transition-colors duration-300 bg-transparent border-none p-2 flex items-center justify-center"
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
