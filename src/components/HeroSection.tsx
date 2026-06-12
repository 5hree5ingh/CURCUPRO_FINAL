"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

// Pointed-topped hexagon logo with Curcumin synthesis chemical bonds
const HexagonLogo: React.FC = () => {
  return (
    <svg
      id="curcumin-brand-logo"
      className="w-12 h-12 text-[#bf801d]"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        className="text-[#bf801d]"
      />
      <path
        d="M32 35 L50 65 L68 40"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#bf801d]"
      />
      <circle cx="32" cy="35" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="65" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
      <circle cx="68" cy="40" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

interface ShieldIconProps {
  percentage: string;
}

const ShieldIcon: React.FC<ShieldIconProps> = ({ percentage }) => {
  const safeId = percentage.replace(/[^a-zA-Z0-9]/g, "-");
  const isLongText = percentage.length > 4;

  return (
    <div className="relative flex items-center justify-center w-14 h-16 md:w-16 md:h-18 text-[#bf801d] shrink-0" id={`shield-${safeId}`}>
      <svg
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(176,116,26,0.12)]"
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`shield-grad-${safeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f7ecd7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M50 100C50 100 85 82 85 50V20L50 8L15 20V50C15 82 50 100 50 100Z"
          fill={`url(#shield-grad-${safeId})`}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#bf801d]"
        />
      </svg>
      <span className={`absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isLongText ? 'text-[8px] md:text-[9.5px]' : 'text-[10px] md:text-xs'} font-bold tracking-tight text-[#9c6312] font-sans whitespace-nowrap`}>
        {percentage}
      </span>
    </div>
  );
};

export default function HeroSection() {
  const purityMetrics = [
    { value: "99.5%", label: "Purity (HPLC)" },
    { value: "0.0%", label: "Batch variation" },
    { value: "365", label: "Days supply" },
    { value: "<1 ppm", label: "Heavy metals" },
  ];

  return (
    <section
      id="hero-root-container"
      className="min-h-dvh w-full max-w-full bg-[#f4ebd9] text-[#1a1105] font-sans flex flex-col justify-start relative select-none"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="/image.png" />
          <img
            src="/hero-mobile.png"
            alt="Curcupure product background"
            className="w-full h-full object-cover object-center md:object-right"
          />
        </picture>
        {/* Gradient overlay for text readability - only on desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#f4ebd9] from-[30%] via-[#f4ebd9]/70 via-[42%] to-transparent to-[55%]" />
        {/* Subtle mobile overlay */}
        <div className="block md:hidden absolute inset-0 bg-[#f4ebd9]/10" />
      </div>

      {/* Ambient warm glow behind text */}
      <div className="absolute top-[20%] left-[8%] w-[500px] h-[500px] bg-[#b0741a]/6 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Header / Navigation bar */}
      <header
        id="main-navigation-header"
        className="w-full z-10 relative px-4 py-3 md:px-16 lg:px-24 md:py-5 max-w-[calc(100%-2rem)] md:max-w-full mx-auto md:mx-0 mt-4 md:mt-0 bg-[#fbf7ee]/95 md:bg-transparent border border-[#e5dcd0] md:border-none rounded-[20px] md:rounded-none shadow-[0_4px_20px_rgba(176,116,26,0.05)] md:shadow-none backdrop-blur-md md:backdrop-blur-none flex items-center justify-between"
      >
        <div id="brand-logo-group" className="flex items-center space-x-3 md:space-x-4">
          <div className="scale-85 md:scale-100 origin-left flex items-center justify-center">
            <svg
              id="curcumin-brand-logo"
              className="w-9 h-9 md:w-12 md:h-12 text-[#bf801d]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
                className="text-[#bf801d]"
              />
              <path
                d="M32 35 L50 65 L68 40"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#bf801d]"
              />
              <circle cx="32" cy="35" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="65" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
              <circle cx="68" cy="40" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col select-none leading-none">
            <span className="text-base md:text-2xl font-bold tracking-[0.05em] text-[#1a1105]">
              CURCUMIN
            </span>
            <span className="text-[9px] md:text-xs font-semibold tracking-[0.38em] text-[#b0741a] mt-0.5 md:mt-1 uppercase">
              SOLUTIONS
            </span>
          </div>
        </div>

        <nav id="navbar-menu-items" className="hidden md:flex items-center space-x-12 text-[15px] font-medium tracking-wide absolute left-1/2 -translate-x-1/2">
          <div className="relative flex flex-col items-center group cursor-pointer">
            <span className="text-[#b0741a] font-semibold">Home</span>
            <span className="w-8 h-[2px] bg-[#b0741a] mt-1.5 rounded-full" />
          </div>
          <a href="#products" className="relative text-[#3d3225] hover:text-[#b0741a] transition duration-300 py-1 group">
            Products
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </a>
          <a href="#about" className="relative text-[#3d3225] hover:text-[#b0741a] transition duration-300 py-1 group">
            About Us
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </a>
          <a href="#quality" className="relative text-[#3d3225] hover:text-[#b0741a] transition duration-300 py-1 group">
            Quality
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </a>
        </nav>

        <div id="header-actions-mobile" className="flex items-center space-x-3 md:hidden">
          {/* Mobile-only CTA button */}
          <button
            id="header-cta-btn-mobile"
            className="px-2 py-1 bg-[#bf801d] hover:bg-[#a36b15] active:scale-98 text-white rounded-md font-sans font-semibold text-[9px] tracking-normal uppercase transition-all duration-300 shadow-[0_2px_4px_rgba(191,128,29,0.12)] cursor-pointer"
          >
            BULK QUOTE
          </button>

          <button className="flex flex-col items-center justify-center w-8 h-8 gap-[4px] cursor-pointer" aria-label="Open menu">
            <span className="w-5 h-[2px] bg-[#1a1105] rounded-full" />
            <span className="w-5 h-[2px] bg-[#1a1105] rounded-full" />
            <span className="w-5 h-[2px] bg-[#1a1105] rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Hero Body */}
      <main id="hero-main-layout" className="flex-1 w-full px-5 sm:px-10 md:px-18 lg:px-26 py-4 md:py-6 flex flex-col justify-between md:justify-center z-10 relative">
        <div className="max-w-[760px] text-left flex flex-col pt-6 md:pt-0">

          <motion.p
            id="hero-subtitle-caps"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#b0741a] text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 selection:bg-[#b0741a]/30"
          >
            The Reliable Alternative to Chinese Curcumin
          </motion.p>

          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-medium leading-[1.12] md:leading-[1.08] tracking-tight selection:bg-[#b0741a]/20 text-[#1a1105]"
            style={{ fontSize: 'clamp(34px, 5vw + 4px, 72px)' }}
          >
            <span className="block">
              The Curcumin{" "}
              <span className="text-[#bf801d] md:bg-gradient-to-r md:from-[#b0741a] md:via-[#d08f30] md:to-[#8c540c] md:bg-clip-text md:text-transparent">
                Purity
              </span>
            </span>
            <span className="block">Every Formulator Demands</span>
          </motion.h1>

          <motion.p
            id="hero-main-description"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block text-[#493c2c]/90 font-sans leading-relaxed mt-2 mb-4 max-w-[560px] selection:bg-[#ebdcb9]"
            style={{ fontSize: 'clamp(13px, 1.2vw + 4px, 18px)' }}
          >
            Supplying food, pharma, cosmetic and nutraceutical industries with ISO-certified synthetic curcumin.
          </motion.p>

          {/* Desktop purity badges (grid layout) */}
          <div
            id="purity-badges-row-desktop"
            className="hidden md:grid grid-cols-4 gap-3 mb-5 mr-auto w-full max-w-[620px]"
          >
            {purityMetrics.map((metric, i) => (
              <motion.div
                key={i}
                id={`badge-card-desktop-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.5 + i * 0.18, ease: "easeOut" }}
                className="border border-[#d8c9a8]/60 bg-[#ede4cf]/70 backdrop-blur-[6px] hover:border-[#b0741a]/50 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-500 group hover:shadow-[0_12px_30px_rgba(176,116,26,0.08)] hover:-translate-y-1 cursor-default"
              >
                <div className="transform group-hover:scale-105 transition-transform duration-300">
                  <ShieldIcon percentage={metric.value} />
                </div>
                <span className="text-xs md:text-sm font-sans font-medium text-[#493c2c] mt-2 tracking-wide group-hover:text-[#1a1105] transition-colors">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            id="cta-action-container"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-row items-center gap-6 mt-2"
          >
            <button
              id="cta-btn-request-quote"
              className="group/btn px-8 py-3 bg-gradient-to-r from-[#b0741a] to-[#965e0f] hover:from-[#c2842b] hover:to-[#a36513] text-white rounded-lg font-sans font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(176,116,26,0.18)] hover:shadow-[0_6px_24px_rgba(176,116,26,0.3)] cursor-pointer"
            >
              <span>REQUEST BULK QUOTE</span>
              <ChevronRight size={16} strokeWidth={2.5} className="transform group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              id="cta-btn-download-specs"
              className="group/btn px-8 py-3 border border-[#b0741a] hover:bg-[#b0741a]/5 text-[#3d3225] hover:text-[#b0741a] rounded-lg font-sans font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>DOWNLOAD SPECIFICATION</span>
              <ChevronRight size={16} className="text-[#b0741a] transform group-hover/btn:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </button>
          </motion.div>

        </div>

        {/* Mobile purity badges (single row glassmorphic card overlay) */}
        <div
          id="purity-badges-row-mobile"
          className="flex md:hidden w-full max-w-full items-stretch justify-between border border-[#e9dec6]/70 bg-[#ede4cf]/50 backdrop-blur-[12px] rounded-[24px] py-4 px-2 mb-6 mt-auto shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-[fadeIn_1s_ease-out_0.5s_both]"
        >
          {purityMetrics.map((metric, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-between text-center [&:not(:last-child)]:border-r border-[#d9cbb2]/60 px-1"
            >
              <div className="transform scale-90 shrink-0">
                <ShieldIcon percentage={metric.value} />
              </div>
              <div className="flex items-center justify-center min-h-[28px] mt-2 w-full">
                <span className="text-[9px] font-sans font-semibold text-[#493c2c] tracking-wide leading-tight">
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
