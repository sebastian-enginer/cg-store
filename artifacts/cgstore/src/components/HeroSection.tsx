import { Logo3D } from './Logo3D';

export function HeroSection() {
  return (
    <section className="relative w-full h-[65vh] min-h-[450px] mt-16 overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#050505] to-[#111111]">
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-10">
        <Logo3D size="lg" />
        
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl md:text-5xl font-light font-display text-white tracking-[0.3em] uppercase">
            L'essence <br className="md:hidden" /> du luxe
          </h2>
          <div className="w-12 h-[1px] bg-primary my-1" />
          <p className="text-white/70 text-sm md:text-base font-sans tracking-widest font-light max-w-lg uppercase">
            Fragancias de alta perfumería curadas para quienes exigen lo excepcional
          </p>
        </div>
      </div>
    </section>
  );
}
