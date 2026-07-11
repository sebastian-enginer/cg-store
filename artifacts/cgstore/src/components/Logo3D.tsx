import { useRef, MouseEvent, TouchEvent } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import logoImg from '../assets/logo.jpeg';

export function Logo3D() {
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
      clientX = e.clientX;
      clientY = e.clientY;
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

  return (
    <div 
      style={{ perspective: '800px' }} 
      className="flex items-center justify-center cursor-pointer w-12 h-12"
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
          className="relative w-10 h-10 rounded-[10px] overflow-hidden bg-black border border-white/10 shadow-lg mx-auto mt-1"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img 
            src={logoImg} 
            alt="CG Store Logo" 
            className="w-full h-full object-cover scale-[1.1] rounded-[10px]" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

