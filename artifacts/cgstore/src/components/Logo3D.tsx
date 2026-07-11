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
  const containerClass = isLg ? "w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80" : "w-12 h-12";
  const innerClass = isLg ? "w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-3xl mx-auto mt-2" : "w-10 h-10 rounded-[10px] mx-auto mt-1";

  return (
    <div 
      style={{ perspective: isLg ? '1200px' : '800px' }} 
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
          animate={{ rotateY: [0, 8, 0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
          }}
          className={`relative overflow-hidden bg-black border border-white/10 shadow-2xl ${innerClass}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src={logoImg} 
            alt="CG Store Logo" 
            className="w-full h-full object-cover scale-[1.1] rounded-[inherit]" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
