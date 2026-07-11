export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-xs text-muted-foreground font-display tracking-widest uppercase text-center">
          &copy; {new Date().getFullYear()} CGSTORE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
