import { Star, ShieldAlert } from 'lucide-react';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  status: 'client' | 'unconfirmed_demo';
  statusLabel?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Elena Vasquez',
    role: 'Founder, Maison Noor',
    quote: "CodeX+ didn't just design a website — they rebuilt how our entire company thinks about its brand. Every pixel feels deliberate. It changed the business.",
    status: 'unconfirmed_demo',
    statusLabel: 'Sample Testimonial (Demo / Template Reference)',
  },
  {
    name: 'Marcus Feld',
    role: 'CPO, Vanta Commerce',
    quote: 'The fastest, most considered build we have ever run. Conversion up 38% in one quarter, and the dev experience is genuinely beautiful.',
    status: 'unconfirmed_demo',
    statusLabel: 'Sample Testimonial (Demo / Template Reference)',
  },
  {
    name: 'Sofia Lindgren',
    role: 'VP Product, Pulse Analytics',
    quote: 'They translate vision into craft better than any team we have worked with. Our dashboard finally feels premium enough for our enterprise clients.',
    status: 'unconfirmed_demo',
    statusLabel: 'Sample Testimonial (Demo / Template Reference)',
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-28 px-6 max-w-7xl mx-auto ">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">Client Perspectives</span>
        <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Trusted by Ambitious Founders.
        </h2>
        <p className="text-gray-400 text-sm">
          Unconfirmed sample feedback is explicitly labeled pending client sign-off.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <article
            key={idx}
            aria-label={`Testimonial from ${t.name}, ${t.role}`}
            className="p-8 rounded-2xl bg-[#0D0D14] border border-white/[0.08] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {t.status === 'unconfirmed_demo' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Concept Demo
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="pt-6 ">
              <h3 className="text-sm font-bold text-white">{t.name}</h3>
              <p className="text-xs text-gray-400">{t.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
