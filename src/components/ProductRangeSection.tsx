"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight } from "lucide-react";

const products = [
  {
    name: "Curcumex Pharma",
    purity: "99.5%+",
    purityLabel: "purity",
    tagline: "Pharmaceutical precision.",
    description:
      "For pharmaceutical APIs, regulated nutraceuticals, and clinical formulations.",
    badge: null,
    accent: "#8c540c",
    tier: "PHARMA GRADE",
  },
  {
    name: "Curcumex Pure",
    purity: "99.0%+",
    purityLabel: "purity",
    tagline: "The industry standard.",
    description:
      "For supplements, functional foods, and quality-conscious formulations.",
    badge: "MOST REQUESTED",
    accent: "#b0741a",
    tier: "NUTRACEUTICAL GRADE",
  },
  {
    name: "Curcumex Color",
    purity: "95.0%+",
    purityLabel: "curcuminoids",
    tagline: "Vibrant by nature.",
    description:
      "For food colorant (E100), beverages, and high-volume industrial use.",
    badge: null,
    accent: "#d08f30",
    tier: "FOOD GRADE",
  },
];

export default function ProductRangeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="product-range"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#1a1105] text-[#f4ebd9] font-sans overflow-visible py-20 md:py-28"
    >
      {/* Ambient glows */}
      <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-[#b0741a]/5 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#d08f30]/4 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 text-center"
        >
          {/* Main headline — single line */}
          <h2 className="font-serif text-[36px] sm:text-[50px] md:text-[62px] lg:text-[72px] font-medium leading-[1.06] tracking-tight">
            <span className="text-[#f4ebd9]">Three grades. </span>
            <span className="bg-gradient-to-r from-[#d08f30] via-[#b0741a] to-[#8c540c] bg-clip-text text-transparent">
              One standard.
            </span>
          </h2>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute -top-3 left-8 z-20">
                  <span className="inline-block bg-gradient-to-r from-[#b0741a] to-[#d08f30] text-[#1a1105] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full shadow-[0_4px_16px_rgba(176,116,26,0.3)]">
                    {product.badge}
                  </span>
                </div>
              )}

              <div
                className={`relative h-full border border-[#f4ebd9]/8 rounded-2xl p-8 lg:p-10 flex flex-col transition-all duration-700 cursor-default
                  bg-gradient-to-b from-[#f4ebd9]/[0.04] to-transparent
                  hover:border-[#b0741a]/25 hover:bg-[#f4ebd9]/[0.06]
                  hover:shadow-[0_20px_60px_rgba(176,116,26,0.08)]
                  group-hover:-translate-y-1`}
              >
                {/* Decorative top accent line */}
                <div
                  className="absolute top-0 left-8 right-8 h-[1px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)`,
                  }}
                />

                {/* Tier label */}
                <span className="text-[#f4ebd9]/25 text-[9px] font-semibold tracking-[0.25em] uppercase mb-4">
                  {product.tier}
                </span>

                {/* Purity number — the hero of the card */}
                <div className="mb-4">
                  <span
                    className="font-serif text-[42px] sm:text-[50px] lg:text-[56px] font-medium leading-none tracking-tight"
                    style={{
                      background: `linear-gradient(135deg, #f4ebd9, ${product.accent})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {product.purity}
                  </span>
                  <span className="block text-[#f4ebd9]/30 text-xs font-sans tracking-wider uppercase mt-1">
                    {product.purityLabel}
                  </span>
                </div>

                {/* Product name */}
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#f4ebd9] mb-2 tracking-tight">
                  {product.name}
                </h3>

                {/* Tagline */}
                <p className="text-[#b0741a] text-sm font-medium font-sans mb-3">
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-[#f4ebd9]/45 text-sm font-sans leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                {/* CTA link */}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 text-[#b0741a] text-sm font-semibold font-sans tracking-wide group-hover:text-[#d08f30] transition-colors duration-300 cursor-pointer">
                    View details
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="transform group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-[#b0741a]/60 to-transparent hidden sm:block" />
          <p className="text-[#f4ebd9]/25 text-xs sm:text-sm font-sans tracking-wide">
            All grades manufactured under{" "}
            <span className="text-[#b0741a]/60">ISO 9001:2015</span> &{" "}
            <span className="text-[#b0741a]/60">cGMP</span> certification.
            Custom purity available on request.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
