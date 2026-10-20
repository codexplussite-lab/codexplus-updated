import { Navbar } from '@/components/Navbar';
import { ContactForm } from '@/components/sections/ContactForm';
import { SupportSection } from '@/components/sections/SupportSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Contact Us — CodeXplus',
  description: 'Get in touch with the CodeXplus team. Start your next web project with us.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4F1AD6] pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            Start A Project
          </span>
          <span className="text-xs text-gray-300">Direct Engineering Access</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Let&apos;s Build Something Unforgettable.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Tell us about your challenges, vision, and timeline. We respond to all serious project inquiries within 24 hours.
        </p>
      </div>

      <ContactForm />
      <SupportSection />
      <Footer />
    </main>
  );
}
