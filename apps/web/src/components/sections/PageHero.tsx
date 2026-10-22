'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { GsapSplitText } from '@/components/motion/GsapAnimations';

interface PageHeroProps {
  badgeLabel: string;
  badgeTitle: string;
  titlePrimary: string;
  titleGradient: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({
  badgeLabel,
  badgeTitle,
  titlePrimary,
  titleGradient,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto flex flex-col items-center relative z-10"
      >
        {/* Category Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="purple-badge px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            {badgeLabel}
          </span>
          <span className="text-xs font-medium text-gray-300 pr-1">
            {badgeTitle}
          </span>
        </motion.div>

        {/* GSAP SplitText Kinetic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 font-sans">
          <GsapSplitText
            tag="span"
            text={titlePrimary}
            className="block font-normal text-gray-300 drop-shadow-sm text-3xl sm:text-5xl md:text-6xl mb-2"
            stagger={0.035}
            delay={0.15}
          />
          <GsapSplitText
            tag="span"
            text={titleGradient}
            className="bg-gradient-to-r from-white via-gray-100 to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(99,32,238,0.35)]"
            stagger={0.035}
            delay={0.3}
          />
        </h1>

        {/* Description: Delayed Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-8 font-normal"
        >
          {description}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
