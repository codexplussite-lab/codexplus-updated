'use client';

import { ArrowUpRight, Code, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';
import { GsapSplitText, GsapParallax } from '@/components/motion/GsapAnimations';

export type ProjectKind = 'client' | 'demo' | 'concept';

export interface CaseStudyProject {
  id: string;
  title: string;
  clientOrContext: string;
  category: string;
  kind: ProjectKind;
  kindLabel: string;
  roleScope: string;
  summary: string;
  techStack: string[];
  destinationUrl: string;
  destinationLabel: string;
  isExternal: boolean;
}

export const PORTFOLIO_PROJECTS: CaseStudyProject[] = [
  {
    id: 'lemonide-tech',
    title: 'Lemonide Tech Enterprise Portal',
    clientOrContext: 'Template Reference & Architectural Demo',
    category: 'Full-Stack Web Application',
    kind: 'demo',
    kindLabel: 'Architecture Demo / Proof-of-Concept',
    roleScope: 'Architecture Blueprint, API Schema Modeling, Responsive UI',
    summary: 'An enterprise management dashboard architecture showcasing high-throughput data tables, strict Zod schema validation, and Fastify REST endpoint integration.',
    techStack: ['Next.js 15', 'Fastify 5', 'PostgreSQL', 'Zod'],
    destinationUrl: '/contact?subject=Lemonide+Demo+Brief',
    destinationLabel: 'Request Architecture Brief',
    isExternal: false,
  },
  {
    id: 'viper-studio',
    title: 'Viper Creative Experience Studio',
    clientOrContext: 'Template Reference & Motion Study',
    category: 'Interactive Web Experience',
    kind: 'demo',
    kindLabel: 'Interactive Motion Prototype',
    roleScope: 'Shader Engineering, Micro-Interaction Systems, Token Theming',
    summary: 'An exploration of fluid WebGL canvas shaders, hardware-accelerated scroll pacing, and token-based interaction states engineered with reduced-motion accessibility.',
    techStack: ['WebGL / OGL', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    destinationUrl: '/contact?subject=Viper+Studio+Brief',
    destinationLabel: 'Request Motion Study',
    isExternal: false,
  },
  {
    id: 'million-one',
    title: 'Million One Global Commerce',
    clientOrContext: 'Template Reference & Commerce Prototype',
    category: 'Headless E-Commerce System',
    kind: 'concept',
    kindLabel: 'Headless Commerce Concept',
    roleScope: 'Storefront UX, Edge Caching Strategy, Cart Flow Modeling',
    summary: 'A concept storefront demonstrating instant page transitions, multi-currency cart state, and decoupled catalog rendering with on-demand static revalidation.',
    techStack: ['Next.js App Router', 'Tailwind CSS', 'Redis', 'TypeScript'],
    destinationUrl: '/contact?subject=Million+One+Commerce+Brief',
    destinationLabel: 'Request Commerce Spec',
    isExternal: false,
  },
];

export function FeaturedProjects() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            Selected Work & Architecture Studies
          </span>
          <GsapSplitText
            tag="h2"
            text="Engineered Proof of Craft."
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          />
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
          >
            <span>Commission a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_PROJECTS.map((proj, idx) => (
          <StaggerItem
            key={proj.id}
            aria-label={`${proj.title} - ${proj.kindLabel}`}
            className="webangles-card rounded-2xl overflow-hidden group hover:border-[#8059E3]/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Thumbnail Representation with Code / Architecture Wireframe Preview */}
            <div className="h-64 bg-gradient-to-br from-[#120917] via-[#0E0E12] to-[#1a1129] border-b border-white/[0.06] p-6 relative flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[#6320EE]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10 gap-2">
                <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-white/[0.06] text-gray-300 border border-white/10">
                  {proj.category}
                </span>
                <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
              </div>

              {/* Graphic Wireframe & Monogram Preview */}
              <div className="py-2 relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white font-bold text-lg mb-2 shadow-inner group-hover:scale-105 transition-transform">
                  <Code className="w-5 h-5 text-[#8059E3]" />
                </div>
                <span className="text-base font-bold tracking-tight text-white group-hover:text-[#A855F7] transition-colors line-clamp-1">
                  {proj.title}
                </span>
                <span className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                  {proj.clientOrContext}
                </span>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {proj.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-gray-300 border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-7 flex flex-col justify-between flex-1">
              <div>
                {/* Genuine Classification Tag */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#6320EE]/15 text-[#9B72F4] border border-[#8059E3]/30">
                    <Sparkles className="w-3 h-3 text-[#9B72F4]" />
                    {proj.kindLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gray-100 transition">
                  {proj.title}
                </h3>

                {/* Scope & Role */}
                <div className="mb-3">
                  <span className="text-[11px] font-mono text-gray-400 block mb-0.5">Role & Scope:</span>
                  <p className="text-xs text-gray-300 font-medium leading-relaxed">
                    {proj.roleScope}
                  </p>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {proj.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">
                  Documented Spec
                </span>
                <Link
                  href={proj.destinationUrl}
                  aria-label={`${proj.destinationLabel} for ${proj.title}`}
                  className="text-xs font-semibold text-white group-hover:text-[#8059E3] transition inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded px-1"
                >
                  <span>{proj.destinationLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
