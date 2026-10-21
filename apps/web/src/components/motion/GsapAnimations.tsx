'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  delay?: number;
}

export function GsapSplitText({
  text,
  className = '',
  tag: Tag = 'h2',
  stagger = 0.03,
  delay = 0,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll('.gsap-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 35,
          rotateX: 40,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, delay]);

  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`overflow-hidden ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="gsap-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

interface GsapParallaxProps {
  children: ReactNode;
  speed?: number; // positive moves up, negative moves down
  className?: string;
}

export function GsapParallax({
  children,
  speed = 40,
  className = '',
}: GsapParallaxProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targetRef.current,
        { y: -speed },
        {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, targetRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
