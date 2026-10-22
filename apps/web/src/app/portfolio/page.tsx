import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/sections/PageHero';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'Selected Works & Architecture Studies — CodeXplus',
  description: 'Explore our selected engineering case studies, full-stack web platforms, and interactive digital experiences.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <PageHero
        badgeLabel="Selected Works"
        badgeTitle="Architecture Studies & Blueprints"
        titlePrimary="Proof of Craft Through"
        titleGradient="Real Architecture."
        description="From high-throughput platforms to conversion-engineered flagship storefronts, explore how we partner with ambitious teams to launch durable digital products."
      />

      {/* Primary Featured Projects Display */}
      <FeaturedProjects />

      {/* Case Study Engineering Principles */}
      <section className="py-20 px-6 max-w-7xl mx-auto ">
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
            <Zap className="w-8 h-8 text-[#8059E3] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Accessibility Built-In</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Keyboard navigation, semantic landmarks, and screen reader-friendly components designed to meet strict WCAG standards out of the box.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
