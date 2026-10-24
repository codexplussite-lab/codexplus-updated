'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export interface ServiceItem {
  id?: string;
  number?: string;
  title: string;
  slug?: string;
  description: string;
  bullets?: string[];
  ctaText?: string;
  ctaHref?: string;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Next.js 15 Platform Engineering',
    description: 'High-throughput web applications with sub-second page loads, RSC streaming, and modern edge deployment.',
    bullets: ['App Router Architecture', 'Server Actions & Streaming', 'Core Web Vitals Optimization', 'Design Token Integration'],
  },
  {
    number: '02',
    title: 'Custom Fastify 5 Backend & APIs',
    description: 'Bespoke microservices, strict Zod validation, and high-concurrency Node.js endpoints with low latency.',
    bullets: ['Drizzle & PostgreSQL ORM', 'Session & Role Auth', 'Zero-Downtime CI/CD', 'OpenAPI Documentation'],
  },
  {
    number: '03',
    title: 'Design Systems & 120fps Interaction',
    description: 'Living component libraries, accessible Tailwind tokens, and buttery GSAP & WebGL interactions.',
    bullets: ['Tailwind Design Tokens', 'GSAP & WebGL Shaders', 'WCAG AA Accessibility', 'Figma to Code Pipeline'],
  },
];

export function Services() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch('/api/backend/public/services')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          setServicesList(data.items);
        } else {
          setServicesList(FALLBACK_SERVICES);
        }
      })
      .catch(() => setServicesList(FALLBACK_SERVICES));
  }, []);

  const items = servicesList.length > 0 ? servicesList : FALLBACK_SERVICES;

  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            Core Disciplines
          </span>
          <h2 id="services-heading" className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            High-Performance Web Engineering.
          </h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          From micro-optimized Fastify APIs to fluid Next.js 15 architectures. Every build follows strict TypeScript safety and zero unnecessary bundle overhead.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((srv, idx) => (
          <StaggerItem
            key={srv.id || idx}
            className="webangles-card p-8 rounded-2xl flex flex-col justify-between group hover:border-[#8059E3]/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold text-[#8059E3] tracking-widest">
                  {srv.number || `0${idx + 1}`}
                </span>
                <Sparkles className="w-4 h-4 text-gray-500 group-hover:text-[#8059E3] transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A855F7] transition-colors">
                {srv.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {srv.description}
              </p>

              {srv.bullets && srv.bullets.length > 0 && (
                <ul className="space-y-2 mb-8 border-t border-white/[0.06] pt-4">
                  {srv.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8059E3]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-gray-500 font-mono">Senior-Led Delivery</span>
              <Link
                href="/services"
                className="text-xs font-semibold text-[#8059E3] group-hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
