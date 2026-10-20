import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Journal & Insights — CodeXplus',
  description: 'Articles, architectural field notes, and insights on modern web development.',
};

const ARTICLES = [
  {
    category: 'Design Systems',
    date: 'Jun 18, 2026',
    readMinutes: '8 min',
    title: 'Why Design Systems Fail After Year One',
    excerpt: "Most design systems die quietly. Here's the organizational wiring — not just the tokens — that keeps them alive.",
    slug: 'why-design-systems-fail-after-year-one',
  },
  {
    category: 'Engineering',
    date: 'May 02, 2026',
    readMinutes: '12 min',
    title: 'The Next.js Performance Checklist We Ship To Every Client',
    excerpt: 'Image pipelines, edge caching, font strategy and the 190ms storefront recipe we apply before launch day.',
    slug: 'the-next-js-performance-checklist-we-ship-to-every-client',
  },
  {
    category: 'Motion & UX',
    date: 'Mar 21, 2026',
    readMinutes: '6 min',
    title: 'Micro-Motion: The 12 Principles of Interfaces That Feel Alive',
    excerpt: 'A tiny easing curve is worth a thousand hero videos. Notes from our design systems on making UI breathe.',
    slug: 'micro-motion-the-12-principles-of-interfaces-that-feel-alive',
  },
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#4F1AD6] pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
            Journal
          </span>
          <span className="text-xs text-gray-300">Insights & Field Notes</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Thoughts on Craft & Code.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Deep-dives into scalable architecture, web performance, micro-interactions and digital craft.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-28">
        <div className="space-y-6">
          {ARTICLES.map((article, idx) => (
            <div
              key={idx}
              className="webangles-card p-8 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-[#8059E3]/40 transition-all duration-300"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-3">
                  <span className="text-[#8059E3]">{article.category}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readMinutes} read</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#8059E3] transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#4F1AD6] group-hover:text-white transition-all shrink-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CtaSection />
      <Footer />
    </main>
  );
}
