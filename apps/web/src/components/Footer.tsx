import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080808] text-[#f5f5f5] pt-24 pb-12 sm:pb-16 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Area: Left Brand Info + Right 4-Column Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 pb-20 sm:pb-28">
          {/* Left Branding Area */}
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight text-[#f5f5f5] hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white inline-block w-fit"
            >
              CodeXplus
            </Link>
            <p className="text-xs sm:text-sm text-[#858585] tracking-wide pt-1">
              &copy; {currentYear} CodeXplus
            </p>
            <p className="text-xs sm:text-sm text-[#858585] tracking-wide">
              All right reserved.
            </p>
          </div>

          {/* Right Navigation Area: 4 Columns */}
          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 w-full lg:w-auto"
          >
            {/* Column 1: Product / Disciplines */}
            <div className="flex flex-col space-y-3.5">
              <h3 className="text-xs sm:text-sm font-semibold text-[#f5f5f5] tracking-tight">
                Product
              </h3>
              <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-[#858585]">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Web Applications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Fastify APIs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Headless CMS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Performance Auditing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col space-y-3.5">
              <h3 className="text-xs sm:text-sm font-semibold text-[#f5f5f5] tracking-tight">
                Company
              </h3>
              <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-[#858585]">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Selected Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Journal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="flex flex-col space-y-3.5">
              <h3 className="text-xs sm:text-sm font-semibold text-[#f5f5f5] tracking-tight">
                Resources
              </h3>
              <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-[#858585]">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Inquiry SLA
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Architecture Specs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Tech Publications
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:contact@codexplus.site"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Direct Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="flex flex-col space-y-3.5">
              <h3 className="text-xs sm:text-sm font-semibold text-[#f5f5f5] tracking-tight">
                Legal
              </h3>
              <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-[#858585]">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#f5f5f5] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Security Inquiries
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Oversized Outlined Brand Wordmark */}
        <div
          aria-hidden="true"
          className="w-full flex items-center justify-center pt-8 pb-4 overflow-hidden pointer-events-none select-none"
        >
          <span
            className="brand-wordmark-outline text-[clamp(4.5rem,15.5vw,14rem)] text-center tracking-tighter"
            style={{
              WebkitTextStroke: '1.5px rgba(235, 235, 235, 0.85)',
            }}
          >
            CodeXplus
          </span>
        </div>
      </div>
    </footer>
  );
}
