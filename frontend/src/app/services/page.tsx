import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/sections/PageHero';
import { Services } from '@/components/sections/Services';
import { InnovationFeatures } from '@/components/sections/InnovationFeatures';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Engineering & Design Services — CodeXplus',
  description: 'Explore our full spectrum of full-stack engineering, custom Fastify APIs, Next.js architecture, and design systems.',
};

const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Architecture & Discovery',
    desc: 'Deep technical blueprinting, data modeling with Zod and PostgreSQL, and API contract definition before writing code.',
  },
  {
    step: '02',
    name: 'Design System & Prototyping',
    desc: 'Building scalable token systems, accessible interaction patterns, and verified 60fps/120fps motion guidelines.',
  },
  {
    step: '03',
    name: 'Full-Stack Implementation',
    desc: 'TypeScript strict implementation across Next.js 15 App Router and Fastify with real-time test verification.',
  },
  {
    step: '04',
    name: 'Performance Audit & Edge Deploy',
    desc: 'Rigorous Core Web Vitals optimization, zero-downtime server deployments, and automated uptime monitoring.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <PageHero
        badgeLabel="Capabilities"
        badgeTitle="B2B Software & Design Disciplines"
        titlePrimary="Full-Stack Capabilities,"
        titleGradient="Built to Scale."
        description="We bridge high-performance backend engineering with fluid frontend interaction design. Every discipline is tailored to eliminate friction and accelerate your release velocity."
      />

      {/* Services Grid Section */}
      <Services />

      {/* Engineering Delivery Process Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto ">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
              Workflow
            </span>
            <span className="text-xs text-gray-300">Engineering Protocol</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            How We Partner & Ship
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            A disciplined, four-phase delivery framework developed to launch production systems on schedule without quality degradation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="webangles-card p-6 rounded-2xl border border-white/[0.06] hover:border-[#8059E3]/30 transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-[#8059E3]/40 group-hover:text-[#8059E3] transition block mb-4 font-mono">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-medium text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-[#8059E3]" />
                <span>Verified Milestones</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Innovation Section */}
      <InnovationFeatures />

      <CtaSection />
      <Footer />
    </main>
  );
}
