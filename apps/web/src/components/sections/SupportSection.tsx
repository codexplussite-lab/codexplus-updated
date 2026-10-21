'use client';

import { CheckCircle2, Clock, Shield, Headphones } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const SUPPORT_POINTS = [
  {
    icon: Clock,
    title: 'Rapid Engineering Turnaround',
    desc: 'Direct communication channels with senior systems engineers. No intermediary account managers or ticketing bureaucracy.',
  },
  {
    icon: Shield,
    title: 'Proactive Reliability & Architecture Auditing',
    desc: 'Continuous performance reviews, automated security patch assessments, and edge cache revalidation to ensure 99.9% platform availability.',
  },
  {
    icon: Headphones,
    title: 'Post-Launch Partnership & Scaling',
    desc: 'Structured maintenance retainers, continuous feature sprints, and infrastructure scaling support as your user volume expands.',
  },
];

export function SupportSection() {
  return (
    <section className="py-24 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <FadeIn className="lg:col-span-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#BEF264] mb-3 block">
            Dedicated Support
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Reliable Engineering When Stakes Are High.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            CodeXplus provides dedicated engineering support and architectural guidance to ensure your applications launch securely, run reliably, and scale predictably.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-[#BEF264]" />
            <span>Guaranteed 24-hour response window on all serious inquiries</span>
          </div>
        </FadeIn>

        <StaggerContainer className="lg:col-span-6 space-y-4">
          {SUPPORT_POINTS.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <StaggerItem key={idx} className="webangles-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#BEF264] shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{pt.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{pt.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
