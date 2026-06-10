import React from "react";
import { ChevronRight, Shield } from "lucide-react";
import { motion } from "motion/react";
import backgroundImage from "../image.png";

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
      {/* Golden Hexagon Outline */}
      <path
        d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        className="text-[#bf801d]"
      />
      {/* Synthesis / Chemical Bonds inside */}
      <path
        d="M32 35 L50 65 L68 40"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#bf801d]"
      />
      {/* Connected chemical nodes */}
      <circle cx="32" cy="35" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="65" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
      <circle cx="68" cy="40" r="5" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

// Custom premium Shield with the inner purity percentage
interface ShieldIconProps {
  percentage: string;
}

const ShieldIcon: React.FC<ShieldIconProps> = ({ percentage }) => {
  return (
    <div className="relative flex items-center justify-center w-16 h-18 text-[#bf801d]" id={`shield-${percentage}`}>
      {/* Custom elegant SVG Shield */}
      <svg
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(176,116,26,0.12)]"
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`shield-grad-${percentage}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f7ecd7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M50 100C50 100 85 82 85 50V20L50 8L15 20V50C15 82 50 100 50 100Z"
          fill={`url(#shield-grad-${percentage})`}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#bf801d]"
        />
      </svg>
      {/* Centered Percentage Value */}
      <span className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold tracking-tight text-[#9c6312] font-sans">
        {percentage}
      </span>
    </div>
  );
};

export default function App() {
  const purityMetrics = [
    { value: "95%", label: "95% Purity" },
    { value: "98%", label: "98% Purity" },
    { value: "99%", label: "99% Purity" },
    { value: "99.5%", label: "99.5% Purity" },
  ];

  return (
    <div
      id="hero-root-container"
      className="h-screen w-full bg-[#f4ebd9] text-[#1a1105] font-sans flex flex-col justify-start relative overflow-hidden select-none"
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={backgroundImage}
          alt="Curcupure product background"
          className="w-full h-full object-contain object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4ebd9] from-[30%] via-[#f4ebd9]/70 via-[42%] to-transparent to-[55%]" />
      </div>

      {/* Ambient warm glow behind text */}
      <div className="absolute top-[20%] left-[8%] w-[500px] h-[500px] bg-[#b0741a]/6 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Header / Navigation bar */}
      <header id="main-navigation-header" className="w-full px-8 md:px-16 lg:px-24 py-8 flex items-center justify-between z-10 relative">
        {/* Brand Logo & Title */}
        <div id="brand-logo-group" className="flex items-center space-x-4">
          <HexagonLogo />
          <div className="flex flex-col select-none leading-none">
            <span className="text-xl md:text-2xl font-bold tracking-[0.05em] text-[#1a1105]">
              CURCUMIN
            </span>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.38em] text-[#b0741a] mt-1 uppercase">
              SOLUTIONS
            </span>
          </div>
        </div>

        {/* Navigation Menu — centered horizontally */}
        <nav id="navbar-menu-items" className="hidden md:flex items-center space-x-12 text-[15px] font-medium tracking-wide absolute left-1/2 -translate-x-1/2">
          <div className="relative flex flex-col items-center group cursor-pointer">
            <span className="text-[#b0741a] font-semibold">Home</span>
            <span className="w-8 h-[2px] bg-[#b0741a] mt-1.5 rounded-full" />
          </div>
          <a href="#about" className="relative text-[#3d3225] hover:text-[#b0741a] transition duration-300 py-1 group">
            About Us
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </a>
          <a href="#products" className="relative text-[#3d3225] hover:text-[#b0741a] transition duration-300 py-1 group">
            Products
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </a>
          <a href="#quality" className="relative text-[#3d3225] hover:text-[#b0741a] transition duration-300 py-1 group">
            Quality
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
          </a>
        </nav>

        {/* Mobile menu indicator placeholder */}
        <div className="md:hidden flex items-center space-x-2 text-xs text-[#524434] border border-[#d8ccb8] bg-[#fdfaf4]/40 rounded px-3 py-1 cursor-not-allowed">
          <span>● Options</span>
        </div>
      </header>

      {/* Main Hero Body */}
      <main id="hero-main-layout" className="flex-1 min-h-0 w-full px-10 md:px-18 lg:px-26 py-4 md:py-6 flex flex-col justify-center z-10 relative">
        <div className="max-w-[760px] text-left flex flex-col">

          <motion.p
            id="hero-subtitle-caps"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#b0741a] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 selection:bg-[#b0741a]/30"
          >
            The Reliable Alternative to Chinese Curcumin
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[46px] sm:text-[58px] md:text-[72px] font-medium leading-[1.08] tracking-tight selection:bg-[#b0741a]/20 text-[#1a1105]"
          >
            India's First <br />
            Synthetic <span className="bg-gradient-to-r from-[#b0741a] via-[#d08f30] to-[#8c540c] bg-clip-text text-transparent inline-block">Manufacturer</span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            id="hero-main-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#493c2c]/90 text-base md:text-lg font-sans leading-relaxed mt-5 mb-9 max-w-[560px] selection:bg-[#ebdcb9]"
          >
            Supplying food, pharma, cosmetic and nutraceutical industries with ISO-certified synthetic curcumin.
          </motion.p>

          {/* Grid of Purity Badges */}
          <div
            id="purity-badges-row"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 mr-auto w-full max-w-[620px]"
          >
            {purityMetrics.map((metric, i) => (
              <motion.div
                key={i}
                id={`badge-card-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-[#e2d4b7] bg-white/40 backdrop-blur-[8px] hover:border-[#b0741a]/60 rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all duration-500 group hover:shadow-[0_12px_30px_rgba(176,116,26,0.08)] hover:-translate-y-1 cursor-default"
              >
                <div className="transform group-hover:scale-105 transition-transform duration-300">
                  <ShieldIcon percentage={metric.value} />
                </div>
                <span className="text-xs md:text-sm font-sans font-medium text-[#493c2c] mt-4 tracking-wide group-hover:text-[#1a1105] transition-colors">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            id="cta-action-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-2"
          >
            {/* Primary Request Bulk Quote Button */}
            <button
              id="cta-btn-request-quote"
              className="group/btn px-6 md:px-8 py-4 bg-gradient-to-r from-[#b0741a] to-[#965e0f] hover:from-[#c2842b] hover:to-[#a36513] text-white rounded-lg font-sans font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(176,116,26,0.18)] hover:shadow-[0_6px_24px_rgba(176,116,26,0.3)] cursor-pointer"
            >
              <span>REQUEST BULK QUOTE</span>
              <ChevronRight size={16} strokeWidth={2.5} className="transform group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Secondary Download Button */}
            <button
              id="cta-btn-download-specs"
              className="group/btn px-6 md:px-8 py-4 border border-[#b0741a] hover:bg-[#b0741a]/5 text-[#3d3225] hover:text-[#b0741a] rounded-lg font-sans font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>DOWNLOAD SPECIFICATION</span>
              <ChevronRight size={16} className="text-[#b0741a] transform group-hover/btn:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </button>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
