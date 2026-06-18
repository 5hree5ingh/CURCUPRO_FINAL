"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import ShinyText from "./ShinyText";

// Comparison data
const comparisonData = [
  {
    attribute: "Purity",
    natural: "~75–85%",
    synthetic: "99.5%+",
    highlight: true,
  },
  {
    attribute: "Batch Consistency",
    natural: "Variable",
    synthetic: "Identical",
    highlight: false,
  },
  {
    attribute: "Heavy Metals",
    natural: "Risk of contamination",
    synthetic: "Non-detectable",
    highlight: false,
  },
  {
    attribute: "Supply Stability",
    natural: "Seasonal / Climate-dependent",
    synthetic: "Year-round",
    highlight: true,
  },
  {
    attribute: "Scalability",
    natural: "Limited by harvest",
    synthetic: "Unlimited",
    highlight: false,
  },
  {
    attribute: "Pesticide Residues",
    natural: "Possible",
    synthetic: "Zero",
    highlight: false,
  },
];

const statHighlights = [
  {
    value: "99.5%",
    label: "Single-Molecule Purity",
    description: "Pharmaceutical-grade precision",
  },
  {
    value: "0%",
    label: "Batch Variation",
    description: "Every batch, identical",
  },
  {
    value: "365",
    label: "Days Supply Guarantee",
    description: "No seasonal dependency",
  },
];

export default function WhySyntheticSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f4ebd9] text-[#1a1105] font-sans overflow-visible py-16 lg:py-20 flex flex-col justify-center"
    >
      {/* Subtle ambient glows */}
      <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-[#b0741a]/4 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-[#d08f30]/3 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4 md:mb-6 lg:mb-5"
        >
          {/* Eyebrow */}
          <p className="text-[#b0741a] text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-3">
            The Science Behind the Switch
          </p>

          {/* Title */}
          <h2 className="font-serif text-[30px] sm:text-[46px] md:text-[56px] lg:text-[66px] font-medium leading-[1.08] tracking-tight">
            <span className="text-[#1a1105]">Why </span>
            <span className="bg-gradient-to-r from-[#b0741a] via-[#d08f30] to-[#8c540c] bg-clip-text text-transparent">
              Synthetic?
            </span>
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-10 lg:mb-8"
        >
          {statHighlights.map((stat, i) => (
            <div
              key={i}
              className="badge-shine relative rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-4 text-center group transition-all duration-500"
              style={{
                background: 'linear-gradient(160deg, rgba(255,253,248,0.98) 0%, rgba(252,248,238,0.95) 35%, rgba(245,236,215,0.88) 100%)',
                border: '1px solid rgba(208, 163, 78, 0.3)',
                boxShadow: '0 1px 0 rgba(255,255,255,1) inset, 0 8px 24px rgba(176,116,26,0.12), 0 4px 10px rgba(176,116,26,0.06), 0 18px 45px rgba(140,84,12,0.06)',
                ['--badge-delay' as string]: `${i * 0.9}s`,
                animationDelay: `${i * 0.9}s`,
              } as React.CSSProperties}
            >
              {/* Premium gold top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] rounded-full" style={{
                background: 'linear-gradient(90deg, transparent, rgba(218,175,85,0.7) 30%, rgba(232,196,108,0.85) 50%, rgba(218,175,85,0.7) 70%, transparent)',
              }} />

              <span className="block font-serif text-[28px] sm:text-[36px] md:text-[44px] font-medium leading-tight mb-1">
                <ShinyText
                  text={stat.value}
                  speed={2.5}
                  delay={0}
                  color="#b0741a"
                  shineColor="#f0c060"
                  spread={100}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                  className="font-serif text-[28px] sm:text-[36px] md:text-[44px] font-medium leading-tight"
                />
              </span>
              <span className="block text-[#1a1105] text-xs sm:text-base font-semibold font-sans tracking-wide mb-0.5 sm:mb-1">
                {stat.label}
              </span>
              <span className="block text-[#5c4a32]/60 text-[10px] sm:text-sm font-sans">
                {stat.description}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(3px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-0 mb-2">
            <div className="py-2 px-4 sm:px-8">
              <span className="text-[#493c2c]/50 text-[10px] sm:text-sm font-semibold font-sans tracking-wider sm:tracking-widest uppercase">
                Parameter
              </span>
            </div>
            <div className="py-2 px-4 sm:px-8 text-center">
              <span className="text-[#493c2c]/50 text-[10px] sm:text-sm font-semibold font-sans tracking-wider sm:tracking-widest uppercase">
                Natural
              </span>
            </div>
            <div className="py-2 px-4 sm:px-8 text-center">
              <span className="text-[#b0741a] text-[10px] sm:text-sm font-semibold font-sans tracking-wider sm:tracking-widest uppercase">
                Synthetic
              </span>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 0 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.35 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`grid grid-cols-3 gap-0 border-t border-[#b0741a]/8 ${i === comparisonData.length - 1
                ? "border-b border-[#b0741a]/8"
                : ""
                }`}
            >
              {/* Attribute */}
              <div className="py-2.5 sm:py-3 lg:py-2.5 px-4 sm:px-8 flex items-center">
                <span className="text-xs sm:text-base md:text-lg font-medium font-sans">
                  {row.attribute}
                </span>
              </div>

              {/* Natural value */}
              <div className="py-2.5 sm:py-3 lg:py-2.5 px-4 sm:px-8 flex items-center justify-center">
                <span className="text-[#493c2c]/60 text-[10px] sm:text-base md:text-lg font-sans text-center">
                  {row.natural}
                </span>
              </div>

              {/* Synthetic value */}
              <div className="py-2.5 sm:py-3 lg:py-2.5 px-4 sm:px-8 flex items-center justify-center">
                <span className="text-[10px] sm:text-base md:text-lg font-sans text-center font-semibold text-[#b0741a]">
                  {row.synthetic}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
