import { Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground font-display tracking-widest uppercase">
          &copy; {new Date().getFullYear()} CGSTORE. Todos los derechos reservados.
        </div>
        
        <div>
          <a
            href="#admin"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new Event('open_admin_gate'));
            }}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <Lock size={12} strokeWidth={2} />
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
