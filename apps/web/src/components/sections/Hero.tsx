'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { GsapSplitText } from '@/components/motion/GsapAnimations';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20">
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
            Studio
          </span>
          <span className="text-xs font-medium text-gray-300 pr-1">
            Bespoke Web Systems & Architecture
          </span>
        </motion.div>

        {/* GSAP SplitText Kinetic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 font-sans">
          <GsapSplitText
            tag="span"
            text="Smart Web Experiences,"
            className="block font-normal text-gray-300 drop-shadow-sm text-3xl sm:text-5xl md:text-6xl mb-2"
            stagger={0.035}
            delay={0.15}
          />
          <GsapSplitText
            tag="span"
            text="Built From Every Angle"
            className="bg-gradient-to-r from-white via-gray-100 to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(99,32,238,0.35)]"
            stagger={0.035}
            delay={0.3}
          />
        </h1>

        {/* Clear B2B Value Proposition: Delayed Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10 font-normal"
        >
          CodeXplus builds modern digital architectures, headless CMS portals, and high-performance web applications using Next.js and Fastify — engineered for businesses that demand high conversion and zero downtime.
        </motion.p>

        {/* Action Pair: Primary CTA + Visually Secondary CTA with Delayed Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="#contact"
            className="purple-pill-btn group w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-white hover:brightness-110 transition flex items-center justify-center gap-2 shadow-xl shadow-[#6320EE]/30"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-gray-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.10] border border-white/15 transition flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>Explore Case Studies</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
