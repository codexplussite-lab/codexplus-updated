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
  const [siteSettings, setSiteSettings] = useState<{
    siteName?: string;
    logoUrl?: string;
  }>({
    siteName: 'CodeXplus',
    logoUrl: '/logo.svg',
  });
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/backend/public/site', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          setSiteSettings({
            siteName: data.settings.siteName || 'CodeXplus',
            logoUrl: data.settings.logoUrl || '/logo.png',
          });
        }
      })
      .catch(() => null);
  }, []);

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
        {/* Brand Logo only (Text removed as requested) */}
        <Link href="/" className="flex items-center group py-1" aria-label="Homepage">
          <div className="h-8 flex items-center justify-center">
            <img
              src={siteSettings.logoUrl || '/logo.svg'}
              alt="Logo"
              className="h-7 w-auto object-contain max-h-7 rounded-sm group-hover:opacity-90 transition-opacity"
            />
          </div>
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
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6320EE] to-[#8059E3] rounded-full shadow-[0_0_8px_rgba(99,32,238,0.8)]"
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
            className="purple-pill-btn px-4 md:px-5 py-2 rounded-full text-xs font-semibold text-white hover:brightness-110 transition shadow-lg inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 bg-[#09090D]/95 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl z-50 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#6320EE]/20 text-white font-bold border border-[#6320EE]/40'
                          : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="purple-pill-btn w-full py-3.5 rounded-2xl text-xs font-semibold text-white flex items-center justify-center gap-2"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
