import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryPanel } from './InventoryPanel';
import { OrdersPanel } from './OrdersPanel';

type AdminDashboardProps = {
  onClose: () => void;
};

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] w-full bg-background flex flex-col"
    >
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-semibold uppercase tracking-widest text-foreground">
                Panel de Admin
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                CGSTORE Módulo de Gestión
              </p>
            </div>
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-background border border-border flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent-foreground transition-all"
            >
              <ArrowLeft size={16} />
              <span className="hidden md:inline">Volver a la Tienda</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="inventory" className="w-full h-full flex flex-col">
              <div className="px-6 pt-4 border-b border-border bg-background/50">
                <TabsList className="bg-muted w-full md:w-auto grid grid-cols-2 md:flex">
                  <TabsTrigger value="inventory" className="flex items-center gap-2 uppercase tracking-widest text-xs h-10">
                    <Package size={16} />
                    Inventario
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="flex items-center gap-2 uppercase tracking-widest text-xs h-10">
                    <ShoppingCart size={16} />
                    Ventas y Pedidos
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-background">
                <TabsContent value="inventory" className="mt-0 h-full">
                  <InventoryPanel />
                </TabsContent>
                <TabsContent value="orders" className="mt-0 h-full">
                  <OrdersPanel />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
