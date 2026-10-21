import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const CAPABILITIES = [
  {
    icon: Zap,
    title: 'High-Throughput API Architecture',
    description: 'Custom Fastify backends engineered with Zod runtime validation, structured logging, and microsecond response times.',
    category: 'Backend Systems',
  },
  {
    icon: ShieldCheck,
    title: 'Hardened Session & Access Security',
    description: 'Argon2id credential hashing, HTTPOnly cookie session rotation, and automated CSRF protection designed for mission-critical portals.',
    category: 'Security & Auth',
  },
  {
    icon: Layers,
    title: 'Design Systems & Responsive UX',
    description: 'Design systems with scalable token hierarchies, WCAG 2.2 AA accessibility compliance, and buttery 120fps interactions.',
    category: 'Frontend Craft',
  },
  {
    icon: Cpu,
    title: 'Modern Cloud & Edge Delivery',
    description: 'Next.js 15 App Router static generation, incremental revalidation (ISR), and automated zero-downtime deployment pipelines.',
    category: 'Cloud Infrastructure',
  },
];

export function InnovationFeatures() {
  return (
    <section id="capabilities" className="py-24 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Engineered for Precision & Scale.
          </h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          We build end-to-end full-stack architectures that eliminate performance bottlenecks and protect business-critical workloads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAPABILITIES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="webangles-card p-8 md:p-10 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8059E3] group-hover:scale-105 group-hover:border-[#8059E3]/40 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#8059E3] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex justify-between items-center text-xs text-gray-500 font-mono">
                <span>0{idx + 1} // ARCHITECTURE</span>
                <span className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-1">
                  Read spec <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
