'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/sections/PageHero';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { CtaSection } from '@/components/sections/CtaSection';
import { Footer } from '@/components/Footer';

interface ArticleItem {
  id?: string;
  category: string;
  date?: string;
  publishedAt?: string;
  readMinutes?: string | number;
  title: string;
  excerpt: string;
  tags?: string[];
  slug?: string;
}

const FALLBACK_ARTICLES: ArticleItem[] = [
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
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    fetch('/api/backend/public/posts', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          setArticles(
            data.items.map((post: any) => ({
              id: post.id,
              category: post.category || 'Architecture',
              date: post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : '2026',
              readMinutes: post.readMinutes ? `${post.readMinutes} min read` : '5 min read',
              title: post.title,
              excerpt: post.excerpt || '',
              slug: post.slug,
              tags: ['Next.js 15', 'Fastify', 'Architecture'],
            }))
          );
        } else {
          setArticles(FALLBACK_ARTICLES);
        }
      })
      .catch(() => setArticles(FALLBACK_ARTICLES));
  }, []);

  const displayArticles = articles.length > 0 ? articles : FALLBACK_ARTICLES;

  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <PageHero
        badgeLabel="Technical Journal"
        badgeTitle="Field Notes & Architecture"
        titlePrimary="Engineering Notes &"
        titleGradient="Technical Breakdowns."
        description="Deep dives into production web architecture, performance engineering, modern design systems, and resilient full-stack systems."
      />

      {/* Featured Editorial Post */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="webangles-card p-8 md:p-12 rounded-3xl border border-white/[0.08] relative overflow-hidden group">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
            <span className="purple-badge px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase">
              Featured Breakdown
            </span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8059E3]" />
              <span>15 min read</span>
            </div>
            <span>•</span>
            <span>Published June 2026</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 group-hover:text-[#A855F7] transition">
            Replacing Headless Sanity with an In-House Fastify 5 & PostgreSQL Engine
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
            A comprehensive architectural post-mortem explaining why we migrated from off-the-shelf third party SaaS CMS solutions to an owned, type-safe Fastify and PostgreSQL infrastructure running under 15ms TTFB.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 ">
            <div className="flex flex-wrap gap-2">
              {['Fastify', 'PostgreSQL', 'Drizzle ORM', 'Next.js 15'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8059E3] group-hover:text-white transition">
              <span>Read Architecture Brief</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </section>

      {/* Articles Feed */}
      <section className="max-w-6xl mx-auto px-6 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayArticles.map((article, idx) => (
            <article
              key={article.id || article.title || idx}
              className="webangles-card p-6 md:p-8 rounded-2xl border border-white/[0.06] hover:border-[#8059E3]/40 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span className="text-[#8059E3] font-semibold">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readMinutes}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#A855F7] transition leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">{article.date}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
