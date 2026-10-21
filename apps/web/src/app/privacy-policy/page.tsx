import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — CodeXplus',
  description: 'CodeXplus privacy practices, data handling, and communication policies.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Homepage
        </Link>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-xs font-mono text-gray-400 mb-10">Last updated: October 2026</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
            <p>
              When you submit a project brief through our inquiry form, CodeXplus collects your name, email address, optional contact phone number, and project brief details solely for the purpose of communicating about potential business engagements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Data</h2>
            <p>
              We do not sell, rent, or distribute personal inquiry data to third parties. Information submitted via contact forms is utilized strictly to formulate architectural proposals and discuss engineering scope.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data Security & Storage</h2>
            <p>
              Our infrastructure employs hardened HTTPS encryption, strict database schema isolation, and industry-standard security safeguards to protect incoming transmissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Contact & Inquiries</h2>
            <p>
              For questions regarding privacy or data retention, contact our engineering team directly at contact@codexplus.site.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
