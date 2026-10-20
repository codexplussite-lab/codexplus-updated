export function ClientMarquee() {
  const tags = [
    'Cognitive',
    'Intelligent Systems',
    'Infrastructure',
    'Full-Stack Craft',
    'Next.js 15',
    'Custom CMS',
    'Scalable Cloud',
    'Design Systems',
  ];

  return (
    <section className="py-8 border-y border-white/[0.06] bg-black overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {tags.concat(tags).map((tag, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-wider text-gray-500 hover:text-gray-300 uppercase transition cursor-default">
              {tag}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F1AD6]" />
          </div>
        ))}
      </div>
    </section>
  );
}
