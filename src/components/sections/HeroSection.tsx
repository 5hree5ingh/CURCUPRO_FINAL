"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import ShinyText from "@/components/ui/ShinyText";

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
      <ShinyText
        text={percentage}
        speed={2.5}
        delay={0}
        color="#9c6312"
        shineColor="#f0c060"
        spread={100}
        direction="left"
        yoyo={false}
        pauseOnHover={false}
        disabled={false}
        className={`absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isLongText ? 'text-[8px] md:text-[9.5px]' : 'text-[10px] md:text-xs'} font-bold tracking-tight font-sans whitespace-nowrap`}
      />
    </div>
  );
};

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-root-container");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ScrollSpy to track active section
  useEffect(() => {
    const sectionIds = [
      "hero-root-container",
      "about",
      "product-range",
      "applications",
      "resources",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section occupies the sweet spot of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const purityMetrics = [
    { value: "99.5%", label: "Purity (HPLC)" },
    { value: "0.0%", label: "Batch variation" },
    { value: "365", label: "Days supply" },
    { value: "<1 ppm", label: "Heavy metals" },
  ];

  return (
    <section
      id="hero-root-container"
      className="min-h-dvh w-full max-w-full bg-[#f4ebd9] text-[#1a1105] font-sans flex flex-col justify-start relative select-none pt-14 md:pt-16"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Desktop hero image */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src="/images/hero-bg.webp"
            alt="Curcupure product background"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 100vw"
            className="object-cover object-right"
          />
        </div>
        {/* Mobile hero image */}
        <div className="block md:hidden relative w-full h-full">
          <Image
            src="/images/hero-mobile.webp"
            alt="Curcupure product background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 0vw"
            className="object-cover object-center"
          />
        </div>
        {/* Gradient overlay for text readability - only on desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#f4ebd9] from-[30%] via-[#f4ebd9]/70 via-[42%] to-transparent to-[55%]" />
        {/* Subtle mobile overlay */}
        <div className="block md:hidden absolute inset-0 bg-[#f4ebd9]/10" />
      </div>

      {/* Ambient warm glow behind text */}
      <div className="absolute top-[20%] left-[8%] w-[500px] h-[500px] bg-[#b0741a]/6 rounded-full blur-[60px] pointer-events-none z-0" />

      {/* Header / Navigation bar — STICKY */}
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 z-[60] px-5 py-3 md:px-16 lg:px-24 md:py-5 flex items-center justify-between transition-all duration-700 ${
          scrolled
            ? "py-2.5 md:py-3.5 backdrop-blur-2xl"
            : ""
        }`}
        style={scrolled ? {
          background: 'linear-gradient(180deg, rgba(244,235,217,0.45) 0%, rgba(244,235,217,0.15) 100%)',
          borderBottom: '1px solid rgba(208,163,78,0.08)',
          boxShadow: '0 4px 30px rgba(26,17,5,0.03)',
        } : undefined}
      >
        <div id="brand-logo-group" className="flex items-center">
          <a href="#hero-root-container" className="block">
            <Image
              src="/images/curcumex_logo.png"
              alt="Curcumex"
              width={160}
              height={40}
              priority
              className="w-auto"
              style={{ height: 'clamp(32px, 2.5vw, 40px)', width: 'auto' }}
            />
          </a>
        </div>

        <nav id="navbar-menu-items" className="hidden md:flex items-center space-x-10 text-[15px] font-medium tracking-wide absolute left-1/2 -translate-x-1/2">
          {[
            { id: "hero-root-container", label: "Home", href: "#hero-root-container" },
            { id: "about", label: "Why Synthetic", href: "#about" },
            { id: "product-range", label: "Products", href: "#product-range" },
            { id: "applications", label: "Applications", href: "#applications" },
            { id: "resources", label: "Resources", href: "#resources" },
            { id: "contact", label: "Contact", href: "#contact" },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 group cursor-pointer transition-colors duration-300 ${
                  isActive ? "text-[#b0741a] font-semibold" : "text-[#3d3225] hover:text-[#b0741a]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#b0741a] rounded-full transition-transform duration-300 origin-center ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div id="header-actions-mobile" className="flex items-center space-x-3 md:hidden">
          {/* Mobile-only CTA button */}
          <a
            id="header-cta-btn-mobile"
            href="#contact"
            className="px-2.5 py-1.5 bg-[#bf801d] hover:bg-[#a36b15] active:scale-98 text-white rounded-md font-sans font-semibold text-[9px] tracking-normal uppercase transition-all duration-300 shadow-[0_2px_4px_rgba(191,128,29,0.12)] cursor-pointer text-center inline-block"
          >
            BULK QUOTE
          </a>

          {/* Menu / Close toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative flex items-center justify-center w-9 h-9 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <Menu
              size={22}
              strokeWidth={2}
              className={`absolute text-[#1a1105] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={22}
              strokeWidth={2}
              className={`absolute text-[#b0741a] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Premium Mobile Navigation Drawer ── */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop blur overlay */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(180deg, rgba(244,235,217,0.92) 0%, rgba(237,228,207,0.96) 40%, rgba(230,218,192,0.98) 100%)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          }}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Ambient golden glow */}
        <div
          className={`absolute top-[15%] right-[-10%] w-[300px] h-[300px] rounded-full pointer-events-none transition-opacity duration-700 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(176,116,26,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Navigation links */}
        <nav className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          {[
            { id: "hero-root-container", label: "Home", href: "#hero-root-container" },
            { id: "about", label: "Why Synthetic", href: "#about" },
            { id: "product-range", label: "Products", href: "#product-range" },
            { id: "applications", label: "Applications", href: "#applications" },
            { id: "resources", label: "Resources", href: "#resources" },
            { id: "contact", label: "Contact", href: "#contact" },
          ].map((link, i) => (
            <div key={link.href} className="w-full max-w-[280px]">
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-4 text-center font-serif text-[22px] font-medium tracking-wide transition-all ${
                  mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  color: activeSection === link.id ? "#b0741a" : "#1a1105",
                  fontWeight: activeSection === link.id ? "600" : undefined,
                  transitionDelay: mobileMenuOpen ? `${150 + i * 60}ms` : "0ms",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span className="hover:text-[#b0741a] transition-colors duration-300">
                  {link.label}
                </span>
              </a>
              {i < 5 && (
                <div
                  className={`mx-auto h-[1px] transition-all ${
                    mobileMenuOpen ? "opacity-100 w-full" : "opacity-0 w-0"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(208,163,78,0.35), transparent)",
                    transitionDelay: mobileMenuOpen ? `${200 + i * 60}ms` : "0ms",
                    transitionDuration: "600ms",
                  }}
                />
              )}
            </div>
          ))}

          {/* Mobile CTA in drawer */}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`mt-8 px-8 py-3 bg-gradient-to-r from-[#b0741a] to-[#965e0f] text-white rounded-lg font-sans font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(176,116,26,0.18)] active:scale-95 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: mobileMenuOpen ? "550ms" : "0ms",
              transitionDuration: "500ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            REQUEST BULK QUOTE
          </a>
        </nav>
      </div>

      {/* Main Hero Body */}
      <main id="hero-main-layout" className="flex-1 w-full px-5 sm:px-10 md:px-18 lg:px-26 py-4 md:py-6 flex flex-col justify-between md:justify-center z-10 relative">
        <div className="max-w-[760px] text-left flex flex-col pt-6 md:pt-0">

          <motion.p
            id="hero-subtitle-caps"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#b0741a] text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4 selection:bg-[#b0741a]/30"
          >
            The Reliable Alternative to Chinese Curcumin
          </motion.p>

          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 20 }}
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
            initial={{ opacity: 0, y: 16 }}
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
                className="badge-shine border border-[#d8c9a8]/60 bg-[#ede4cf]/70 backdrop-blur-[6px] hover:border-[#b0741a]/50 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all duration-500 group hover:shadow-[0_12px_30px_rgba(176,116,26,0.08)] hover:-translate-y-1 cursor-default"
                style={{ '--badge-delay': `${i * 0.7}s` } as React.CSSProperties}
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-row items-center gap-6 mt-2"
          >
            <a
              id="cta-btn-request-quote"
              href="#contact"
              className="group/btn px-8 py-3 bg-gradient-to-r from-[#b0741a] to-[#965e0f] hover:from-[#c2842b] hover:to-[#a36513] text-white rounded-lg font-sans font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(176,116,26,0.18)] hover:shadow-[0_6px_24px_rgba(176,116,26,0.3)] cursor-pointer"
            >
              <span>REQUEST BULK QUOTE</span>
              <ChevronRight size={16} strokeWidth={2.5} className="transform group-hover/btn:translate-x-1 transition-transform duration-200" />
            </a>

            <a
              id="cta-btn-download-specs"
              href="#resources"
              className="group/btn px-8 py-3 border border-[#b0741a] hover:bg-[#b0741a]/5 text-[#3d3225] hover:text-[#b0741a] rounded-lg font-sans font-semibold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>DOWNLOAD SPECIFICATION</span>
              <ChevronRight size={16} className="text-[#b0741a] transform group-hover/btn:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
            </a>
          </motion.div>

        </div>

        {/* Mobile purity badges (single row glassmorphic card overlay) */}
        <div
          id="purity-badges-row-mobile"
          className="badge-shine flex md:hidden w-full max-w-full items-stretch justify-between border border-[#e9dec6]/70 bg-[#ede4cf]/50 backdrop-blur-[12px] rounded-[24px] py-4 px-2 mb-6 mt-auto shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-[fadeIn_1s_ease-out_0.5s_both]"
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
