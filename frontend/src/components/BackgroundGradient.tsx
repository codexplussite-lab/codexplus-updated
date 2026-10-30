"use client";

import { Velaris } from '@/components/Velaris';

export function BackgroundGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Seamless global living animated WebGL shader gradient */}
      <Velaris
        bg="#030305"
        colors={["#7535F8", "#4F1AD6", "#2D1065", "#030305"]}
        speed={1.8}
        grain={0.18}
        height="100%"
        className="h-full w-full opacity-85"
      />
      {/* Global atmospheric ambient glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#6320EE]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-3/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4F1AD6]/12 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
}
