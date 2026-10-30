import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/sections/PageHero';
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
    <main className="min-h-screen text-white selection:bg-[#4F1AD6]">
      <Navbar />

      <PageHero
        badgeLabel="People"
        badgeTitle="Senior Craftsmen"
        titlePrimary="Direct Access to"
        titleGradient="Principal Talent."
        description="Every project is led and shipped by seasoned experts who take end-to-end ownership from architecture to launch."
      />

      <TeamSection />
      <SupportSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
