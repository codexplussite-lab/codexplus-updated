export function AboutStats() {
  const stats = [
    { value: 'Senior', suffix: 'Engineering', label: 'Zero junior outsourcing' },
    { value: '100%', suffix: 'Type Safe', label: 'Strict Zod & TypeScript' },
    { value: 'Fastify', suffix: '& Next.js 15', label: 'High-throughput architecture' },
    { value: '24h', suffix: 'Turnaround', label: 'Average initial response' },
  ];

  return (
    <section id="about" aria-labelledby="about-stats-heading" className="py-24 md:py-28 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8059E3] mb-3 block">About the Studio</span>
          <h2 id="about-stats-heading" className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Where imagination meets engineering.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 text-gray-400 text-base md:text-lg leading-relaxed">
          <p>
            At CodeXplus, we engineer digital flagships and bespoke web systems. Every engagement starts with architectural rigor and ends with interfaces people genuinely enjoy using.
          </p>
          <p>
            From initial database schema modeling to final production deployment, we partner directly with founders and teams—pairing clean, thoughtful engineering with visual direction that refuses to blend in.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {stats.map((s, idx) => (
          <div key={idx} className="webangles-card p-8 rounded-2xl flex flex-col justify-between">
            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 font-mono">
              {s.value}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#8059E3] mb-1">{s.suffix}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
