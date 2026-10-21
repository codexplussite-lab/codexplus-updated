import { Navbar } from '@/components/Navbar';
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
    <main className="min-h-screen text-white pt-28">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            Initiate Contact
          </span>
          <span className="text-xs text-gray-300 font-medium">Direct Engineering Partnership</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Let&apos;s Build Your Next Digital Flagship.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Share your project requirements, scope, or timeline goals. We review all technical briefs and respond with preliminary architecture notes within 24 hours.
        </p>
      </section>

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
              <span className="text-[11px] font-mono uppercase text-gray-500 block">Response SLA</span>
              <span className="text-sm font-semibold text-white">
                Under 24 Hours
              </span>
            </div>
          </div>

          <div className="webangles-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8059E3] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-gray-500 block">Engagement</span>
              <span className="text-sm font-semibold text-white">
                Sprint or Fixed Scope
              </span>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <SupportSection />
      <Footer />
    </main>
  );
}
