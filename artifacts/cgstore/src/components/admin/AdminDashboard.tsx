import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Package, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryPanel } from './InventoryPanel';
import { OrdersPanel } from './OrdersPanel';

type AdminDashboardProps = {
  onClose: () => void;
};

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto"
    >
      <div className="min-h-full p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
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
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent-foreground transition-all"
            >
              <X size={20} />
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
