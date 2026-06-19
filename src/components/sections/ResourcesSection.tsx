"use client";

import React, { useRef, useMemo, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import ResourceDownloadDialog from "@/components/common/ResourceDownloadDialog";

/* ─── Icons ─── */

const BrochureIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#b0741a" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h6M8 15h4" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const DossierIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#b0741a" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CertificateIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15l2 2 4-4" strokeWidth="1.5" />
  </svg>
);

const SafetyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4M12 16h.01" strokeWidth="1.5" />
  </svg>
);

const GuideIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const StabilityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ─── Data ─── */

const featuredDocs = [
  {
    icon: <BrochureIcon />,
    title: "Product brochure",
    pages: "8 pages",
    description: "Product range, specifications, applications, certifications, and company profile.",
    cta: "Download brochure",
    meta: "PDF · 2.4 MB",
    docLines: 7,
  },
  {
    icon: <DossierIcon />,
    title: "Technical dossier",
    pages: "24 pages",
    description: "Specs, safety data, stability studies, synthesis overview, regulatory status.",
    cta: "Download dossier",
    meta: "PDF · 5.8 MB",
    docLines: 10,
  },
];

const quickDownloads = [
  { icon: <CertificateIcon />, title: "Sample COA", subtitle: "Batch certificate", cta: "Download" },
  { icon: <SafetyIcon />, title: "MSDS / SDS", subtitle: "Safety data sheet", cta: "Download" },
  { icon: <GuideIcon />, title: "Application guide", subtitle: "Formulation tips", cta: "Download" },
  { icon: <StabilityIcon />, title: "Stability data", subtitle: "ICH summary", cta: "Download" },
];

/* ─── Stable pseudo-random width seeder (deterministic, no Math.random in render) ─── */
function seededWidth(seed: number): number {
  // Simple LCG — same seed always gives same value, no SSR/client mismatch
  const x = Math.sin(seed + 1) * 10000;
  return 60 + (x - Math.floor(x)) * 30;
}

/* ─── Decorative Document Preview ─── */
function DocPreview({ lineCount }: { lineCount: number }) {
  // Pre-compute widths once; seededWidth is pure/deterministic so SSR and client agree
  const lineWidths = useMemo(
    () =>
      Array.from({ length: lineCount }, (_, i) => {
        if (i === 0) return '45%';
        if (i === lineCount - 1) return '30%';
        return `${seededWidth(i * lineCount).toFixed(4)}%`;
      }),
    [lineCount]
  );

  return (
    <div className="w-full aspect-[4/3] rounded-xl relative overflow-hidden mb-4"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(252,248,238,0.5) 100%)',
        border: '1px solid rgba(208, 163, 78, 0.12)',
        boxShadow: '0 2px 8px rgba(176,116,26,0.04) inset',
      }}
    >
      {/* Decorative page corner fold */}
      <div className="absolute top-0 right-0 w-8 h-8"
        style={{
          background: 'linear-gradient(225deg, #f4ebd9 50%, rgba(208,163,78,0.15) 50%)',
        }}
      />

      {/* Document lines */}
      <div className="p-4 pt-5 flex flex-col gap-[6px]">
        {lineWidths.map((w, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full"
            style={{
              width: w,
              background: i === 0
                ? 'linear-gradient(90deg, rgba(176,116,26,0.25), rgba(176,116,26,0.08))'
                : 'rgba(176,116,26,0.06)',
            }}
          />
        ))}
      </div>

      {/* Bottom stamp/seal decoration */}
      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full opacity-[0.08]"
        style={{
          border: '1.5px solid #b0741a',
          background: 'radial-gradient(circle, rgba(176,116,26,0.08) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

/* ─── Featured Document Card — tall, vertical ─── */
function FeaturedDocCard({ doc, index, onDownloadClick }: { doc: typeof featuredDocs[0]; index: number; onDownloadClick: () => void }) {
  return (
    <motion.div
      onClick={onDownloadClick}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
      style={{
        background: 'linear-gradient(160deg, rgba(255,253,248,0.98) 0%, rgba(252,248,238,0.95) 35%, rgba(245,236,215,0.88) 70%, rgba(237,224,196,0.82) 100%)',
        border: '1px solid rgba(208, 163, 78, 0.28)',
        boxShadow: '0 1px 0 rgba(255,255,255,1) inset, 0 8px 24px rgba(176,116,26,0.08), 0 4px 12px rgba(176,116,26,0.05), 0 20px 50px rgba(140,84,12,0.04)',
      }}
    >
      {/* Top gold accent */}
      <div className="absolute top-0 left-5 right-5 h-[2px] pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(218,175,85,0.6) 30%, rgba(232,196,108,0.8) 50%, rgba(218,175,85,0.6) 70%, transparent)' }}
      />

      {/* Inner shine */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,252,240,0.12) 35%, transparent 100%)',
        borderRadius: 'inherit',
      }} />

      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
        {/* Document preview illustration */}
        <DocPreview lineCount={doc.docLines} />

        {/* Title */}
        <div className="mb-1.5">
          <h3 className="font-serif text-[18px] sm:text-[20px] font-medium text-[#1a1105] tracking-tight leading-tight">
            {doc.title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-sans text-[12px] sm:text-[13px] leading-[1.6] text-[#5c4a32]/55 mb-4 flex-1">
          {doc.description}
        </p>

        <div className="flex items-center pt-3 border-t border-[#b0741a]/[0.08]">
          <span className="inline-flex items-center gap-2 font-sans text-[12px] sm:text-[13px] font-semibold text-[#b0741a] tracking-wide group-hover:text-[#8c540c] transition-colors duration-300">
            {doc.cta}
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transform group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v9.5M4 8.5l4 4 4-4M3 14h10" />
            </svg>
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 12px 32px rgba(176,116,26,0.14), 0 6px 16px rgba(176,116,26,0.08), 0 0 0 1px rgba(218,175,85,0.12)' }}
      />
    </motion.div>
  );
}

/* ─── Main Section ─── */

export default function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState("");

  const openDialog = useCallback((resourceName: string) => {
    setSelectedResource(resourceName);
    setDialogOpen(true);
  }, []);

  return (
    <>
    <section
      id="resources"
      ref={sectionRef}
      className="relative w-full min-h-screen font-sans overflow-hidden py-16 lg:py-20 flex flex-col justify-center"
      style={{ background: '#f4ebd9' }}
    >
      {/* Warm ambient glows */}
      <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-[#b0741a]/4 rounded-full blur-[70px] pointer-events-none z-0" />
      <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-[#d08f30]/3 rounded-full blur-[60px] pointer-events-none z-0" />
      <div className="absolute top-[20%] left-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center">

        {/* Section Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6 md:mb-8 lg:mb-7"
        >
          <p className="text-[#b0741a] text-[10px] sm:text-xs tracking-[0.3em] font-semibold uppercase font-sans mb-1.5">
            Resources
          </p>
          <div className="flex items-center justify-center gap-3 mb-3" aria-hidden="true">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#b0741a]/50" />
            <div className="w-1.5 h-1.5 rounded-full border border-[#b0741a] bg-transparent" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#b0741a]/50" />
          </div>
          <h2 className="font-serif text-[30px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-medium leading-[1.08] tracking-tight text-[#1a1105]">
            Download{" "}
            <span className="text-[#bf801d] md:bg-gradient-to-r md:from-[#b0741a] md:via-[#d08f30] md:to-[#8c540c] md:bg-clip-text md:text-transparent italic">
              technical
            </span>{" "}
            resources.
          </h2>

        </motion.div>

        {/* 3-Column Layout: 2 tall featured docs + 1 stacked quick downloads column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">

          {/* Column 1 & 2: Featured document cards with doc preview */}
          {featuredDocs.map((doc, i) => (
            <FeaturedDocCard key={i} doc={doc} index={i} onDownloadClick={() => openDialog(doc.title)} />
          ))}

          {/* Column 3: Quick downloads — stacked vertically */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Column label */}
            <div className="flex items-center gap-2.5 mb-1 px-1">
              <div className="w-5 h-[1.5px] rounded-full" style={{ background: 'linear-gradient(90deg, #b0741a, transparent)' }} />
              <span className="font-sans text-[9px] tracking-[0.22em] font-bold uppercase text-[#b0741a]/40">
                Quick downloads
              </span>
            </div>

            {/* 4 stacked items */}
            {quickDownloads.map((item, i) => (
              <motion.div
                key={i}
                onClick={() => openDialog(item.title)}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-400 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,253,248,0.95) 0%, rgba(252,248,238,0.88) 50%, rgba(245,236,215,0.78) 100%)',
                  border: '1px solid rgba(208, 163, 78, 0.18)',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.85) inset, 0 3px 10px rgba(176,116,26,0.04)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-[1.06] transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,253,248,0.98), rgba(252,244,226,0.8))',
                    border: '1px solid rgba(208, 163, 78, 0.22)',
                    boxShadow: '0 2px 6px rgba(176,116,26,0.06), 0 1px 0 rgba(255,255,255,0.9) inset',
                  }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans text-[13px] font-semibold text-[#1a1105]/75 group-hover:text-[#1a1105] leading-tight tracking-tight transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[10px] text-[#5c4a32]/35 mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>

                {/* Download arrow */}
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[#b0741a]/40 group-hover:text-[#b0741a] group-hover:bg-[#b0741a]/[0.06] transition-all duration-300">
                  <svg viewBox="0 0 16 16" className="w-3 h-3 transform group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v8M5 8l3 3 3-3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Download lead-capture dialog */}
    <ResourceDownloadDialog
      isOpen={dialogOpen}
      onClose={() => setDialogOpen(false)}
      resourceName={selectedResource}
    />
    </>
  );
}
