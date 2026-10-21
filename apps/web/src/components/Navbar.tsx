'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#BEF264] to-[#BEF264] flex items-center justify-center font-bold text-white text-sm shadow-md shadow-[#BEF264]/30">
            C
          </div>
          <span className="text-base font-bold tracking-tight text-white group-hover:text-gray-200 transition">
            CodeX<span className="text-[#BEF264]">+</span>
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
                className={`py-1 transition-colors duration-200 relative group focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded ${
                  active ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {active ? (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#BEF264] to-[#BEF264] rounded-full shadow-[0_0_8px_rgba(99,32,238,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white/20 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="lime-pill-btn px-4 md:px-5 py-2 rounded-full text-xs font-semibold text-white hover:brightness-110 transition shadow-lg inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
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

      {/* Accessible Animated Mobile Navigation Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#030305]/95 flex flex-col justify-center items-center px-6 pointer-events-auto md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm flex flex-col items-center gap-6 text-center"
            >
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#BEF264]">
                Studio Navigation
              </span>
              <nav className="flex flex-col gap-3 w-full">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors py-2 border-b border-white/[0.06] w-full flex items-center justify-between ${
                        active ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-[#BEF264] shadow-[0_0_8px_rgba(128,89,227,0.8)]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="lime-pill-btn group w-full py-3.5 rounded-full text-sm font-semibold text-white mt-4 flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
