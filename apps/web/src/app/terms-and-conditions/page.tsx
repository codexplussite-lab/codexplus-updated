import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service — CodeXplus',
  description: 'CodeXplus terms and conditions for client engagements and digital services.',
};

export default function TermsPage() {
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
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-xs font-mono text-gray-400 mb-10">Last updated: October 2026</p>

        <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Scope of Engagements</h2>
            <p>
              CodeXplus provides professional software engineering, web application architecture, and digital product design services. Individual project scopes, milestones, and deliverables are formally outlined in separate Master Services Agreements (MSA) or Statements of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Intellectual Property</h2>
            <p>
              Unless specified in a custom agreement, all bespoke software, custom code, and assets developed specifically for a client become client property upon full settlement of contracted project milestones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Code Warranties & Performance</h2>
            <p>
              CodeXplus engineers code adhering to modern web standards, strict TypeScript typing, and WCAG AA accessibility guidelines. Ongoing SLA guarantees and dedicated uptime monitoring are governed by post-launch retainer agreements.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
