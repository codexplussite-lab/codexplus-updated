import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/sections/PageHero';
import { AboutStats } from '@/components/sections/AboutStats';
import { TeamSection } from '@/components/sections/TeamSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';
import { Code2, Sparkles, Terminal } from 'lucide-react';

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
    <main className="min-h-screen text-white">
      <Navbar />

      <PageHero
        badgeLabel="Studio Story"
        badgeTitle="Engineering & Design Studio"
        titlePrimary="Architects of the"
        titleGradient="Modern Web."
        description="CodeXplus was founded on a simple premise: ambitious digital companies deserve web platforms engineered with the precision of high-scale enterprise software and the artistry of award-winning design studios."
      />

      {/* Philosophy Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="webangles-card p-8 rounded-2xl border border-white/[0.08] hover:border-[#8059E3]/40 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#6320EE]/10 border border-[#8059E3]/20 flex items-center justify-center text-[#8059E3] mb-6 group-hover:scale-110 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
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
