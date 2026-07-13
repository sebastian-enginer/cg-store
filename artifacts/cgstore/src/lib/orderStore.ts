export type OrderItem = {
  perfumeName: string;
  brand: string;
  ml: number;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string; // ID único tipo Shein (ej: CG-123456)
  customerName: string;
  phone: string;
  address: string;
  city: string;
  total: number;
  items: OrderItem[];
  status: "pending" | "preparing" | "shipped" | "delivered"; // Control real del estado
  createdAt: string;
};

// Cargar órdenes iniciales del localStorage si existen
let orders: Order[] =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cgstore_orders") || "[]")
    : [];

export function addOrder(
  orderData: Omit<Order, "id" | "status" | "createdAt">,
): Order {
  const newOrder: Order = {
    ...orderData,
    id: `CG-${Math.floor(100000 + Math.random() * 900000)}`, // ID único real
    status: "pending", // Arranca esperando pago
    createdAt: new Date().toLocaleDateString("es-CO"),
  };

  orders.push(newOrder);
  saveToStorage();
  return newOrder;
}

export function getOrders(): Order[] {
  return orders;
}

// Esta función la vas a usar en tu panel de /admin para cambiar el estado con un clic
export function updateOrderStatus(
  orderId: string,
  newStatus: Order["status"],
): boolean {
  const order = orders.find((o) => o.id === orderId || o.phone === orderId);
  if (order) {
    order.status = newStatus;
    saveToStorage();
    return true;
  }
  return false;
}

// Buscar orden para el cliente por ID o por Teléfono
export function findOrder(searchKey: string): Order | undefined {
  return orders.find(
    (o) =>
      o.id.toLowerCase() === searchKey.toLowerCase() || o.phone === searchKey,
  );
}

function saveToStorage() {
  if (typeof window !== "undefined") {
    localStorage.setItem("cgstore_orders", JSON.stringify(orders));
    window.dispatchEvent(new Event("cgstore_orders_changed"));
  }
}
