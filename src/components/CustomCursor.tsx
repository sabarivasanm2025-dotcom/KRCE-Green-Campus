import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'card' | 'image' | 'link'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Check touch/mobile device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check target element type for reactive cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestImage = target.closest('img, [data-cursor="view"]');
      const closestButton = target.closest('button, [role="button"], [data-cursor="button"]');
      const closestCard = target.closest('.glass-panel-hover, [data-cursor="card"]');
      const closestLink = target.closest('a, [data-cursor="link"]');

      if (closestImage) {
        setCursorType('image');
      } else if (closestButton) {
        setCursorType('button');
      } else if (closestCard) {
        setCursorType('card');
      } else if (closestLink) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Calculate size and styling based on cursorType
  const getOuterSize = () => {
    switch (cursorType) {
      case 'image':
        return 64;
      case 'button':
        return 48;
      case 'card':
        return 52;
      case 'link':
        return 42;
      default:
        return 32;
    }
  };

  const outerSize = getOuterSize();

  return (
    <div className="custom-cursor fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Central Sharp Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lime-300 pointer-events-none shadow-[0_0_10px_#bef264]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.6 : cursorType === 'button' ? 1.4 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing Outer Glowing Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none border flex items-center justify-center transition-colors duration-200 ${
          cursorType === 'image'
            ? 'bg-emerald-500/20 border-lime-300 shadow-[0_0_24px_rgba(190,242,100,0.5)]'
            : cursorType === 'button'
            ? 'bg-lime-400/15 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.35)]'
            : cursorType === 'card'
            ? 'bg-emerald-500/10 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'bg-transparent border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
        }`}
        style={{
          x: springX,
          y: springY,
          width: outerSize,
          height: outerSize,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.85 : 1,
        }}
      >
        {cursorType === 'image' && (
          <span className="text-[10px] font-bold tracking-widest text-lime-300 font-mono select-none">
            VIEW
          </span>
        )}
      </motion.div>
    </div>
  );
};
