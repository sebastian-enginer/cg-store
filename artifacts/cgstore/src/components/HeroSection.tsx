import heroImg from '../assets/hero.jpg';

export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[400px] mt-16 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="L'essence du luxe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-4">
        <h2 className="text-4xl md:text-6xl font-light font-display text-white tracking-widest uppercase">
          L'essence <br className="md:hidden" /> du luxe
        </h2>
        <div className="w-12 h-[1px] bg-primary my-2" />
        <p className="text-white/90 text-sm md:text-base font-sans tracking-wide font-light max-w-lg">
          Fragancias de alta perfumería curadas para quienes exigen lo excepcional
        </p>
      </div>
    </section>
  );
}
