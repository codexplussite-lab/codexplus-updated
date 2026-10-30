import './globals.css';
import { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { PageTransition } from '@/components/motion/PageTransition';
import { NavigationProgressBar } from '@/components/motion/NavigationProgressBar';
import { CustomCursor } from '@/components/motion/CustomCursor';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codexplus.site'),
  title: {
    default: 'CodeXplus — Elite Web Systems & Full-Stack Digital Engineering Studio',
    template: '%s | CodeXplus',
  },
  description:
    'CodeXplus builds high-performance web applications, custom digital architectures, and headless CMS platforms for ambitious businesses and tech leaders.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords: ['Web Development', 'Next.js 15', 'Fastify', 'Digital Agency', 'Full-Stack Engineering', 'Custom CMS'],
  authors: [{ name: 'CodeXplus Studio' }],
  creator: 'CodeXplus',
  publisher: 'CodeXplus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://codexplus.site',
  },
  openGraph: {
    title: 'CodeXplus — Elite Web Systems & Full-Stack Digital Engineering Studio',
    description: 'Bespoke web applications, high-throughput APIs, and modern design systems engineered to scale.',
    url: 'https://codexplus.site',
    siteName: 'CodeXplus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeXplus — Elite Web Systems & Full-Stack Digital Engineering',
    description: 'High-performing web platforms engineered with Next.js, Fastify, and custom architecture.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#030305] text-[#FFFFFF] font-sans antialiased selection:bg-[#6320EE] selection:text-white relative"
        suppressHydrationWarning
      >
        <BackgroundGradient />
        <CustomCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'CodeXplus Studio',
              url: 'https://codexplus.site',
              description:
                'Full-stack digital engineering studio specializing in Next.js 15, Fastify APIs, design systems, and headless architectures.',
              email: 'contact@codexplus.site',
              areaServed: 'Worldwide',
              serviceType: [
                'Full-Stack Web Development',
                'Design Systems Engineering',
                'Headless CMS Development',
                'Core Web Vitals Performance Auditing',
              ],
            }),
          }}
        />
        <div className="relative z-10">
          <NavigationProgressBar />
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
