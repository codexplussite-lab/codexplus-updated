'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Velaris } from '@/components/Velaris';
import { GsapSplitText } from '@/components/motion/GsapAnimations';
import { Magnetic } from '@/components/motion/Magnetic';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background WebGL Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Velaris
          bg="#030305"
          colors={["#7535F8", "#4F1AD6", "#2D1065", "#030305"]}
          speed={1.8}
          grain={0.2}
          height="100%"
          className="h-full w-full opacity-80"
        />
      </div>

      {/* Radial soft purple glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#6320EE]/20 blur-[130px] rounded-full pointer-events-none" />

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
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#BEF264]/30 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(190,242,100,0.15)]"
        >
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#BEF264] text-[#030305] uppercase tracking-wider">
            SYSTEMS // STUDIO
          </span>
          <span className="text-xs font-mono font-medium text-gray-300 pr-1">
            Bespoke Web Architecture & Engineering
          </span>
        </motion.div>

        {/* GSAP SplitText Kinetic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 font-sans">
          <GsapSplitText
            tag="span"
            text="Smart Web Experiences,"
            className="block font-light text-gray-300 drop-shadow-sm text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-2"
            stagger={0.035}
            delay={0.15}
          />
          <GsapSplitText
            tag="span"
            text="Engineered From Every Angle."
            className="bg-gradient-to-r from-white via-gray-100 to-[#BEF264] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(190,242,100,0.25)]"
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
          CodeXplus builds modern digital architectures, headless CMS portals, and high-throughput web applications using Next.js 15 and Fastify — engineered for businesses that demand high conversion and zero downtime.
        </motion.p>

        {/* Action Pair: Primary CTA with Magnetic feel + Visually Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Magnetic strength={0.3}>
            <Link
              href="#contact"
              className="lime-pill-btn group w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#BEF264]/20"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
          <Link
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-gray-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.10] border border-white/15 transition flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>Explore Case Studies</span>
          </Link>
        </motion.div>

        {/* Subtle Tasteful Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2 text-[11px] font-mono tracking-widest text-gray-400 uppercase"
        >
          <span>Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#BEF264]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
