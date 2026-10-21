import { Navbar } from '@/components/Navbar';
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
    <main className="min-h-screen text-white pt-28">
      <Navbar />

      {/* Services Hero Header */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            Capabilities
          </span>
          <span className="text-xs text-gray-300 font-medium">B2B Software & Design Disciplines</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Engineered for Longevity, Speed, and Conversion.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          We combine senior systems engineering discipline with cutting-edge visual craft to build digital flagships and custom application platforms tailored to your business roadmap.
        </p>
      </section>

      {/* Core Services Grid */}
      <Services />

      {/* Engineering Process Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            How We Partner
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Our 4-Stage Delivery Framework.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((p, idx) => (
            <div key={idx} className="webangles-card p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-2xl font-mono font-bold text-[#8059E3] mb-4 block">
                  {p.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">{p.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Milestones</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Capabilities */}
      <InnovationFeatures />

      <CtaSection />
      <Footer />
    </main>
  );
}
