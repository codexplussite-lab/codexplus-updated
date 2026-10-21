export function ClientMarquee() {
  const STACK_CORE = [
    'Next.js 15 App Router',
    'Fastify 5 Node Architecture',
    'PostgreSQL & Drizzle ORM',
    'Strict Zod Schema Validation',
    'Tailwind CSS & Design Systems',
    'Framer Motion Micro-Interactions',
    'Headless CMS Integrations',
    'Core Web Vitals Optimization',
  ];

  return (
    <section aria-label="Core Engineering Technologies" className="py-6 bg-[#08080C] border-y border-white/[0.06] overflow-hidden">
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {STACK_CORE.concat(STACK_CORE).map((tech, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium tracking-wider text-gray-400 uppercase transition hover:text-white cursor-default">
              {tech}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#8059E3]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
