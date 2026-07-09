import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type FilterBarProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
};

const CATEGORIES = ['Todos', 'Hombre', 'Mujer', 'Unisex'];

export function FilterBar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: FilterBarProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-400 ease-out font-medium ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105 border border-primary'
                : 'bg-transparent text-muted-foreground border border-transparent hover:border-border hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="relative w-full md:w-72">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-4 h-4" />
        </div>
        <Input
          type="text"
          placeholder="Buscar perfume..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 bg-transparent border-b border-x-0 border-t-0 rounded-none border-border focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-foreground transition-colors duration-300 shadow-none placeholder:text-muted-foreground/60"
        />
      </div>
    </div>
  );
}
