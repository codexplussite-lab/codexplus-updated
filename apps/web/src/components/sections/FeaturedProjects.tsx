import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const PORTFOLIO_PROJECTS = [
  {
    title: 'Lemonide Tech Portal',
    client: 'Lemonide Tech',
    category: 'Full-Stack Platform',
    summary: 'A precision-engineered platform designed for high-scale enterprise operations.',
  },
  {
    title: 'Viper Creative Studio',
    client: 'Viper Studio',
    category: 'Interactive Portfolio',
    summary: 'Award-winning digital experience featuring WebGL interactive motion and typography.',
  },
  {
    title: 'Million One Digital',
    client: 'Million One',
    category: 'E-Commerce System',
    summary: 'Next-gen storefront with frictionless checkout and multi-currency global billing.',
  },
];

export function FeaturedProjects() {
  return (
    <section id="portfolio" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Showcasing Your Best Work with Pure Precision.
          </h2>
        </div>
        <Link
          href="#contact"
          className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-2 transition"
        >
          View all work <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_PROJECTS.map((proj, idx) => (
          <div
            key={idx}
            className="webangles-card rounded-2xl overflow-hidden group hover:border-[#8059E3]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="h-64 bg-gradient-to-br from-[#120912] via-[#0E0E0E] to-[#1a1426] border-b border-white/[0.06] flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#4F1AD6]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
              <span className="text-2xl font-bold tracking-tight text-gray-400 group-hover:text-white transition-colors relative z-10">
                {proj.client}
              </span>
            </div>

            <div className="p-8">
              <div className="text-xs font-mono text-[#8059E3] mb-2">{proj.category}</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition">
                {proj.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{proj.summary}</p>
              <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#8059E3] transition">
                Case Study <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
