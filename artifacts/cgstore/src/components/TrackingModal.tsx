import { useState, useEffect } from "react";
import { CreditCard, Package, Truck, CheckCircle2, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { findOrder, Order } from "../lib/orderStore";

export function TrackingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchKey, setSearchKey] = useState("");
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  // 🌟 EFECTO LIVE: Cada vez que el modal se abra, refresca los datos de la orden actual si ya hay una buscada
  useEffect(() => {
    if (isOpen && searchKey.trim()) {
      const updatedOrder = findOrder(searchKey.trim());
      if (updatedOrder) {
        setFoundOrder(updatedOrder);
      }
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const order = findOrder(searchKey.trim());
    if (order) {
      setFoundOrder(order);
    } else {
      setFoundOrder(null);
      setError("No se encontró ningún pedido con ese ID o teléfono.");
    }
  };

  const statusSteps = [
    {
      key: "pending",
      label: "Esperando Pago",
      desc: "Valida tu capture en el chat de Camilo.",
      icon: CreditCard,
    },
    {
      key: "preparing",
      label: "Preparando Paquete",
      desc: "Tu pedido está siendo embalado con su empaque original.",
      icon: Package,
    },
    {
      key: "shipped",
      label: "En Camino",
      desc: "El paquete va en ruta de entrega a tu ubicación.",
      icon: Truck,
    },
    {
      key: "delivered",
      label: "Entregado",
      desc: "¡Pedido recibido! Disfruta tu fragancia.",
      icon: CheckCircle2,
    },
  ];

  // Obtener el índice del estado actual de la orden de forma dinámica
  const currentStepIndex = foundOrder
    ? statusSteps.findIndex((step) => step.key === foundOrder.status)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] bg-card border-card-border p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display font-light uppercase tracking-widest text-center text-foreground">
            Seguimiento de Pedido
          </DialogTitle>
        </DialogHeader>

        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="flex gap-2 mt-2">
          <div className="relative flex-1">
            <Input
              placeholder="Ingresa tu ID (CG-XXXXXX) o Celular"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="bg-background/50 pr-10 focus-visible:ring-primary h-11"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="h-11 px-4 bg-foreground text-background font-medium uppercase tracking-widest text-xs rounded-md hover:bg-primary transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </form>

        {error && (
          <p className="text-center text-xs text-destructive mt-2">{error}</p>
        )}

        {/* LÍNEA DE TIEMPO REAL CONECTADA AL ESTADO */}
        {foundOrder && (
          <div className="mt-6 border-t border-border/60 pt-4 animate-in fade-in duration-300">
            <div className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
              Orden: {foundOrder.id} — Actualizado: Real-Time
            </div>

            <div className="relative pl-8 space-y-6 my-4 before:absolute before:bottom-2 before:top-2 before:left-[11px] before:w-[2px] before:bg-border">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompletedOrCurrent = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    key={step.key}
                    className={`relative transition-opacity duration-300 ${isCompletedOrCurrent ? "opacity-100" : "opacity-45"}`}
                  >
                    <div
                      className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-4 border-card z-10 transition-colors ${
                        isCurrent
                          ? "bg-primary animate-pulse"
                          : isCompletedOrCurrent
                            ? "bg-emerald-500"
                            : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-3 h-3 ${isCompletedOrCurrent ? "text-background" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${isCurrent ? "text-primary" : "text-foreground"}`}
                      >
                        {step.label} {isCurrent && "• Activo"}
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        {step.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ficha Resumen */}
            <div className="bg-background/80 border border-border rounded-lg p-3 mt-4 text-left text-xs text-muted-foreground space-y-1.5">
              <div>
                <strong className="text-foreground">Cliente:</strong>{" "}
                {foundOrder.customerName}
              </div>
              <div>
                <strong className="text-foreground">Destino:</strong>{" "}
                {foundOrder.address} ({foundOrder.city})
              </div>
              <div className="border-t border-border pt-1.5 mt-1.5 flex justify-between font-semibold text-foreground">
                <span>Total de Compra:</span>
                <span>${foundOrder.total.toLocaleString("es-CO")}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string },
) {
  return (
    <input
      {...props}
      className={`w-full px-3 h-10 bg-background border border-border rounded-md text-sm outline-none focus:border-primary ${props.className || ""}`}
    />
  );
}
