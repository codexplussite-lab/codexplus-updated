'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export interface ProjectItem {
  id?: string;
  title: string;
  slug?: string;
  category: string;
  summary: string;
  year?: string;
  client?: string;
  tags?: string[];
  imageUrl?: string;
  url?: string;
}

const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    title: 'Lemonide Tech Enterprise Portal',
    category: 'Enterprise Platform',
    summary: 'A high-throughput enterprise portal engineered for zero downtime and ultra-responsive real-time data sync.',
    year: '2026',
    client: 'Lemonide Enterprise',
    tags: ['Next.js 15', 'Fastify 5', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    title: 'Viper Creative Experience Studio',
    category: 'Creative Studio',
    summary: 'Award-winning interactive brand presence with GPU-accelerated living background shaders and buttery micro-interactions.',
    year: '2026',
    client: 'Viper Studio',
    tags: ['Next.js 15', 'GSAP', 'WebGL / OGL', 'Framer Motion'],
  },
];

export function FeaturedProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>(FALLBACK_PROJECTS);
  useEffect(() => {
    fetch('http://localhost:5000/api/public/projects')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.items && data.items.length > 0) {
          setProjects(data.items);
        }
      })
      .catch(() => null);
  }, []);

  const items = projects;

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            Selected Works
          </span>
          <h2 id="portfolio-heading" className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Proof of Craft Through Architecture.
          </h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          Explore digital platforms, high-throughput backend integrations, and conversion-engineered web experiences.
        </p>
      </FadeIn>

      <StaggerContainer key={projects.length > 0 ? "live" : "fallback"} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((project, idx) => {
          const cover = project.imageUrl || project.url;

          return (
            <StaggerItem
              key={project.id || idx}
              className="webangles-card rounded-3xl overflow-hidden group hover:border-[#8059E3]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-64 bg-gradient-to-br from-[#120917] via-[#0E0E12] to-[#1a1129] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#6320EE]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />

                  {cover ? (
                    <img
                      src={cover}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-[#6320EE]/15 border border-[#8059E3]/30 flex items-center justify-center text-[#8059E3] shadow-lg">
                      <FolderGit2 className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-gray-400">
                    <span className="text-[#8059E3]">{project.category}</span>
                    <span>{project.year || '2026'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/[0.04] border border-white/10 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">
                  {project.client ? `Client: ${project.client}` : 'Engineered for Performance'}
                </span>
                <Link
                  href="/portfolio"
                  className="text-xs font-semibold text-[#8059E3] group-hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
