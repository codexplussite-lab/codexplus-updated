import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Engineering Journal & Technical Insights — CodeXplus',
  description: 'Articles, field notes, and architecture breakdowns on Next.js 15, Fastify, and design systems.',
};

const ARTICLES = [
  {
    category: 'Design Systems',
    date: 'Jun 18, 2026',
    readMinutes: '8 min read',
    title: 'Why Design Systems Fail After Year One — And How to Prevent It',
    excerpt: 'Most component libraries die quietly from token drift and undocumented exceptions. Here is the architectural wiring that keeps enterprise design systems maintainable.',
    tags: ['Design Tokens', 'Tailwind', 'Accessibility'],
  },
  {
    category: 'Full-Stack Performance',
    date: 'May 02, 2026',
    readMinutes: '12 min read',
    title: 'The Next.js 15 Performance Architecture Checklist',
    excerpt: 'Font preloading strategies, edge cache revalidation pipelines, and strict bundle elimination: the exact blueprint we ship across high-throughput client builds.',
    tags: ['Next.js 15', 'App Router', 'Core Web Vitals'],
  },
  {
    category: 'Interaction Engineering',
    date: 'Mar 21, 2026',
    readMinutes: '6 min read',
    title: 'Fluid Micro-Interactions: Making Web Interfaces Feel Alive at 120fps',
    excerpt: 'Balancing GPU-accelerated WebGL shaders and cubic-bezier easing curves with strict prefers-reduced-motion accessibility rules.',
    tags: ['WebGL', 'Framer Motion', 'WCAG AA'],
  },
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen text-white pt-28">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
          <span className="purple-badge px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            Technical Journal
          </span>
          <span className="text-xs text-gray-300 font-medium">Field Notes & Architecture</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Thoughts on Engineering & Digital Craft.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Deep-dives into scalable web architecture, type safety, design systems, and modern digital performance.
        </p>
      </section>

      {/* Article Cards Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-6">
          {ARTICLES.map((article, idx) => (
            <article
              key={idx}
              className="webangles-card p-8 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-[#8059E3]/50 transition-all duration-300"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-mono mb-3">
                  <span className="text-[#8059E3] font-semibold">{article.category}</span>
                  <span aria-hidden="true">•</span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {article.readMinutes}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#A855F7] transition-colors mb-3">
                  {article.title}
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 border border-white/[0.06]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                aria-label={`Read article: ${article.title}`}
                className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#6320EE] group-hover:text-white transition-all shrink-0 shadow"
              >
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
