"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

// Custom SVGs for specs to match the screenshot exactly
const CASIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <circle cx="12" cy="5" r="2" fill="none" />
    <circle cx="5" cy="16" r="2" fill="none" />
    <circle cx="19" cy="16" r="2" fill="none" />
    <line x1="12" y1="9.5" x2="12" y2="7" />
    <line x1="9.8" y1="13.3" x2="6.7" y2="15.2" />
    <line x1="14.2" y1="13.3" x2="17.3" y2="15.2" />
  </svg>
);

const WeightIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="7" y1="9" x2="17" y2="9" />
    <path d="M9 19h6" />
    <path d="M7 9l-3 6h6l-3-6" />
    <path d="M17 9l-3 6h6l-3-6" />
  </svg>
);

const FormulaIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="18" r="2.5" fill="none" />
    <circle cx="12" cy="8" r="2.5" fill="none" />
    <circle cx="18" cy="18" r="2.5" fill="none" />
    <line x1="7.7" y1="16.2" x2="10.3" y2="9.8" />
    <line x1="13.7" y1="9.8" x2="16.3" y2="16.2" />
  </svg>
);

const ThermometerIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
  </svg>
);

const DropletIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const FlaskIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12" />
    <path d="M10 3v5L4 19A2 2 0 0 0 5.8 21h12.4a2 2 0 0 0 1.8-2L14 8V3" />
  </svg>
);

const StorageIcon = () => (
  <svg className="w-5 h-5 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const RibbonIcon = () => (
  <svg className="w-4 h-4 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
  </svg>
);

const BeakerIcon = () => (
  <svg className="w-4 h-4 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 3h15" />
    <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
    <path d="M6 14h12" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-4 h-4 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4 text-[#b0741a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const leftSpecs = [
    {
      label: "CAS Number",
      value: "458-37-7",
      icon: <CASIcon />,
      hasDivider: true,
    },
    {
      label: "Molecular Formula",
      value: "C₂₁H₂₀O₆",
      icon: <FormulaIcon />,
      hasDivider: true,
    },
    {
      label: "Appearance",
      value: (
        <span>
          Bright Yellow<br />Crystalline Powder
        </span>
      ),
      icon: <DropletIcon />,
      hasDivider: true,
    },
    {
      label: "Storage",
      value: "Cool, dry place. Protect from light.",
      icon: <StorageIcon />,
      hasDivider: false,
    },
  ];

  const rightSpecs = [
    {
      label: "Molecular Weight",
      value: "368.38 g/mol",
      icon: <WeightIcon />,
      hasDivider: true,
    },
    {
      label: "Melting Point",
      value: "183 °C",
      icon: <ThermometerIcon />,
      hasDivider: true,
    },
    {
      label: "Solubility",
      value: (
        <span>
          Soluble in ethanol,<br />DMSO, acetone
        </span>
      ),
      icon: <FlaskIcon />,
      hasDivider: true,
    },
  ];

  const badges = [
    {
      title: "ISO 9001:2015",
      subtitle: "Certified",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "GMP",
      subtitle: "Certified",
      icon: <RibbonIcon />,
    },
    {
      title: "Lab",
      subtitle: "Tested",
      icon: <BeakerIcon />,
    },
    {
      title: "COA",
      subtitle: "Available",
      icon: <DocumentIcon />,
    },
    {
      title: "Export",
      subtitle: "Grade",
      icon: <GlobeIcon />,
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full min-h-screen text-[#1a1105] font-sans flex flex-col md:flex-row items-start md:items-center px-5 sm:px-8 md:px-16 lg:px-24 pt-24 md:pt-0 pb-8 md:pb-0"
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/image copy.png"
          alt="Products Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Mobile readability overlay */}
        <div className="absolute inset-0 bg-[#f4ebd9]/60 md:bg-transparent" />
      </div>

      {/* Specifications content (left-aligned, vertically centered) */}
      <div className="max-w-[900px] w-full mr-auto flex flex-col justify-center z-10 relative">
        
        {/* Title & Subtitle Group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-5"
        >
          <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-medium leading-[1.08] tracking-tight">
            <span className="text-[#1a1105] block">Synthetic Curcumin</span>
            <span className="bg-gradient-to-r from-[#b0741a] via-[#d08f30] to-[#8c540c] bg-clip-text text-transparent inline-block">Specifications</span>
          </h2>
          <p className="text-[#493c2c]/90 text-sm sm:text-base leading-relaxed mt-1.5">
            <span className="text-[#b0741a] font-semibold">ISO-certified</span> synthetic curcumin available in multiple purity grades for food, pharma, cosmetics, and research applications.
          </p>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 md:gap-x-4 gap-y-0 items-start max-w-[650px] w-full">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {leftSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-5 py-2.5 ${spec.hasDivider ? "border-b border-[#b0741a]/15" : ""}`}
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full border border-[#b0741a]/30 text-[#b0741a] flex-shrink-0 mt-1">
                  {spec.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#b0741a] font-sans text-xs md:text-sm font-medium tracking-wide">
                    {spec.label}
                  </span>
                  <div className="text-[#1a1105] font-sans text-base md:text-lg font-normal leading-snug mt-1">
                    {spec.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-5 py-2.5 ${spec.hasDivider ? "border-b border-[#b0741a]/15" : ""}`}
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full border border-[#b0741a]/30 text-[#b0741a] flex-shrink-0 mt-1">
                  {spec.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#b0741a] font-sans text-xs md:text-sm font-medium tracking-wide">
                    {spec.label}
                  </span>
                  <div className="text-[#1a1105] font-sans text-base md:text-lg font-normal leading-snug mt-1">
                    {spec.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom: Badges & Button */}
      <div className="relative md:absolute md:bottom-6 md:left-[42%] md:right-0 w-full md:w-auto z-10 flex flex-col items-center mt-8 md:mt-0 pr-0 md:pr-16 lg:pr-24">
        {/* Badges Row */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }}
              animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[#b0741a]/15 bg-white/50 backdrop-blur-[8px] rounded-xl py-2 sm:py-2.5 px-3 sm:px-4 flex items-center gap-2 sm:gap-3 hover:border-[#b0741a]/40 transition duration-300"
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b0741a]/8 text-[#b0741a] flex-shrink-0">
                {badge.icon}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[#1a1105] text-xs font-bold font-sans tracking-wide">
                  {badge.title}
                </span>
                <span className="text-[#493c2c]/80 text-[10px] font-medium font-sans">
                  {badge.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex justify-center w-full"
        >
          <button className="px-10 sm:px-16 py-3 sm:py-3.5 bg-gradient-to-r from-[#b0741a] to-[#c58c38] hover:from-[#c2842b] hover:to-[#d09945] text-white rounded-lg font-sans font-semibold text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(176,116,26,0.15)] hover:shadow-[0_6px_24px_rgba(176,116,26,0.25)] cursor-pointer w-full max-w-[500px]">
            <span>REQUEST TDS / COA</span>
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
