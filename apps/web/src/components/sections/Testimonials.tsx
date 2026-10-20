import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Elena Vasquez',
    role: 'Founder, Maison Noor',
    quote: "CodeX+ didn't just design a website — they rebuilt how our entire company thinks about its brand. Every pixel feels deliberate. It changed the business.",
  },
  {
    name: 'Marcus Feld',
    role: 'CPO, Vanta Commerce',
    quote: 'The fastest, most considered build we have ever run. Conversion up 38% in one quarter, and the dev experience is genuinely beautiful.',
  },
  {
    name: 'Sofia Lindgren',
    role: 'VP Product, Pulse Analytics',
    quote: 'They translate vision into craft better than any team we have worked with. Our dashboard finally feels premium enough for our enterprise clients.',
  },
];

export function Testimonials() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-xs font-semibold tracking-wider uppercase text-blue-400 mb-3 block">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Trusted by ambitious founders worldwide.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-[#11131A] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="pt-6 border-t border-white/5">
              <h4 className="text-sm font-bold text-white">{t.name}</h4>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
