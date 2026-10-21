import { Navbar } from '@/components/Navbar';
import { AboutStats } from '@/components/sections/AboutStats';
import { TeamSection } from '@/components/sections/TeamSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';
import { Code2, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

export const metadata = {
  title: 'About Our Studio — CodeXplus',
  description: 'CodeXplus is an independent digital engineering and design studio specializing in modern web systems.',
};

const PILLARS = [
  {
    icon: Terminal,
    title: 'Senior-Only Execution',
    desc: 'We eliminated account managers and junior handoffs. Every sprint is planned, coded, and reviewed directly by senior practitioners.',
  },
  {
    icon: Code2,
    title: 'Zero Tech Debt Philosophy',
    desc: 'Strict type validation from database to React UI. No sloppy any types, no fragile third-party black boxes.',
  },
  {
    icon: Sparkles,
    title: 'Aesthetic Meets Performance',
    desc: 'Visual depth without performance penalties. Living WebGL shaders and micro-interactions optimized for 60fps/120fps.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white pt-28">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            Studio Story
          </span>
          <span className="text-xs text-gray-300 font-medium">Engineering & Design Studio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Architects of the Modern Web.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          CodeXplus was founded on a simple premise: ambitious digital companies deserve web platforms engineered with the precision of high-scale enterprise software and the artistry of award-winning design studios.
        </p>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div key={idx} className="webangles-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8059E3] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{pil.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{pil.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AboutStats />
      <TeamSection />
      <SupportSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
