'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  focus?: string;
  photoUrl?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    photoUrl?: string;
  };
}

export function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/backend/public/team', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.items && Array.isArray(data.items)) {
          setMembers(
            data.items.map((m: any) => ({
              ...m,
              photoUrl: m.socials?.photoUrl || m.photoUrl || '',
              github: m.socials?.github || m.github || '',
              linkedin: m.socials?.linkedin || m.linkedin || '',
              twitter: m.socials?.twitter || m.twitter || '',
            }))
          );
        } else {
          setMembers([]);
        }
      })
      .catch(() => {
        setMembers([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!isLoading && members.length === 0) {
    return null;
  }

  return (
    <section id="team" aria-labelledby="team-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto">
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

      <StaggerContainer key="live" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, idx) => {
          const photo = member.photoUrl || member.socials?.photoUrl;
          const letter = member.name?.charAt(0) || 'C';
          const gh = (member as any).github || member.socials?.github;
          const li = (member as any).linkedin || member.socials?.linkedin;
          const tw = (member as any).twitter || member.socials?.twitter;

          return (
            <StaggerItem
              key={member.id || idx}
              aria-label={`${member.name} — ${member.role}`}
              className="webangles-card rounded-2xl overflow-hidden group hover:border-[#8059E3]/40 transition-all duration-300 flex flex-col justify-between p-6"
            >
              <div>
                {/* Visual Avatar Card or Picture */}
                <div className="h-52 rounded-xl bg-gradient-to-br from-[#120917] via-[#0D0D12] to-[#1a1129] border border-white/[0.06] flex flex-col items-center justify-center relative overflow-hidden mb-6 group-hover:border-[#8059E3]/30 transition-colors">
                  <div className="absolute inset-0 bg-[#6320EE]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />

                  {photo ? (
                    <img
                      src={photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6320EE] to-[#8059E3] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#6320EE]/40 relative z-10">
                        {letter}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-4 relative z-10">
                        Engineering Lead
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-[#8059E3] mb-3">{member.role}</p>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {member.bio || member.focus || 'Senior digital engineering practitioner.'}
                </p>
              </div>

              {/* Social profile links (Dynamic from CMS) */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
                {gh ? (
                  <Link
                    href={gh.startsWith('http') ? gh : `https://${gh}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-600 cursor-not-allowed">
                    <Github className="w-3.5 h-3.5" />
                  </span>
                )}

                {li ? (
                  <Link
                    href={li.startsWith('http') ? li : `https://${li}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-600 cursor-not-allowed">
                    <Linkedin className="w-3.5 h-3.5" />
                  </span>
                )}

                {tw ? (
                  <Link
                    href={tw.startsWith('http') ? tw : `https://${tw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-600 cursor-not-allowed">
                    <Twitter className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
