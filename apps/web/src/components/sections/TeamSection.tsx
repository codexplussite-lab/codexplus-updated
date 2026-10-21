'use client';

import { Github, Linkedin, Twitter, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  avatarLetter: string;
  isConfirmed: boolean;
  confirmationNotice?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Arman Naqvi',
    role: 'Lead Architect & Founder',
    focus: 'Full-stack systems architecture, Node/Fastify API pipelines, and cloud database optimization.',
    avatarLetter: 'A',
    isConfirmed: false,
    confirmationNotice: 'Pending owner bio & social handle confirmation',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Sofia Chen',
    role: 'Head of Product & Design Systems',
    focus: 'Component design systems, responsive layout tokens, and WCAG AA accessibility frameworks.',
    avatarLetter: 'S',
    isConfirmed: false,
    confirmationNotice: 'Placeholder profile — awaiting owner verification',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Cloud & Security Engineer',
    focus: 'Distributed PostgreSQL setups, zero-trust session authentication, and automated continuous delivery.',
    avatarLetter: 'M',
    isConfirmed: false,
    confirmationNotice: 'Placeholder profile — awaiting owner verification',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Motion & Frontend Craftsman',
    focus: 'Modern WebGL shaders, Three.js 3D canvas viewport rendering, and fluid micro-interactions.',
    avatarLetter: 'E',
    isConfirmed: false,
    confirmationNotice: 'Placeholder profile — awaiting owner verification',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
];

export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            Core Engineering Team
          </span>
          <h2 id="team-heading" className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Crafted Directly by Senior Practitioners.
          </h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          Every project is built and reviewed by dedicated senior engineers and product designers. Zero junior outsourcing, zero dropped context.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member, idx) => (
          <StaggerItem
            key={idx}
            aria-label={`${member.name} — ${member.role}`}
            className="webangles-card rounded-2xl overflow-hidden group hover:border-[#8059E3]/40 transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              {/* Member Visual Avatar Card with Ambient Obsidian Lighting */}
              <div className="h-52 rounded-xl bg-gradient-to-br from-[#120917] via-[#0D0D12] to-[#1a1129] border border-white/[0.06] flex flex-col items-center justify-center relative overflow-hidden mb-6 group-hover:border-[#8059E3]/30 transition-colors">
                <div className="absolute inset-0 bg-[#8059E3]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
                
                <div 
                  role="img"
                  aria-label={`Initials avatar for ${member.name}`}
                  className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl font-bold text-white group-hover:scale-105 group-hover:border-[#8059E3] transition-all shadow-inner"
                >
                  {member.avatarLetter}
                </div>

                <span className="absolute bottom-3 text-[10px] font-mono tracking-widest uppercase text-gray-500">
                  Engineering Lead
                </span>
              </div>

              {/* Verification Flag Notice */}
              {!member.isConfirmed && (
                <div className="mb-3 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5 text-[10px] font-mono text-amber-300">
                  <AlertCircle className="w-3 h-3 shrink-0 text-amber-400" />
                  <span className="truncate">{member.confirmationNotice || 'Pending confirmation'}</span>
                </div>
              )}

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#8059E3] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-[#8059E3] mb-3 font-mono">
                {member.role}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {member.focus}
              </p>
            </div>

            {/* Social links with 44x44px touch targets and explicit aria labels */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
              {member.socials?.github && (
                <Link
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub profile`}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Github className="w-4 h-4" />
                </Link>
              )}
              {member.socials?.linkedin && (
                <Link
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn profile`}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
              )}
              {member.socials?.twitter && (
                <Link
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s Twitter / X profile`}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
