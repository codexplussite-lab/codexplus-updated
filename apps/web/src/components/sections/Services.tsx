import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  {
    number: '01',
    title: 'AI-Powered Development & Full-Stack Apps',
    description: 'Bespoke web applications built on Next.js 15 and Fastify with high-throughput PostgreSQL databases and real-time APIs.',
  },
  {
    number: '02',
    title: 'Modern Website Design & Rebranding',
    description: 'Transforming legacy websites into modern, high-converting digital storefronts with immersive motion and branding guidelines.',
  },
  {
    number: '03',
    title: 'Headless CMS Architecture & Dashboards',
    description: 'Custom React admin control panels replacing complex third-party tools, giving teams total content ownership.',
  },
  {
    number: '04',
    title: 'Performance & Core Web Vitals Auditing',
    description: 'Sub-second page speeds, edge caching, image optimization pipelines, and 95+ Google Lighthouse scores guaranteed.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06] bg-black">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">Services</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Future-Driven Digital Services.
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Our cutting-edge solutions are designed to transform businesses, enhance operational efficiency, and drive exponential growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((s, idx) => (
          <div
            key={idx}
            className="webangles-card p-8 md:p-10 rounded-2xl flex flex-col justify-between group hover:border-[#8059E3]/40 transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-mono font-bold text-gray-500 group-hover:text-[#8059E3] transition-colors">
                  {s.number}
                </span>
                <Link
                  href="#contact"
                  className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-gray-400 group-hover:bg-[#4F1AD6] group-hover:text-white transition-all shadow"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
            </div>

            <div className="pt-6 mt-8 border-t border-white/[0.05] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8059E3]" />
              <span className="text-xs text-gray-400">Engineered by Senior Craftsmen</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
