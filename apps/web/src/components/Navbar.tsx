import Link from 'next/link';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <div className="w-full max-w-5xl h-14 rounded-full px-6 flex items-center justify-between backdrop-blur-xl bg-[#0e0e0e]/80 border border-white/10 shadow-2xl pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#4F1AD6] to-[#8059E3] flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#4F1AD6]/30">
            C
          </div>
          <span className="text-base font-bold tracking-tight text-white group-hover:text-gray-200 transition">
            CodeX<span className="text-[#8059E3]">+</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/services" className="hover:text-white transition">Services</Link>
          <Link href="/portfolio" className="hover:text-white transition">Portfolio</Link>
          <Link href="/articles" className="hover:text-white transition">Journal</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>

        <Link
          href="/contact"
          className="purple-pill-btn px-4 py-1.5 rounded-full text-xs font-semibold text-white hover:brightness-110 transition shadow-lg"
        >
          Get In Touch
        </Link>
      </div>
    </header>
  );
}
