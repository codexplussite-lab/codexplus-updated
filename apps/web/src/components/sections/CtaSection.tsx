import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AmbientOrb } from '@/components/AmbientOrb';

export function CtaSection() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06] text-center">
      <div className="relative p-12 md:p-24 rounded-3xl border border-white/[0.12] overflow-hidden bg-gradient-to-b from-[#0e071e]/90 via-[#07030e]/95 to-[#000000] backdrop-blur-xl">
        {/* Animated WebGL Energy Orb behind the headline matching screenshot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-90 mix-blend-screen scale-125">
          <AmbientOrb hue={270} rotationSpeed={0.5} />
        </div>

        {/* Ambient violet flare glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-[#4F1AD6]/30 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 mb-8 backdrop-blur-md">
            <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
              Active Booking
            </span>
            <span className="text-xs font-medium text-gray-200">
              Available for Q4 2026 Projects
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            AI Meets Design, <br className="hidden sm:inline" />
            <span className="text-gray-200 font-normal">Purpose Into Ideas!</span>
          </h2>

          <p className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10 drop-shadow-md">
            Transform your digital presence with high-converting websites and scalable cloud backends built with uncompromising craft.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="purple-pill-btn px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:brightness-110 transition flex items-center gap-2 shadow-2xl shadow-[#4F1AD6]/50"
            >
              Connect With Us <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="#services"
              className="px-8 py-3.5 rounded-full font-semibold text-sm text-gray-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 transition backdrop-blur-md"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
