import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="relative flex items-center justify-center w-8 h-8 rounded-full text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-300"
    >
      {isDark ? (
        <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} />
      ) : (
        <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />
      )}
    </button>
  );
}
