import { useOrders } from '../../hooks/useOrders';
import { updateOrderStatus, Order } from '../../lib/orderStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, MapPin } from 'lucide-react';

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Esperando Pago',
  preparing: 'Empacando',
  shipped: 'En Camino',
  delivered: 'Entregado',
};

export function OrdersPanel() {
  const { orders } = useOrders();

  const formatDate = (dateString: string) => {
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) return dateString;
    return parsed.toLocaleString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-medium text-foreground">Pedidos y Ventas</h3>
        <p className="text-xs text-muted-foreground">Historial de órdenes iniciadas por WhatsApp</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl opacity-50">📋</span>
          </div>
          <h4 className="text-lg font-display text-foreground mb-1">Sin pedidos aún</h4>
          <p className="text-sm text-muted-foreground">
            Los pedidos aparecerán aquí cuando los clientes finalicen el checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col lg:flex-row gap-6">
              
              {/* Order Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-display font-semibold text-primary tracking-widest">{order.id}</h4>
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="uppercase text-[10px] tracking-widest">
                      {STATUS_LABELS[order.status]}
                    </Badge>
                  </div>
                  <Select 
                    value={order.status} 
                    onValueChange={(val: Order['status']) => updateOrderStatus(order.id, val)}
                  >
                    <SelectTrigger className="w-[160px] h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Esperando Pago</SelectItem>
                      <SelectItem value="preparing">Empacando</SelectItem>
                      <SelectItem value="shipped">En Camino</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="mt-0.5 text-primary/70" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <User size={16} className="mt-0.5 text-primary/70" />
                    <div>
                      <p className="text-foreground">{order.customerName}</p>
                      <p className="text-xs">{order.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 text-primary/70" />
                    <div>
                      <p className="text-foreground">{order.address}</p>
                      <p className="text-xs">{order.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="w-full lg:w-1/3 bg-muted/30 rounded-lg p-4 flex flex-col">
                <h5 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Resumen de Productos</h5>
                <ul className="space-y-2 flex-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.perfumeName} ({item.ml}ml)</span>
                      <span className="font-medium">${item.unitPrice * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                  <span className="font-display uppercase tracking-widest text-xs text-muted-foreground">Total</span>
                  <span className="font-display font-bold text-primary text-lg">${order.total}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
