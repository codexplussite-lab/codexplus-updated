import { Navbar } from '@/components/Navbar';
import { TeamSection } from '@/components/sections/TeamSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Our Team — CodeXplus',
  description: 'Meet the engineers, designers, and craftsmen behind CodeXplus.',
};

export default function TeamPage() {
  return (
    <main className="min-h-screen text-white selection:bg-[#4F1AD6] pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            People
          </span>
          <span className="text-xs text-gray-300">Senior Craftsmen</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Direct Access to Principal Talent.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Every project is led and shipped by seasoned experts who take end-to-end ownership from architecture to launch.
        </p>
      </div>

      <TeamSection />
      <SupportSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
