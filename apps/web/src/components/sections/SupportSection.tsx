import { CheckCircle2 } from 'lucide-react';

const SUPPORT_POINTS = [
  {
    title: 'Fast Responses',
    desc: 'Rapid communication with direct engineering access — zero account manager delays.',
  },
  {
    title: 'Expert Guidance',
    desc: 'Architectural reviews and strategic roadmapping to future-proof your digital investments.',
  },
  {
    title: 'Continuous Help',
    desc: 'Proactive monitoring, uptime protection, and rapid feature rollouts post-launch.',
  },
];

export function SupportSection() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06] bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">24/7 Support</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Here When You Need Us Most.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            CodeXplus comes with dedicated engineering support to help you launch, scale, and maintain your web applications without friction or downtime.
          </p>
        </div>

        <div className="lg:col-span-6 space-y-4">
          {SUPPORT_POINTS.map((pt, idx) => (
            <div key={idx} className="webangles-card p-6 rounded-2xl flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#8059E3] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-white mb-1">{pt.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
