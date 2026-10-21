'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Velaris } from '@/components/Velaris';

export function Hero() {
  return (
    <Velaris
      bg="#000000"
      colors={["#A855F7", "#6366F1", "#4F1AD6", "#000000"]}
      speed={2.2}
      grain={0.25}
      height="auto"
      className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto flex flex-col items-center z-10"
      >
        {/* Webangles Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md mb-8">
          <span className="purple-badge px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider">
            2026
          </span>
          <span className="text-xs font-medium text-gray-200 pr-1">
            Next-Gen Digital Studio
          </span>
        </div>

        {/* Dual Heading exactly matching Webangles typography style */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-gray-200 mb-2 font-sans drop-shadow-md">
          Smart Web Experiences
        </h2>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-8 font-sans drop-shadow-[0_10px_35px_rgba(79,26,214,0.4)]">
          Built From Every Angle
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-10 font-normal drop-shadow-sm">
          CodeXplus is a modern web studio crafting high-performing websites and full-stack digital products using Next.js, Fastify, and custom architecture — designed to convert and scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#contact"
            className="purple-pill-btn px-7 py-3 rounded-full text-sm font-semibold text-white hover:brightness-110 transition-all flex items-center gap-2 shadow-xl shadow-[#4F1AD6]/30 backdrop-blur-sm"
          >
            Connect With Us <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="px-7 py-3 rounded-full text-sm font-semibold text-gray-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 transition-all backdrop-blur-sm"
          >
            About CodeXplus
          </Link>
        </div>
      </motion.div>
    </Velaris>
  );
}
