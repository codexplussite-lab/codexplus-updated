import { Navbar } from '@/components/Navbar';
import { AboutStats } from '@/components/sections/AboutStats';
import { SupportSection } from '@/components/sections/SupportSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'About Us — CodeXplus',
  description: 'Learn about CodeXplus, our philosophy, craftsmanship and approach to digital products.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4F1AD6] pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            Story
          </span>
          <span className="text-xs text-gray-300">About Our Studio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Where Imagination Meets Engineering.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          We combine full-stack engineering discipline with high-end aesthetic design to deliver remarkable digital experiences.
        </p>
      </div>

      <AboutStats />
      <SupportSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
