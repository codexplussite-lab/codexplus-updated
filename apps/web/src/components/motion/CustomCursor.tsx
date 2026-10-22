'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rippleContainerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    // Only enable on devices that have a precise pointer (mouse / trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsPointerDevice(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const rippleContainer = rippleContainerRef.current;
    if (!dot || !ring || !glow) return;

    // Direct GSAP quickTo setters for instant & lag-free mouse positioning
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });

    const xGlow = gsap.quickTo(glow, 'x', { duration: 0.45, ease: 'power2.out' });
    const yGlow = gsap.quickTo(glow, 'y', { duration: 0.45, ease: 'power2.out' });

    let isHoveringInteractive = false;
    let lastTrailTime = 0;

    const spawnTrailParticle = (x: number, y: number) => {
      if (!rippleContainer) return;

      const particle = document.createElement('div');
      particle.className =
        'pointer-events-none fixed top-0 left-0 rounded-full will-change-transform';

      // Small subtle purple glowing particle
      const size = Math.random() * 4 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.marginLeft = `-${size / 2}px`;
      particle.style.marginTop = `-${size / 2}px`;
      particle.style.backgroundColor = isHoveringInteractive
        ? '#A855F7'
        : 'rgba(99, 32, 238, 0.7)';
      particle.style.boxShadow = '0 0 8px rgba(168, 85, 247, 0.8)';

      rippleContainer.appendChild(particle);

      gsap.set(particle, {
        x,
        y,
        opacity: 0.8,
        scale: 1,
      });

      gsap.to(particle, {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        opacity: 0,
        scale: 0.2,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: () => {
          particle.remove();
        },
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!isVisible) setIsVisible(true);

      xDot(x);
      yDot(y);
      xRing(x);
      yRing(y);
      xGlow(x);
      yGlow(y);

      // Spawn soft trail particles while mouse moves
      const now = performance.now();
      if (now - lastTrailTime > 35) {
        spawnTrailParticle(x, y);
        lastTrailTime = now;
      }

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'a, button, input, textarea, select, [data-cursor="pointer"], [role="button"]'
      );

      if (interactiveEl && !isHoveringInteractive) {
        isHoveringInteractive = true;
        gsap.to(ring, {
          scale: 1.85,
          borderColor: 'rgba(168, 85, 247, 0.9)',
          backgroundColor: 'rgba(99, 32, 238, 0.16)',
          duration: 0.25,
          ease: 'back.out(1.5)',
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: '#FFFFFF',
          duration: 0.2,
        });
        gsap.to(glow, {
          opacity: 0.9,
          scale: 1.5,
          duration: 0.25,
        });
      } else if (!interactiveEl && isHoveringInteractive) {
        isHoveringInteractive = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#6320EE',
          duration: 0.2,
        });
        gsap.to(glow, {
          opacity: 0.45,
          scale: 1,
          duration: 0.3,
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Click shockwave pulse effect exactly at cursor position
      gsap.to([dot, ring], {
        scale: '-=0.3',
        duration: 0.12,
        ease: 'power2.out',
      });

      if (rippleContainer) {
        const pulse = document.createElement('div');
        pulse.className =
          'pointer-events-none fixed top-0 left-0 w-12 h-12 -mt-6 -ml-6 rounded-full border border-[#9B51E0] will-change-transform';
        rippleContainer.appendChild(pulse);

        gsap.set(pulse, {
          x: e.clientX,
          y: e.clientY,
          scale: 0.4,
          opacity: 1,
        });

        gsap.to(pulse, {
          scale: 2.8,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            pulse.remove();
          },
        });
      }
    };

    const onMouseUp = () => {
      gsap.to(ring, {
        scale: isHoveringInteractive ? 1.85 : 1,
        duration: 0.2,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(dot, {
        scale: isHoveringInteractive ? 0.5 : 1,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      gsap.to([dot, ring, glow], {
        opacity: 0,
        duration: 0.25,
      });
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      gsap.to(dot, { opacity: 1, duration: 0.2 });
      gsap.to(ring, { opacity: 1, duration: 0.2 });
      gsap.to(glow, { opacity: 0.45, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isPointerDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Container for click ripples and particle dust */}
      <div ref={rippleContainerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />

      {/* Dynamic ambient cursor glow torch */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-48 h-48 -mt-24 -ml-24 rounded-full bg-radial from-[#6320EE]/30 via-[#9B51E0]/15 to-transparent blur-2xl pointer-events-none will-change-transform"
      />

      {/* Smooth outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 -mt-5 -ml-5 rounded-full border border-white/40 pointer-events-none backdrop-blur-[1px] will-change-transform shadow-[0_0_15px_rgba(99,32,238,0.3)]"
      />

      {/* Core glowing dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -mt-[5px] -ml-[5px] rounded-full bg-[#6320EE] shadow-[0_0_10px_#A855F7] pointer-events-none will-change-transform"
      />
    </div>
  );
}
