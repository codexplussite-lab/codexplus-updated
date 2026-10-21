'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function NavigationProgressBar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first initial render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!barRef.current) return;

    // Reset and fire a sleek top glowing progress bar on route change
    const el = barRef.current;
    const tl = gsap.timeline();

    tl.set(el, { width: '0%', opacity: 1 })
      .to(el, { width: '70%', duration: 0.25, ease: 'power2.out' })
      .to(el, { width: '100%', duration: 0.2, ease: 'power3.inOut' })
      .to(el, { opacity: 0, duration: 0.25, ease: 'power2.in' });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-[#6320EE] via-[#9B51E0] to-[#E056FD] shadow-[0_0_12px_rgba(155,81,224,0.8)]"
      />
    </div>
  );
}
