const TECH_GROUPS = [
  {
    title: 'Frontend Engineering',
    items: ['React.js', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'Framer Motion'],
  },
  {
    title: 'Backend & Database',
    items: ['Node.js', 'Fastify 5', 'PostgreSQL', 'Drizzle ORM', 'Redis', 'REST & GraphQL'],
  },
  {
    title: 'UI/UX & Product Design',
    items: ['Figma', 'Design Systems', 'Micro-interactions', 'Wireframing', 'User Research'],
  },
  {
    title: 'Performance & DevOps',
    items: ['Docker', 'Nginx', 'CI/CD Pipelines', 'Core Web Vitals', 'Ubuntu', 'Cloud Scaling'],
  },
];

export function TechStack() {
  return (
    <section id="skills" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-semibold tracking-wider uppercase text-blue-400 mb-3 block">Skills & Stack</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Engineered with precision & modern technology.
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          A curated tech stack focused on high performance, seamless user experience, and scalable code standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TECH_GROUPS.map((group, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-[#11131A] border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6 pb-4 border-b border-white/5">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item, iIdx) => (
                <li key={iIdx} className="text-sm text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
