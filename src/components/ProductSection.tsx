"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

// Custom SVGs for specs to match the screenshot exactly
const CASIcon = () => (
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="7" y1="9" x2="17" y2="9" />
    <path d="M9 19h6" />
    <path d="M7 9l-3 6h6l-3-6" />
    <path d="M17 9l-3 6h6l-3-6" />
  </svg>
);

const FormulaIcon = () => (
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="18" r="2.5" fill="none" />
    <circle cx="12" cy="8" r="2.5" fill="none" />
    <circle cx="18" cy="18" r="2.5" fill="none" />
    <line x1="7.7" y1="16.2" x2="10.3" y2="9.8" />
    <line x1="13.7" y1="9.8" x2="16.3" y2="16.2" />
  </svg>
);

const ThermometerIcon = () => (
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
  </svg>
);

const DropletIcon = () => (
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const FlaskIcon = () => (
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12" />
    <path d="M10 3v5L4 19A2 2 0 0 0 5.8 21h12.4a2 2 0 0 0 1.8-2L14 8V3" />
  </svg>
);

const StorageIcon = () => (
  <svg className="w-5 h-5 text-[#eab308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 11l2 2 4-4" />
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

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#000000] text-white font-sans overflow-hidden flex items-center px-8 md:px-16 lg:px-24"
    >
      {/* Main Content Area - Restricted Width to match screenshot (~58% width, aligned left) */}
      <div className="max-w-[900px] w-full mr-auto flex flex-col justify-center py-8 z-10 relative">
        
        {/* Title & Subtitle Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-10"
        >
          <h2 className="font-serif text-[42px] sm:text-[52px] md:text-[60px] font-medium leading-[1.08] tracking-tight">
            <span className="text-white block">Synthetic Curcumin</span>
            <span className="text-[#eab308] block">Specifications</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
            <span className="text-[#eab308] font-semibold">ISO-certified</span> synthetic curcumin available in multiple purity grades for food, pharma, cosmetics, and research applications.
          </p>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-28 gap-y-0 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {leftSpecs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-5 py-5 ${
                  spec.hasDivider ? "border-b border-[#eab308]/15" : ""
                }`}
              >
                <div className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#eab308] text-[#eab308] flex-shrink-0 mt-1">
                  {spec.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#eab308] font-sans text-xs md:text-sm font-medium tracking-wide">
                    {spec.label}
                  </span>
                  <div className="text-white font-sans text-base md:text-lg font-normal leading-snug mt-1">
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
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-5 py-5 ${
                  spec.hasDivider ? "border-b border-[#eab308]/15" : ""
                }`}
              >
                <div className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[#eab308] text-[#eab308] flex-shrink-0 mt-1">
                  {spec.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#eab308] font-sans text-xs md:text-sm font-medium tracking-wide">
                    {spec.label}
                  </span>
                  <div className="text-white font-sans text-base md:text-lg font-normal leading-snug mt-1">
                    {spec.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
