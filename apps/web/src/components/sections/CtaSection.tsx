import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06] bg-black text-center">
      <div className="relative p-12 md:p-24 rounded-3xl bg-gradient-to-b from-[#100b17] via-[#0b0811] to-[#000000] border border-white/[0.08] overflow-hidden">
        {/* Webangles top radial purple glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4F1AD6]/20 blur-[110px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-8 backdrop-blur-md">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            Active Booking
          </span>
          <span className="text-xs font-medium text-gray-300">
            Available for Q4 2026 Projects
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
          AI Meets Design, <br className="hidden sm:inline" />
          <span className="text-gray-300 font-normal">Purpose Into Ideas!</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
          Transform your digital presence with high-converting websites and scalable cloud backends built with uncompromising craft.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="purple-pill-btn px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:brightness-110 transition flex items-center gap-2 shadow-2xl shadow-[#4F1AD6]/40"
          >
            Connect With Us <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="#services"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
