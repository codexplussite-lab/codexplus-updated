import { Navbar } from '@/components/Navbar';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Portfolio & Selected Works — CodeXplus',
  description: 'Browse our selected client works, case studies, and engineering achievements.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4F1AD6] pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            Work
          </span>
          <span className="text-xs text-gray-300">Selected Case Studies</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Showcasing Our Best Work.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From enterprise dashboards to consumer digital products, explore how we partner with ambitious teams to deliver craft at scale.
        </p>
      </div>

      <FeaturedProjects />
      <CtaSection />
      <Footer />
    </main>
  );
}
