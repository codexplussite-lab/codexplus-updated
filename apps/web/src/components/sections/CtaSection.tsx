'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AmbientOrb } from '@/components/AmbientOrb';
import { GsapSplitText, GsapParallax } from '@/components/motion/GsapAnimations';

export function CtaSection() {
  return (
    <section className="relative w-full py-36 md:py-48 text-center overflow-visible bg-transparent">
      {/* Seamless Ambient Orb Container with GSAP Parallax Float */}
      <GsapParallax
        speed={35}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] max-w-[95vw] pointer-events-none mix-blend-screen scale-100"
      >
        <AmbientOrb hue={270} rotationSpeed={0.35} />
      </GsapParallax>

      {/* Smooth diffused radial glow merging organically into background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] max-w-full bg-[#BEF264]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 mb-8 backdrop-blur-md">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#BEF264] text-[#030305] uppercase tracking-wider px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            Booking Calendar
          </span>
          <span className="text-xs font-medium text-gray-200">
            Accepting Selected Projects
          </span>
        </div>

        <GsapSplitText
          tag="h2"
          text="Ready to Elevate Your Digital Architecture?"
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
        />

        <p className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
          Partner directly with senior software engineers and design system specialists. Let&apos;s build an experience that converts and scales.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="lime-pill-btn w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:brightness-110 transition flex items-center justify-center gap-2 shadow-xl shadow-[#BEF264]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm text-gray-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition flex items-center justify-center backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
