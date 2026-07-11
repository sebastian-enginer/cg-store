import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CartItem } from '../hooks/useCart';
import { addOrder } from '../lib/orderStore';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Nombre muy corto' }),
  phone: z.string().min(7, { message: 'Teléfono inválido' }),
  address: z.string().min(5, { message: 'Dirección muy corta' }),
  city: z.string().min(2, { message: 'Ciudad requerida' }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
};

export function CheckoutModal({ isOpen, onClose, cart, cartTotal }: CheckoutModalProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      address: '',
      city: '',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    // 1. Record order locally
    addOrder({
      customerName: data.fullName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      total: cartTotal,
      items: cart.map(item => ({
        perfumeName: item.perfume.name,
        brand: item.perfume.brand,
        ml: item.variant.ml,
        quantity: item.quantity,
        unitPrice: item.variant.price
      }))
    });

    // 2. Build WhatsApp Message
    const phoneNumber = '573001234567';
    let message = `*NUEVA ORDEN - CGSTORE*\n\n`;
    message += `*Cliente:* ${data.fullName}\n`;
    message += `*Teléfono:* ${data.phone}\n`;
    message += `*Dirección:* ${data.address}, ${data.city}\n\n`;
    message += `*PRODUCTOS:*\n`;

    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.perfume.name} (${item.perfume.brand}) - ${item.variant.ml}ml - ${item.variant.price * item.quantity}\n`;
    });

    message += `\n*TOTAL: ${cartTotal}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card border-card-border shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-light uppercase tracking-widest text-center text-foreground mb-2">
            Finalizar Compra
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Ingresa tus datos para procesar tu orden vía WhatsApp de forma segura.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                    Nombre Completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Carolina Herrera"
                      className="bg-background/50 focus-visible:ring-primary"
                      {...field}
                    />
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
                      className="bg-background/50 focus-visible:ring-primary"
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
                    Dirección de Entrega
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Calle 123 #45-67"
                      className="bg-background/50 focus-visible:ring-primary"
                      {...field}
                    />
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
                    <Input
                      placeholder="Ej. Bogotá"
                      className="bg-background/50 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-medium uppercase tracking-widest text-sm transition-all duration-300 rounded-md"
              >
                Confirmar Orden ($ {cartTotal})
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
