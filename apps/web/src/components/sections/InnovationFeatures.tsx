import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
  {
    icon: Zap,
    title: 'Seamless API Integrations',
    description: 'Connect custom Fastify backends and third-party platforms with extreme speed, low latency and strict Zod validation.',
    tag: 'Real-Time Data',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Authentication',
    description: 'Hardened Argon2id hashing, HTTPOnly cookie session rotation, and CSRF protection ensuring bank-grade application security.',
    tag: 'Security & Auth',
  },
  {
    icon: Layers,
    title: 'Optimized UX / UI Engineering',
    description: 'Pixel-perfect interfaces powered by Tailwind CSS, responsive typography and buttery smooth Framer Motion micro-interactions.',
    tag: 'Design Systems',
  },
  {
    icon: Cpu,
    title: 'Predictive & Scalable Cloud',
    description: 'Automated ISR caching, on-demand webhook revalidation and zero-downtime Nginx PM2 deployments on enterprise VPS.',
    tag: 'Cloud & Scale',
  },
];

export function InnovationFeatures() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Packed with Innovation.
          </h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          CodeXplus builds modern digital architectures with cutting-edge technologies designed to elevate your company above the noise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="webangles-card p-8 md:p-10 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#8059E3] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/5">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#8059E3] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.05] flex justify-between items-center">
                <span className="text-xs text-gray-500 font-mono">0{idx + 1} // ARCHITECTURE</span>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
