import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { SupportSection } from '@/components/sections/SupportSection';
import { Footer } from '@/components/Footer';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Start a Project — CodeXplus',
  description: 'Inquire about bespoke web development, high-throughput APIs, and modern design systems with CodeXplus.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <PageHero
        badgeLabel="Initiate Contact"
        badgeTitle="Direct Engineering Partnership"
        titlePrimary="Let's Build Your Next"
        titleGradient="Digital Flagship."
        description="Share your project requirements, scope, or timeline goals. We review all technical briefs and respond with preliminary architecture notes within 24 hours."
      />

      {/* Direct Contact Channels Info Grid */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="webangles-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8059E3] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-gray-500 block">Direct Inquiry</span>
              <a href="mailto:contact@codexplus.site" className="text-sm font-semibold text-white hover:text-[#8059E3] transition">
                contact@codexplus.site
              </a>
            </div>
          </div>

          <div className="webangles-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8059E3] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-gray-500 block">Turnaround Time</span>
              <span className="text-sm font-semibold text-white">Within 24 Hours</span>
            </div>
          </div>

          <div className="webangles-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8059E3] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-gray-500 block">Studio Location</span>
              <span className="text-sm font-semibold text-white">Global / Remote First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Form */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <ContactForm />
      </section>

      <SupportSection />
      <Footer />
    </main>
  );
}
