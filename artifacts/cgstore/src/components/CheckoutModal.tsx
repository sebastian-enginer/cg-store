import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, CheckCircle2, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartItem } from "../hooks/useCart";
import { addOrder, Order } from "../lib/orderStore";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Nombre muy corto" }),
  phone: z.string().min(7, { message: "Telefono invalido" }),
  address: z.string().min(5, { message: "Direccion muy corta" }),
  city: z.string().min(2, { message: "Ciudad requerida" }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
};

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  cartTotal,
}: CheckoutModalProps) {
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", phone: "", address: "", city: "" },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    // Guardar en base de datos y obtener la orden real con su ID único
    const order = addOrder({
      customerName: data.fullName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      total: cartTotal,
      items: cart.map((item) => ({
        perfumeName: item.perfume.name,
        brand: item.perfume.brand,
        ml: item.variant.ml,
        quantity: item.quantity,
        unitPrice: item.variant.price,
      })),
    });

    setCreatedOrder(order);

    // Enviar a WhatsApp
    const phoneNumber = "573116115500";
    let message = `*CGSTORE — NUEVO PEDIDO ${order.id}*\n\n`;
    message += `Cliente: ${data.fullName}\n`;
    message += `Telefono: ${data.phone}\n`;
    message += `Direccion: ${data.address}\n`;
    message += `Ciudad: ${data.city}\n\n`;
    message += `*PRODUCTOS*\n`;
    cart.forEach((item) => {
      message += `${item.quantity}x ${item.perfume.name} (${item.variant.ml}ml)\n`;
    });
    message += `\n*TOTAL:* $${cartTotal.toLocaleString("es-CO")}\n\n`;
    message += `Por favor, mandame el medio de pago para confirmar el pedido.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseAll = () => {
    setCreatedOrder(null);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseAll()}>
      <DialogContent className="sm:max-w-[440px] bg-card border-card-border p-6 overflow-hidden">
        {!createdOrder ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-light uppercase tracking-widest text-center text-foreground">
                Finalizar Compra
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                {/* Campos normales del formulario */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                        Nombre Completo
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Carolina Herrera" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                        Teléfono (WhatsApp)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Ej. 3001234567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                        Dirección
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Calle 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                        Ciudad
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Barranquilla" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  className="w-full h-12 bg-foreground text-background hover:bg-primary font-medium uppercase tracking-widest text-sm rounded-md transition-all"
                >
                  Confirmar Orden (${cartTotal.toLocaleString("es-CO")})
                </button>
              </form>
            </Form>
          </>
        ) : (
          /* PANTALLA POST-COMPRA: LE DA SU CÓDIGO DE SEGUIMIENTO */
          <div className="flex flex-col items-center text-center py-4 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-display font-medium uppercase tracking-wider text-foreground">
              ¡Orden Registrada!
            </h3>
            <p className="text-xs text-muted-foreground px-4 mt-1">
              Tu chat de WhatsApp se ha abierto. Guarda tu código de seguimiento
              para rastrear tu envío en la barra superior de la tienda:
            </p>

            <div className="flex items-center gap-2 bg-background border border-border px-4 py-2.5 rounded-lg my-4 font-mono text-sm font-bold text-primary tracking-widest relative">
              <span>{createdOrder.id}</span>
              <button
                onClick={() => copyToClipboard(createdOrder.id)}
                className="text-muted-foreground hover:text-foreground transition-colors ml-2"
              >
                <Copy className="w-4 h-4" />
              </button>
              {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded text-xs animate-bounce">
                  ¡Copiado!
                </span>
              )}
            </div>

            <button
              onClick={handleCloseAll}
              className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-background font-medium uppercase tracking-widest text-xs rounded-md transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a la Tienda
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
