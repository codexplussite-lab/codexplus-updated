import './globals.css';
import { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { BackgroundGradient } from '@/components/BackgroundGradient';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'CodeXplus — Smart Web Experiences Built From Every Angle',
  description: 'CodeXplus is a modern creative agency crafting high-performing websites and digital products designed to convert and scale.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${dmSans.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#000000] text-[#FFFFFF] font-sans antialiased selection:bg-[#4F1AD6] selection:text-white relative"
        suppressHydrationWarning
      >
        <BackgroundGradient />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
