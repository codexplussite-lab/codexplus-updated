import { Navbar } from '@/components/Navbar';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'Selected Works & Architecture Studies — CodeXplus',
  description: 'Explore our selected engineering case studies, full-stack web platforms, and interactive digital experiences.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen text-white pt-28">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            Selected Works
          </span>
          <span className="text-xs text-gray-300 font-medium">Architecture Studies & Blueprints</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Proof of Craft Through Real Architecture.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From high-throughput platforms to conversion-engineered flagship storefronts, explore how we partner with ambitious teams to launch durable digital products.
        </p>
      </section>

      {/* Primary Featured Projects Display */}
      <FeaturedProjects />

      {/* Case Study Engineering Principles */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="webangles-card p-8 rounded-2xl">
            <Zap className="w-8 h-8 text-[#8059E3] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Performance Standards</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every build is profiled against Core Web Vitals to minimize bundle payload weight, eliminate render blocking, and guarantee swift mobile interactivity.
            </p>
          </div>

          <div className="webangles-card p-8 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-[#8059E3] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Architectural Isolation</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Strict decoupling between React UI, Fastify API endpoints, and database layers ensures resilience and smooth future migrations.
            </p>
          </div>

          <div className="webangles-card p-8 rounded-2xl">
            <Layers className="w-8 h-8 text-[#8059E3] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Design System Longevity</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Centralized token architectures allow marketing and engineering teams to update UI components seamlessly with zero style drift.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
