'use client';

import { ArrowUpRight, CheckCircle2, Users, Target } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';
import { GsapSplitText } from '@/components/motion/GsapAnimations';

export interface ServiceDetail {
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  suitableClients: string;
  typicalUseCases: string[];
}

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    number: '01',
    category: 'Full-Stack Application Development',
    title: 'Custom Web Apps & Resilient Backends',
    tagline: 'High-throughput system architecture with strict end-to-end type safety.',
    description: 'We architect and build tailored web applications using Next.js 15 App Router and Fastify Node runtimes. Paired with normalized PostgreSQL databases via Drizzle ORM and Redis caching, each system is crafted for high throughput, maintainability, and clean technical boundaries without framework bloat.',
    deliverables: [
      'Production Next.js 15 frontend architecture',
      'Fastify 5 REST API microservice or monolith',
      'Drizzle ORM schema modeling with automated migrations',
      'Zod request/response validation contracts',
      'Role-based authentication & session management',
    ],
    suitableClients: 'B2B SaaS startups, expanding digital agencies, and enterprise teams replacing legacy monolithic tools.',
    typicalUseCases: [
      'Customer portals and high-traffic multi-tenant SaaS dashboards',
      'Internal operations workflows and order dispatch systems',
      'Data-intensive platforms with real-time state synchronization',
    ],
  },
  {
    number: '02',
    category: 'Website Design & Front-End Engineering',
    title: 'Digital Flagships & Design Systems',
    tagline: 'Conversion-engineered web experiences with architectural Obsidian craft.',
    description: 'We translate brand positioning into responsive digital storefronts and marketing sites. By establishing token-based design systems (colors, spacing, typography scales) and pairing them with hardware-accelerated micro-interactions and accessible semantic structures, we ensure your brand leaves an enduring impression across all viewports.',
    deliverables: [
      'Design token architecture (Tailwind CSS + CSS custom properties)',
      'WCAG 2.2 AA compliant component hierarchy and contrast',
      'Hardware-accelerated micro-interactions with reduced-motion support',
      'Responsive multi-breakpoint layout across mobile, tablet, and ultra-wide',
      'SEO metadata architecture and OpenGraph asset templates',
    ],
    suitableClients: 'Funded tech companies, creative studios, and professional service firms seeking digital flagships that convert visitors.',
    typicalUseCases: [
      'High-converting product launch sites and company rebrands',
      'Multi-page agency showcases with interactive media and case studies',
      'Marketing campaign hubs engineered for high visitor engagement',
    ],
  },
  {
    number: '03',
    category: 'Headless CMS Architecture',
    title: 'Headless CMS & Bespoke Admin Panels',
    tagline: 'Empower marketing teams while preserving total data ownership.',
    description: 'We replace costly, fragmented third-party CMS subscriptions with clean headless content architectures or bespoke single-tenant admin panels. Your editors get intuitive Markdown/block drafting and instantaneous static revalidation, while your engineering team maintains complete control over database schemas and content pipelines.',
    deliverables: [
      'Single-tenant administrative panel tailored to your exact schemas',
      'Automated On-Demand Incremental Static Regeneration (ISR)',
      'Granular role-based editorial workflows (Admin vs Editor roles)',
      'Self-hosted media asset management and image optimization pipeline',
      'Structured content modeling with versioned revision logs',
    ],
    suitableClients: 'Content-driven marketing teams, editorial publications, and brands seeking zero vendor lock-in with total data autonomy.',
    typicalUseCases: [
      'Replacing recurring third-party CMS fees with self-hosted control',
      'Multi-author editorial blogs, journals, and knowledge hubs',
      'Dynamic product catalogs and portfolio management with instant updates',
    ],
  },
  {
    number: '04',
    category: 'Performance Auditing & Modernization',
    title: 'Core Web Vitals & Performance Auditing',
    tagline: 'Systematic diagnostics and optimization to eliminate real-world latency.',
    description: 'We perform deep-dive profiling across network waterfalls, JavaScript bundle execution, and rendering pipelines. Rather than making speculative guarantees, we apply deterministic engineering practices—tree-shaking client dependencies, optimizing font loading, tuning server response times, and isolating layout shifts—to measurably boost UX and search engine crawlability.',
    deliverables: [
      'Comprehensive Core Web Vitals diagnostic audit report (LCP, INP, CLS)',
      'JavaScript client bundle footprint analysis and code-splitting audit',
      'Image asset compression and responsive picture element pipelines',
      'Font delivery and critical CSS render-blocking remediation',
      'Cache-Control header optimization and CDN edge routing tuning',
    ],
    suitableClients: 'E-commerce storefronts experiencing drop-offs, media publishers with poor search rankings, and web apps facing sluggish interactivity.',
    typicalUseCases: [
      'Remediating poor Core Web Vitals scores flagged in Google Search Console',
      'Accelerating mobile checkout funnels and high-bounce landing pages',
      'Migrating legacy heavyweight frameworks to lean modern Jamstack stacks',
    ],
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <FadeIn className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
          Disciplines & Services
        </span>
        <GsapSplitText
          tag="h2"
          text="Software & Design Services Built to Convert."
          className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
        />
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          From full-stack web applications to conversion-focused digital flagships, each discipline is engineered for durability, speed, and real business outcomes without framework bloat.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES_CATALOG.map((s) => (
          <StaggerItem
            key={s.number}
            className="webangles-card p-8 md:p-10 rounded-2xl flex flex-col justify-between group hover:border-[#8059E3]/50 transition-all duration-300"
          >
            <div>
              {/* Header with Discipline Category & Number */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#8059E3] block mb-1">
                    {s.category}
                  </span>
                  <span className="text-2xl md:text-3xl font-mono font-bold text-gray-500 group-hover:text-white transition-colors">
                    {s.number}
                  </span>
                </div>
                <Link
                  href="/contact"
                  aria-label={`Inquire about ${s.title}`}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 group-hover:bg-[#6320EE] group-hover:text-white transition-all shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs font-mono text-[#9B72F4] mb-4">
                {s.tagline}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {s.description}
              </p>

              {/* Deliverables */}
              <div className="mb-6 pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
                  Scope & Key Deliverables
                </h4>
                <ul className="space-y-2" aria-label={`Deliverables for ${s.title}`}>
                  {s.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8059E3] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suitable Clients & Use Cases */}
              <div className="mb-6 space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <div className="flex items-start gap-2 text-xs">
                  <Users className="w-4 h-4 text-[#8059E3] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-300">Best for: </span>
                    <span className="text-gray-400">{s.suitableClients}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <Target className="w-4 h-4 text-[#8059E3] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-300">Typical use cases: </span>
                    <span className="text-gray-400">{s.typicalUseCases.join(' • ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">Sprint or Fixed-Milestone Delivery</span>
              <Link
                href="/contact"
                className="text-xs font-semibold text-[#8059E3] hover:text-white transition inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded px-1"
              >
                <span>Discuss Scope</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
