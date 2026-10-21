"use client";

import { Velaris } from '@/components/Velaris';

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Animated WebGL living gradient */}
      <Velaris
        bg="#000000"
        colors={["#A855F7", "#6366F1", "#4F1AD6", "#120429"]}
        speed={1.8}
        grain={0.22}
        height="100vh"
        className="h-full w-full opacity-65"
      />
      {/* Dark vignette overlay for optimal typography readability and contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
    </div>
  );
}
