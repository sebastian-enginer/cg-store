import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft } from 'lucide-react';

export function AdminPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();

  if (isUnlocked) {
    return <AdminDashboard onClose={() => setLocation('/')} />;
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
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-center p-4 selection:bg-primary/30 selection:text-primary-foreground relative">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          Volver a la Tienda
        </Link>
      </div>

      <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
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
            <p className="text-[10px] text-muted-foreground/50 text-center uppercase tracking-widest mt-4">
              Contraseña de prueba: admin123
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
