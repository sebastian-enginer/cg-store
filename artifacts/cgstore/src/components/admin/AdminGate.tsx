import { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, X } from 'lucide-react';

export function AdminGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open_admin_gate', handleOpen);
    return () => window.removeEventListener('open_admin_gate', handleOpen);
  }, []);

  if (!isOpen) return null;

  if (isUnlocked) {
    return <AdminDashboard onClose={() => { setIsOpen(false); setIsUnlocked(false); }} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsUnlocked(true);
      setError(false);
      setPassword('');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Lock size={24} />
          </div>
          <h2 className="text-xl font-display font-semibold uppercase tracking-widest text-foreground mb-2 text-center">
            Acceso Admin
          </h2>
          <p className="text-xs text-muted-foreground text-center mb-8">
            Ingresa la contraseña para gestionar el inventario y las ventas.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`text-center tracking-widest bg-background/50 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                autoFocus
              />
              {error && (
                <p className="text-destructive text-[10px] text-center mt-2 uppercase tracking-widest">
                  Contraseña incorrecta
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full uppercase tracking-widest text-xs font-semibold h-11"
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
