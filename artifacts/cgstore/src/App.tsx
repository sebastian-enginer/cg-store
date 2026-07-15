import { useState, useMemo } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { ProductGrid } from "./components/ProductGrid";
import { CartBar } from "./components/CartBar";
import { CheckoutModal } from "./components/CheckoutModal";
import { CartSheet } from "./components/CartSheet";
import { TrackingModal } from "./components/TrackingModal"; // 🌟 Importamos el Modal de Seguimiento
import { TrustBadges } from "./components/TrustBadges";
import { Footer } from "./components/Footer";
import { AdminPage } from "./pages/AdminPage";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import { ThemeProvider } from "./contexts/ThemeContext";

function Store() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false); // 🌟 Estado para controlar el rastreo real-time

  const { products } = useProducts();

  const {
    cart,
    addToCart,
    removeFromCart,
    cartCount,
    cartTotal,
    isModalOpen,
    setIsModalOpen,
  } = useCart();

  const filteredPerfumes = useMemo(() => {
    return products.filter((perfume) => {
      const matchesCategory =
        activeCategory === "Todos" || perfume.gender === activeCategory;
      const matchesSearch =
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory, products]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* 🌟 Le pasamos la función onTrackingClick al Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartSheetOpen(true)}
        onTrackingClick={() => setIsTrackingOpen(true)}
      />

      <main className="flex-1 w-full flex flex-col">
        <HeroSection />

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ProductGrid perfumes={filteredPerfumes} onAddToCart={addToCart} />

        <TrustBadges />

        {/* 📱 SECCIÓN DE REDES SOCIALES (Rediseño de Lujo y más Grandes) */}
        <div className="w-full max-w-lg mx-auto px-6 py-14 text-center border-t border-zinc-900/50 mt-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-8">
            Conecta con nuestra comunidad
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Botón de Instagram de Lujo */}
            <a
              href="https://www.instagram.com/cgstore.col?igsh=YTZ4eXJyanlzaThj&utm_source=qr" // <-- Cambia esto por tu link real
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full sm:w-52 px-6 py-4 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:from-zinc-900 hover:to-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-2xl text-zinc-300 hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg group-hover:bg-rose-500/20 transition-colors">
                  <svg
                    className="w-5 h-5 text-rose-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold tracking-wide">
                    Instagram
                  </span>
                  <span className="block text-[10px] text-zinc-500 group-hover:text-zinc-400">
                    @cgstore
                  </span>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-zinc-600 group-hover:text-amber-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Botón de TikTok de Lujo */}
            <a
              href="https://www.tiktok.com/@cgstore.col?_r=1&_t=ZS-982mqErehTE" // <-- Cambia esto por tu link real
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full sm:w-52 px-6 py-4 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:from-zinc-900 hover:to-zinc-900 border border-zinc-800 hover:border-amber-500/40 rounded-2xl text-zinc-300 hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <svg
                    className="w-5 h-5 text-cyan-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold tracking-wide">
                    TikTok
                  </span>
                  <span className="block text-[10px] text-zinc-500 group-hover:text-zinc-400">
                    @cgstore
                  </span>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-zinc-600 group-hover:text-amber-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <Footer />

      <CartBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCheckout={() => setIsModalOpen(true)}
        onOpenCart={() => setIsCartSheetOpen(true)}
      />

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
      />

      <CartSheet
        isOpen={isCartSheetOpen}
        onClose={() => setIsCartSheetOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        onCheckout={() => {
          setIsCartSheetOpen(false);
          setIsModalOpen(true);
        }}
      />

      {/* 🌟 Componente del Modal de Seguimiento flotante */}
      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={Store} />
          <Route component={Store} />
        </Switch>
      </WouterRouter>
    </ThemeProvider>
  );
}

export default App;
