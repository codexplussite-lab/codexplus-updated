"use client";

import { Velaris } from '@/components/Velaris';

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Living animated WebGL shader gradient */}
      <Velaris
        bg="#000000"
        colors={["#A855F7", "#6366F1", "#4F1AD6", "#0f0224"]}
        speed={2.2}
        grain={0.15}
        height="100%"
        className="h-full w-full"
      />
    </div>
  );
}
