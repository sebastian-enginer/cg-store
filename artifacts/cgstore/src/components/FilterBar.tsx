interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}: FilterBarProps) {
  // Categorías de tu tienda
  const categories = ["Todos", "Masculino", "Femenino", "Unisex"];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6 space-y-6">
      {/* 🔍 BUSCADOR PREMIUM CENTRADO */}
      <div className="w-full max-w-xl mx-auto">
        <div className="group relative flex items-center bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 rounded-full px-5 py-3.5 transition-all duration-500 focus-within:border-amber-500/40 focus-within:shadow-[0_0_20px_rgba(245,158,11,0.05)]">
          {/* Icono de Lupa Elegante (SVG Nativo) */}
          <svg
            className="w-4 h-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors duration-300 mr-3 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input de Búsqueda */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Qué fragancia buscas hoy?"
            className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-500 outline-none font-light tracking-wide"
          />

          {/* Botón para limpiar texto escrito */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 text-zinc-500 hover:text-amber-500 transition-colors rounded-full"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 🏷️ BOTONES DE CATEGORÍAS */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-[10px] tracking-wider uppercase transition-all duration-500 ${
              activeCategory === category
                ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/10 border border-amber-500"
                : "bg-zinc-900/20 text-zinc-400 hover:text-zinc-200 border border-zinc-900 hover:border-zinc-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
