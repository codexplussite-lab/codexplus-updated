'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Journal', href: '/articles' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on resize to desktop & handle Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Trap body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-5 px-4 pointer-events-none">
      <div className="w-full max-w-5xl h-14 rounded-full px-5 md:px-6 flex items-center justify-between backdrop-blur-xl bg-[#09090D]/85 border border-white/10 shadow-2xl pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group" aria-label="CodeXplus Homepage">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#6320EE] to-[#8059E3] flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#6320EE]/30">
            C
          </div>
          <span className="text-base font-bold tracking-tight text-white group-hover:text-gray-200 transition">
            CodeX<span className="text-[#8059E3]">+</span>
          </span>
        </Link>

        {/* Desktop Multi-Page Navigation with Active Indicator */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`py-1 transition relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded ${
                  active ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6320EE] to-[#8059E3] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="purple-pill-btn px-4 md:px-5 py-2 rounded-full text-xs font-semibold text-white hover:brightness-110 transition shadow-lg inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>

          {/* Accessible Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Modal / Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 bg-[#030305]/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6 pointer-events-auto md:hidden"
        >
          <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#8059E3]">
              Studio Navigation
            </span>
            <nav className="flex flex-col gap-4 w-full">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium transition py-2 border-b border-white/[0.06] w-full flex items-center justify-between ${
                      active ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#8059E3]" />}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="purple-pill-btn w-full py-3.5 rounded-full text-sm font-semibold text-white mt-4 flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
