'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('input') ||
        target?.closest('textarea') ||
        target?.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      animate={{
        x: position.x - (isHovered ? 18 : 6),
        y: position.y - (isHovered ? 18 : 6),
        scale: isHovered ? 1.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 30,
        mass: 0.4,
      }}
    >
      <div
        className={`rounded-full transition-all duration-200 ${
          isHovered
            ? 'w-9 h-9 border border-[#BEF264]/80 bg-[#BEF264]/10 backdrop-blur-[1px] shadow-[0_0_14px_rgba(190,242,100,0.5)]'
            : 'w-3 h-3 bg-[#BEF264] shadow-[0_0_10px_rgba(190,242,100,0.8)]'
        }`}
      />
    </motion.div>
  );
}
