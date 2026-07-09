import { useState, useMemo } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { CartBar } from './components/CartBar';
import { CheckoutModal } from './components/CheckoutModal';
import { perfumes } from './data/perfumes';
import { useCart } from './hooks/useCart';

function Store() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const {
    cart,
    addToCart,
    cartCount,
    cartTotal,
    isModalOpen,
    setIsModalOpen,
  } = useCart();

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((perfume) => {
      const matchesCategory =
        activeCategory === 'Todos' || perfume.gender === activeCategory;
      const matchesSearch =
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Header cartCount={cartCount} />
      
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
      </main>

      <CartBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCheckout={() => setIsModalOpen(true)}
      />

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
      />
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" component={Store} />
        {/* Fallback to Store for any unknown route since it's a single page app */}
        <Route component={Store} />
      </Switch>
    </WouterRouter>
  );
}

export default App;
