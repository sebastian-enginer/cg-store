import { ShieldCheck, Truck, Clock } from 'lucide-react';

export function TrustBadges() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 mb-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        <div className="flex flex-col items-center justify-center text-center space-y-3 group">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
            <ShieldCheck strokeWidth={1.5} size={24} />
          </div>
          <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-foreground">
            Garantía de Originalidad 100%
          </h4>
          <p className="text-xs text-muted-foreground/80 max-w-[200px] leading-relaxed">
            Todos nuestros productos son auténticos y sellados.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-3 group">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
            <Truck strokeWidth={1.5} size={24} />
          </div>
          <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-foreground">
            Envíos Asegurados a Todo el País
          </h4>
          <p className="text-xs text-muted-foreground/80 max-w-[200px] leading-relaxed">
            Tu paquete llega seguro, estés donde estés.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-3 group">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
            <Clock strokeWidth={1.5} size={24} />
          </div>
          <h4 className="font-display uppercase tracking-widest text-xs font-semibold text-foreground">
            Soporte Premium 24/7
          </h4>
          <p className="text-xs text-muted-foreground/80 max-w-[200px] leading-relaxed">
            Asistencia en cualquier momento para tu tranquilidad.
          </p>
        </div>
      </div>
    </section>
  );
}
