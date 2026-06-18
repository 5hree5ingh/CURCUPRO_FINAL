"use client";

import React from "react";
import MagicBento from "./MagicBento";

export default function ApplicationsSection() {
  return (
    <section
      id="applications"
      className="relative w-full overflow-hidden min-h-screen flex flex-col justify-center py-16 lg:py-20"
      style={{
        background: `#f4ebd9`
      }}
    >
      {/* Warm ambient glow - top left */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at center, rgba(176,116,26,0.08) 0%, transparent 70%)`,
          transform: 'translate(-30%, -30%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Warm ambient glow - top right */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at center, rgba(208,143,48,0.06) 0%, transparent 70%)`,
          transform: 'translate(30%, -20%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Center luminous highlight */}
      <div 
        className="absolute top-[30%] left-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)`,
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom warm glow */}
      <div 
        className="absolute bottom-0 left-1/2 w-[900px] h-[300px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(176,116,26,0.05) 0%, transparent 70%)`,
          transform: 'translateX(-50%) translateY(30%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center">

        {/* Section Header */}
        <div className="mb-6 md:mb-10 lg:mb-8 text-center">
          <p className="text-[#b0741a] text-xs md:text-sm tracking-[0.3em] font-semibold uppercase font-sans">
            Applications
          </p>
          
          {/* Top Divider: gradient lines with circle */}
          <div className="flex items-center justify-center gap-3 mt-1.5 mb-2.5">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#b0741a]/50"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-[#b0741a] bg-transparent"></div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#b0741a]/50"></div>
          </div>

          <h2 className="font-serif text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium leading-[1.06] tracking-tight text-[#1a1105]">
            Where <span className="text-[#bf801d] md:bg-gradient-to-r md:from-[#b0741a] md:via-[#d08f30] md:to-[#8c540c] md:bg-clip-text md:text-transparent italic">purity</span> meets purpose.
          </h2>

          {/* Bottom Divider with botanical crest */}
          <div className="flex items-center justify-center gap-5 mt-3">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#b0741a]/40"></div>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#b0741a] stroke-[1.25] stroke-linecap-round stroke-linejoin-round">
              <path d="M12 21v-7" className="stroke-[#b0741a]/40" />
              <path d="M12 14c0-3.5-1.5-6 0-9.5 1.5 3.5 0 6 0 9.5z" fill="#b0741a" fillOpacity="0.15" />
              <path d="M12 14c-2.25-1.25-4.5-0.75-5.5-3.75 2.25 0.5 4 2.25 5.5 3.75z" fill="#b0741a" fillOpacity="0.15" />
              <path d="M12 14c2.25-1.25 4.5-0.75 5.5-3.75-2.25 0.5-4 2.25-5.5 3.75z" fill="#b0741a" fillOpacity="0.15" />
            </svg>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#b0741a]/40"></div>
          </div>
        </div>

        {/* MagicBento cards */}
        <div className="w-full">
          <MagicBento
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={false}
            enableBorderGlow={false}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            spotlightRadius={0}
            particleCount={0}
            glowColor="176, 116, 26"
            disableAnimations={true}
          />
        </div>

      </div>
    </section>
  );
}
