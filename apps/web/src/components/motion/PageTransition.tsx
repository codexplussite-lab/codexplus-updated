import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  // Page switching animation completely removed as requested
  return <div className="w-full min-h-screen">{children}</div>;
}
