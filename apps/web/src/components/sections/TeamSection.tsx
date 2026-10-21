import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarLetter: string;
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
    bio: 'Directing full-stack systems engineering, performance optimization, and scalable cloud architectures.',
    avatarLetter: 'A',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Sofia Chen',
    role: 'Head of Product & Design Systems',
    bio: 'Crafting high-precision interfaces, fluid micro-interactions, and comprehensive component libraries.',
    avatarLetter: 'S',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Cloud & Security Engineer',
    bio: 'Hardening multi-region infrastructure, zero-trust auth pipelines, and PostgreSQL database performance.',
    avatarLetter: 'M',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Motion & Frontend Craftsman',
    bio: 'Specializing in WebGL shaders, Three.js 3D viewport canvas, and buttery 120fps UI animations.',
    avatarLetter: 'E',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">
            Craftsmen & Minds
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The Team Behind the Craft.
          </h2>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          Senior-level engineers and designers working directly with ambitious founders. No junior delegation, no lost context.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            key={idx}
            className="webangles-card rounded-2xl overflow-hidden group hover:border-[#8059E3]/40 transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              {/* Member Visual Avatar Card with Webangles Glow */}
              <div className="h-56 rounded-xl bg-gradient-to-br from-[#120917] via-[#0D0D12] to-[#1a1129] border border-white/[0.05] flex flex-col items-center justify-center relative overflow-hidden mb-6 group-hover:border-[#8059E3]/30 transition-colors">
                <div className="absolute inset-0 bg-[#4F1AD6]/15 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
                
                <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl font-extrabold text-white group-hover:scale-105 group-hover:border-[#8059E3] transition-all shadow-inner">
                  {member.avatarLetter}
                </div>

                <span className="absolute bottom-3 text-[10px] font-mono tracking-widest uppercase text-gray-500">
                  CodeX+ Core
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#8059E3] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-[#8059E3] mb-3 font-mono">
                {member.role}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {member.bio}
              </p>
            </div>

            {/* Social links */}
            <div className="pt-4 border-t border-white/[0.05] flex items-center gap-3">
              {member.socials?.github && (
                <Link
                  href={member.socials.github}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition"
                >
                  <Github className="w-3.5 h-3.5" />
                </Link>
              )}
              {member.socials?.linkedin && (
                <Link
                  href={member.socials.linkedin}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </Link>
              )}
              {member.socials?.twitter && (
                <Link
                  href={member.socials.twitter}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
