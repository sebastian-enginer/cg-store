import { Logo3D } from './Logo3D';

export function HeroSection() {
  return (
    <section className="relative w-full h-[65vh] min-h-[420px] mt-16 overflow-hidden flex items-center justify-center bg-white dark:bg-gradient-to-b dark:from-[#050505] dark:to-[#111111] transition-colors duration-300">
      <div className="relative z-10 flex items-center justify-center px-4">
        <Logo3D size="lg" />
      </div>
    </section>
  );
}
