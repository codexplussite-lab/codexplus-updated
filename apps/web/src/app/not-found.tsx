import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen text-white flex flex-col justify-between pt-28">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-24 text-center my-auto">
        <span className="text-xs font-mono text-[#8059E3] tracking-widest uppercase mb-4 block">
          Error 404 // Not Found
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Architectural Dead End.
        </h1>
        <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed mb-10">
          The page or route you are searching for does not exist in our current deployment.
        </p>
        <Link
          href="/"
          className="purple-pill-btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white hover:brightness-110 transition shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Studio Homepage</span>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
