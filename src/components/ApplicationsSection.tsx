"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import MagicBento from "./MagicBento";

export default function ApplicationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative w-full bg-[#f4ebd9] text-[#1a1105] font-sans overflow-hidden py-24 md:py-36"
    >
      {/* Ambient glows */}
      <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[#8c540c]/5 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-[#b0741a]/4 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20 text-center"
        >
          <p className="text-[#b0741a] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Applications
          </p>
          <h2 className="font-serif text-[32px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium leading-[1.06] tracking-tight">
            <span className="text-[#1a1105]">Where </span>
            <span className="bg-gradient-to-r from-[#d08f30] via-[#b0741a] to-[#8c540c] bg-clip-text text-transparent">
              purity
            </span>
            <span className="text-[#1a1105]"> meets purpose.</span>
          </h2>
        </motion.div>

        {/* MagicBento — exact props from React Bits reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden"
        >
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={380}
            particleCount={12}
            glowColor="176, 116, 26"
            disableAnimations={false}
          />
        </motion.div>

      </div>
    </section>
  );
}
