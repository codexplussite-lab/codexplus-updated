import { Navbar } from '@/components/Navbar';
import { Services } from '@/components/sections/Services';
import { InnovationFeatures } from '@/components/sections/InnovationFeatures';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Services — CodeXplus',
  description: 'Explore our full spectrum of digital design, AI development, and cloud services.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen text-white selection:bg-[#4F1AD6] pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            Capabilities
          </span>
          <span className="text-xs text-gray-300">Engineering Disciplines</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Services Engineered for Impact.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Four tightly-integrated disciplines. Zero hand-offs. Strategy through shipping.
        </p>
      </div>

      <Services />
      <InnovationFeatures />
      <CtaSection />
      <Footer />
    </main>
  );
}
