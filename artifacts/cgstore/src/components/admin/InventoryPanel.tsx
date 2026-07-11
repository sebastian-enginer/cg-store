import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Perfume, PerfumeVariant } from '../../data/perfumes';
import { addProduct, updateProduct, deleteProduct } from '../../lib/productStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Plus, PlusCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export function InventoryPanel() {
  const { products } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Perfume | null>(null);
  
  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    gender: 'Hombre' | 'Mujer' | 'Unisex';
    description: string;
    imagePath: string;
    variants: PerfumeVariant[];
  }>({
    name: '',
    brand: '',
    gender: 'Unisex',
    description: '',
    imagePath: '',
    variants: [{ ml: 50, price: 100 }]
  });

  const handleOpenNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: '',
      gender: 'Unisex',
      description: '',
      imagePath: '',
      variants: [{ ml: 50, price: 100 }]
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Perfume) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      gender: product.gender,
      description: product.description,
      imagePath: product.imagePath || '',
      variants: [...product.variants]
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { ml: 100, price: 150 }]
    }));
  };

  const updateVariant = (index: number, field: 'ml' | 'price', value: number) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData(prev => ({ ...prev, variants: newVariants }));
  };

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.brand || formData.variants.length === 0) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData
      });
    } else {
      addProduct(formData);
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-display font-medium text-foreground">Inventario Activo</h3>
          <p className="text-xs text-muted-foreground">{products.length} productos registrados</p>
        </div>
        <Button onClick={handleOpenNew} className="gap-2 uppercase tracking-widest text-xs">
          <Plus size={16} /> Agregar Producto
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-widest font-display">
              <tr>
                <th className="px-6 py-4 font-medium">Producto</th>
                <th className="px-6 py-4 font-medium">Marca</th>
                <th className="px-6 py-4 font-medium">Género</th>
                <th className="px-6 py-4 font-medium">Variantes</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted overflow-hidden flex-shrink-0">
                        {product.imagePath ? (
                          <img src={product.imagePath} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary/20" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{product.brand}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest bg-background border border-border">
                      {product.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {product.variants.map(v => `${v.ml}ml ($${v.price})`).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(product)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No hay productos en el inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display uppercase tracking-widest">
              {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
            </DialogTitle>
            <DialogDescription>
              Completa los detalles del perfume para mostrarlo en la tienda.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Nombre</label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} 
                  placeholder="Ej. Bleu de Chanel"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Marca</label>
                <Input 
                  value={formData.brand} 
                  onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))} 
                  placeholder="Ej. CHANEL"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Género</label>
                <Select 
                  value={formData.gender} 
                  onValueChange={(val: 'Hombre' | 'Mujer' | 'Unisex') => setFormData(prev => ({ ...prev, gender: val }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hombre">Hombre</SelectItem>
                    <SelectItem value="Mujer">Mujer</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">URL de Imagen</label>
                <Input 
                  value={formData.imagePath} 
                  onChange={e => setFormData(prev => ({ ...prev, imagePath: e.target.value }))} 
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Descripción</label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} 
                placeholder="Descripción del aroma y notas..."
                className="resize-none"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Variantes (ml y Precio)</label>
                <Button variant="ghost" size="sm" onClick={addVariant} className="h-8 text-xs gap-1">
                  <PlusCircle size={14} /> Agregar
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.variants.map((variant, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">ml</span>
                      <Input 
                        type="number" 
                        value={variant.ml} 
                        onChange={e => updateVariant(idx, 'ml', Number(e.target.value))} 
                      />
                    </div>
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        value={variant.price} 
                        onChange={e => updateVariant(idx, 'price', Number(e.target.value))} 
                        className="pl-6"
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeVariant(idx)}
                      disabled={formData.variants.length === 1}
                      className="text-destructive"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit} className="uppercase tracking-widest text-xs">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
