import { useRef, MouseEvent, TouchEvent } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import logoImg from '../assets/logo.jpeg';

type Logo3DProps = {
  size?: 'sm' | 'lg';
};

export function Logo3D({ size = 'sm' }: Logo3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const rectRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    const rect = rectRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isLg = size === 'lg';
  const containerClass = isLg
    ? "w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px]"
    : "w-9 h-9";
  const innerClass = isLg
    ? "w-full h-full mx-auto"
    : "w-8 h-8 rounded-[9px] mx-auto bg-black border border-white/10 shadow-2xl overflow-hidden";
  const imageClass = isLg
    ? "w-full h-full object-contain"
    : "w-full h-full object-cover scale-[1.1] rounded-[inherit]";

  return (
    <div 
      style={{ perspective: '1000px' }} 
      className={`flex items-center justify-center cursor-pointer ${containerClass}`}
      ref={rectRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        <motion.div
          animate={{ rotateY: [-20, 20, -20] }}
          transition={{
            repeat: Infinity,
            duration: isLg ? 6 : 7,
            ease: "easeInOut",
          }}
          className={`relative ${innerClass}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src={logoImg} 
            alt="CG Store Logo" 
            className={imageClass} 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
