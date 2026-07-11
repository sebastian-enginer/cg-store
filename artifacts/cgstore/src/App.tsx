import { useState, useMemo } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { CartBar } from './components/CartBar';
import { CheckoutModal } from './components/CheckoutModal';
import { CartSheet } from './components/CartSheet';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { AdminPage } from './pages/AdminPage';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';

function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);

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
        activeCategory === 'Todos' || perfume.gender === activeCategory;
      const matchesSearch =
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory, products]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Header cartCount={cartCount} onCartClick={() => setIsCartSheetOpen(true)} />
      
      <main className="flex-1 w-full flex flex-col">
        <HeroSection />
        
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        <ProductGrid
          perfumes={filteredPerfumes}
          onAddToCart={addToCart}
        />
        
        <TrustBadges />
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
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={Store} />
        <Route component={Store} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
