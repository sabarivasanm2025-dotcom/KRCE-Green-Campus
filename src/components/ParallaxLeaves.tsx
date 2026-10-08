import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const ParallaxLeaves: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Decorative Leaf 1 - Top Left */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-[12%] -left-8 md:left-8 w-24 h-24 opacity-15 rotate-12 blur-[0.5px]"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-400">
          <path
            d="M50 10 C80 30 90 70 50 90 C10 70 20 30 50 10 Z"
            fill="currentColor"
            stroke="#a3e635"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* Decorative Leaf 2 - Top Right */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute top-[28%] -right-10 md:right-12 w-28 h-28 opacity-15 -rotate-45"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-lime-400">
          <path
            d="M30 15 C70 15 85 55 70 85 C40 85 15 55 30 15 Z"
            fill="currentColor"
            stroke="#10b981"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* Ambient Floating Particle 1 */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-[45%] left-[8%] w-2 h-2 rounded-full bg-lime-400/40 blur-[1px] animate-pulse-glow"
      />

      {/* Ambient Floating Particle 2 */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-[68%] right-[10%] w-3 h-3 rounded-full bg-emerald-400/30 blur-[1px] animate-pulse"
      />

      {/* Ambient Floating Particle 3 */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-[82%] left-[15%] w-2 h-2 rounded-full bg-lime-300/30 blur-[1px]"
      />
    </div>
  );
};
