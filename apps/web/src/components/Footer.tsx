import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-white/[0.06] gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#4F1AD6] to-[#8059E3] flex items-center justify-center font-bold text-white text-sm shadow-md">
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              CodeX<span className="text-[#8059E3]">+</span>
            </span>
          </Link>

          <div className="flex gap-8 text-xs font-medium text-gray-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="#about" className="hover:text-white transition">About</Link>
            <Link href="#services" className="hover:text-white transition">Services</Link>
            <Link href="#portfolio" className="hover:text-white transition">Portfolio</Link>
            <Link href="#contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© Copyright 2026 CodeXplus. Rebuilt with custom Fastify & Next.js 15.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
