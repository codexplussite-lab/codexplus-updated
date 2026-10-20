import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ClientMarquee } from '@/components/sections/ClientMarquee';
import { InnovationFeatures } from '@/components/sections/InnovationFeatures';
import { Services } from '@/components/sections/Services';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { SupportSection } from '@/components/sections/SupportSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4F1AD6]">
      <Navbar />
      <Hero />
      <ClientMarquee />
      <InnovationFeatures />
      <Services />
      <FeaturedProjects />
      <SupportSection />
      <CtaSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
