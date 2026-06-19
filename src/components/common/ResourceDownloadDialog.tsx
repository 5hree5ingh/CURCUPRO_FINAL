"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Map resource names to their download paths ─── */
const DOWNLOAD_URLS: Record<string, string> = {
  "Product brochure": "/documents/product-brochure.pdf",
  "Technical dossier": "/documents/technical-dossier.pdf",
  "Sample COA": "/documents/sample-coa.pdf",
  "MSDS / SDS": "/documents/msds-sds.pdf",
  "Application guide": "/documents/application-guide.pdf",
  "Stability data": "/documents/stability-data.pdf",
};

interface ResourceDownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
}

export default function ResourceDownloadDialog({
  isOpen,
  onClose,
  resourceName,
}: ResourceDownloadDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(""); setEmail(""); setPhone(""); setCompany("");
      setSubmitted(false); setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "—",
          grade: `Resource Download: ${resourceName}`,
          message: `Company: ${company}`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [name, email, phone, company, resourceName]);

  const isBrochure = resourceName.toLowerCase().includes("brochure");
  const downloadUrl = DOWNLOAD_URLS[resourceName] || `/documents/${resourceName.toLowerCase().replace(/\s+/g, "-")}.pdf`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0e0a04]/85 backdrop-blur-[8px]" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[780px] flex overflow-hidden rounded-2xl"
            style={{
              boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            {/* ── LEFT: Dark editorial panel ── */}
            <div
              className="hidden sm:flex flex-col justify-between w-[42%] flex-shrink-0 p-8"
              style={{
                background: "linear-gradient(160deg, #1f1408 0%, #160f05 50%, #0f0902 100%)",
                borderRight: "1px solid rgba(176,116,26,0.12)",
              }}
            >
              <div>
                {/* Document icon */}
                <div className="mb-6">
                  <div
                    className="w-14 h-16 rounded-sm flex items-end justify-end relative"
                    style={{
                      background: "linear-gradient(145deg, rgba(176,116,26,0.12) 0%, rgba(140,84,12,0.06) 100%)",
                      border: "1px solid rgba(176,116,26,0.2)",
                    }}
                  >
                    {/* Page corner fold */}
                    <div
                      className="absolute top-0 right-0 w-4 h-4"
                      style={{
                        background: "linear-gradient(225deg, rgba(176,116,26,0.18) 50%, transparent 50%)",
                      }}
                    />
                    {/* Document lines */}
                    <div className="absolute inset-0 p-3 pt-4 flex flex-col gap-1.5">
                      {[60, 85, 75, 90, 50].map((w, i) => (
                        <div
                          key={i}
                          className="h-[2px] rounded-full"
                          style={{
                            width: `${w}%`,
                            background: i === 0
                              ? "rgba(176,116,26,0.35)"
                              : "rgba(244,235,217,0.08)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Document title */}
                <h2
                  className="font-serif text-[22px] leading-snug tracking-tight mb-3"
                  style={{ color: "rgba(244,235,217,0.92)" }}
                >
                  {resourceName}
                </h2>

                <p
                  className="font-sans text-[12px] leading-[1.75]"
                  style={{ color: "rgba(244,235,217,0.4)" }}
                >
                  {isBrochure
                    ? "Product range, specifications, applications, certifications, and company profile."
                    : "Technical specifications, synthesis overview, safety data, stability studies, and regulatory status."}
                </p>
              </div>

              {/* Bottom metadata */}
              <div className="flex items-center gap-4 pt-8 border-t" style={{ borderColor: "rgba(176,116,26,0.1)" }}>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.18em] uppercase" style={{ color: "rgba(176,116,26,0.55)" }}>Format</p>
                  <p className="font-sans text-[11px] mt-0.5" style={{ color: "rgba(244,235,217,0.5)" }}>PDF Document</p>
                </div>
                <div className="w-[1px] h-6" style={{ background: "rgba(176,116,26,0.12)" }} />
                <div>
                  <p className="font-sans text-[9px] tracking-[0.18em] uppercase" style={{ color: "rgba(176,116,26,0.55)" }}>Access</p>
                  <p className="font-sans text-[11px] mt-0.5" style={{ color: "rgba(244,235,217,0.5)" }}>Instant download</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Light form panel ── */}
            <div
              className="flex-1 flex flex-col relative p-7 sm:p-9"
              style={{
                background: "linear-gradient(160deg, #fdfaf5 0%, #f9f4e8 100%)",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                style={{ color: "rgba(92,74,50,0.4)" }}
                aria-label="Close"
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(176,116,26,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>

              {submitted ? (
                /* ── SUCCESS: Instant download state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col justify-center h-full py-8 items-center text-center"
                >
                  {/* Animated check circle */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: "linear-gradient(135deg, rgba(176,116,26,0.1) 0%, rgba(208,143,48,0.08) 100%)",
                      border: "1.5px solid rgba(176,116,26,0.25)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#b0741a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>

                  <h3 className="font-serif text-[22px] text-[#1a1105] mb-2 tracking-tight">
                    Your document is ready
                  </h3>
                  <p className="font-sans text-[13px] text-[#5c4a32]/50 leading-relaxed max-w-[260px] mb-8">
                    Thank you for your interest. Click below to download the{" "}
                    <span className="text-[#b0741a] font-medium">{resourceName}</span>.
                  </p>

                  {/* Download button */}
                  <motion.button
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={handleDownload}
                    className="group w-full max-w-[280px] py-[14px] font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #b0741a 0%, #8c540c 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(176,116,26,0.25), 0 2px 8px rgba(176,116,26,0.15)",
                    }}
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v9.5M4 8.5l4 4 4-4M3 14h10" />
                    </svg>
                    <span>Download now</span>
                  </motion.button>

                  <p className="font-sans text-[10px] mt-4" style={{ color: "rgba(92,74,50,0.3)" }}>
                    PDF document · Opens in new tab
                  </p>
                </motion.div>
              ) : (
                /* ── FORM: Lead capture ── */
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-7">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: "rgba(176,116,26,0.7)" }}>
                      Instant access
                    </p>
                    <p className="font-serif text-[20px] text-[#1a1105] leading-snug tracking-tight">
                      Unlock this document
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                    <div className="flex flex-col gap-5 flex-1">

                      {/* Name + Company — side by side */}
                      <div className="grid grid-cols-2 gap-4">
                        <UnderlineField
                          label="Name"
                          type="text"
                          value={name}
                          onChange={setName}
                          placeholder="Full name"
                          required
                        />
                        <UnderlineField
                          label="Company"
                          type="text"
                          value={company}
                          onChange={setCompany}
                          placeholder="Organisation"
                          required
                        />
                      </div>

                      {/* Email */}
                      <UnderlineField
                        label="Business Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="you@company.com"
                        required
                      />

                      {/* Phone */}
                      <UnderlineField
                        label="Phone"
                        type="tel"
                        value={phone}
                        onChange={setPhone}
                        placeholder="+91 XXXXX XXXXX"
                        optional
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="font-sans text-[12px] text-red-600/75 mt-3">{error}</p>
                    )}

                    {/* Submit */}
                    <div className="mt-7">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-[14px] font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 active:scale-[0.98] disabled:opacity-40 cursor-pointer flex items-center justify-center gap-3 rounded-lg"
                        style={{
                          background: submitting ? "rgba(176,116,26,0.5)" : "linear-gradient(135deg, #b0741a 0%, #8c540c 100%)",
                          color: "#fff",
                          boxShadow: submitting ? "none" : "0 4px 20px rgba(176,116,26,0.25)",
                        }}
                      >
                        {submitting ? (
                          <>
                            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Verifying…
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="7" width="10" height="7" rx="1.5" />
                              <path d="M5 7V5a3 3 0 0 1 6 0v2" />
                            </svg>
                            <span>Unlock & download</span>
                          </>
                        )}
                      </button>

                      <p className="text-center font-sans text-[10px] mt-3" style={{ color: "rgba(92,74,50,0.35)" }}>
                        Your info stays private. No spam, ever.
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Underline-style field component ─────────────────────────────────────────
function UnderlineField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  optional,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative flex flex-col">
      <label
        className="font-sans transition-all duration-200"
        style={{
          fontSize: active ? "9px" : "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: focused
            ? "rgba(176,116,26,0.85)"
            : active
            ? "rgba(92,74,50,0.6)"
            : "rgba(92,74,50,0.4)",
          marginBottom: "6px",
        }}
      >
        {label}
        {optional && (
          <span className="ml-1.5 normal-case tracking-normal font-normal" style={{ color: "rgba(92,74,50,0.3)" }}>
            optional
          </span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent outline-none font-sans transition-colors duration-200 pb-2"
        style={{
          fontSize: "13.5px",
          color: "#1a1105",
          borderBottom: `1.5px solid ${focused ? "rgba(176,116,26,0.7)" : "rgba(92,74,50,0.15)"}`,
        }}
      />
    </div>
  );
}
