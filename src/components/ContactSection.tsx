"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("pure");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ── Google Apps Script Web App — logs to Sheets + sends email ────────────
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz84wUnx9OjAUvYJ8aV3S9TFgoEbrkAUM6psqxIyA5_NSAjfjCzmmrJCY9voU9LuPUqyA/exec";
  // ──────────────────────────────────────────────────────────────────────────

  const gradeLabel: Record<string, string> = {
    pharma: "Curcumex Pharma (99.5%+ Pharma Grade)",
    pure:   "Curcumex Pure (99.0%+ Nutraceutical Grade)",
    color:  "Curcumex Color (95.0%+ Food Grade)",
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          phone,
          grade: gradeLabel[grade] ?? grade,
          message: message || "—",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us directly.");
      }
    } catch {
      setError("Network error. Please email us directly at info@aurvaay.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative w-full font-sans overflow-hidden bg-[#1a1105]"
      >
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(176,116,26,0.07) 0%, transparent 60%)' }}
        />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(208,143,48,0.04) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}
        />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-24 lg:pt-32 pb-16 lg:pb-20">

          {/* ── Centered Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 lg:mb-14"
          >

            <h2 className="font-serif text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-medium leading-[1.06] tracking-tight text-[#f4ebd9]">
              Request your{" "}
              <span className="bg-gradient-to-r from-[#d08f30] via-[#b0741a] to-[#8c540c] bg-clip-text text-transparent italic">
                sample.
              </span>
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] text-[#f4ebd9]/35 mt-4 max-w-[460px] mx-auto leading-relaxed">
              Evaluate our curcumin quality firsthand before you commit.
            </p>
          </motion.div>

          {/* ── Contact Info Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-14 lg:mb-18 max-w-[750px] mx-auto"
          >
            {/* Email */}
            <a href="mailto:info@aurvaay.com" className="group flex items-center gap-2.5 sm:px-6 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#d0a34e]/50 group-hover:text-[#d0a34e] transition-colors duration-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="font-sans text-[13px] text-[#f4ebd9]/50 group-hover:text-[#f4ebd9]/80 transition-colors duration-300 tracking-tight">
                info@aurvaay.com
              </span>
            </a>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-4 bg-[#f4ebd9]/8 flex-shrink-0" />

            {/* Phone */}
            <a href="tel:+919045101186" className="group flex items-center gap-2.5 sm:px-6 hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#d0a34e]/50 group-hover:text-[#d0a34e] transition-colors duration-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="font-sans text-[13px] text-[#f4ebd9]/50 group-hover:text-[#f4ebd9]/80 transition-colors duration-300 tracking-tight">
                +91 90451 01186
              </span>
            </a>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-4 bg-[#f4ebd9]/8 flex-shrink-0" />

            {/* Address */}
            <div className="flex items-center gap-2.5 sm:px-6">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#d0a34e]/50 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-sans text-[13px] text-[#f4ebd9]/50 tracking-tight">
                India
              </span>
            </div>
          </motion.div>

          {/* ── Form ── */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-12 max-w-[480px] mx-auto"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ border: '1.5px solid rgba(208,163,78,0.35)', background: 'rgba(208,163,78,0.06)' }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#d0a34e]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-serif text-[24px] sm:text-[28px] font-medium text-[#f4ebd9] mb-3 tracking-tight">
                Sample request received
              </h3>
              <p className="font-sans text-[14px] text-[#f4ebd9]/50 leading-relaxed mb-8">
                We&apos;ll ship your sample within 3–5 business days.
              </p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setEmail(""); setPhone(""); setGrade("pure"); setMessage(""); }}
                className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#d0a34e]/50 hover:text-[#d0a34e] transition-colors cursor-pointer"
              >
                Request another →
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="max-w-[700px] mx-auto"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="cx-name" className="cx-label">Name</label>
                  <input id="cx-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="cx-input" />
                </div>
                <div>
                  <label htmlFor="cx-email" className="cx-label">Email</label>
                  <input id="cx-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="cx-input" />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label htmlFor="cx-phone" className="cx-label">Phone</label>
                <input id="cx-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 90451 01186" className="cx-input" />
              </div>

              {/* Product Grade */}
              <div className="mb-5">
                <label className="cx-label">Select Grade</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "pharma", name: "Curcumex Pharma", purity: "99.5%+", tier: "Pharma" },
                    { id: "pure", name: "Curcumex Pure", purity: "99.0%+", tier: "Nutraceutical" },
                    { id: "color", name: "Curcumex Color", purity: "95.0%+", tier: "Food" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrade(g.id)}
                      className={`relative flex flex-col items-center text-center py-3.5 px-2 rounded-xl border transition-all duration-350 cursor-pointer ${
                        grade === g.id
                          ? "border-[#d0a34e]/50 bg-[#d0a34e]/[0.08]"
                          : "border-[#f4ebd9]/[0.08] bg-[#f4ebd9]/[0.02] hover:border-[#f4ebd9]/15 hover:bg-[#f4ebd9]/[0.04]"
                      }`}
                    >
                      <span className={`font-sans text-[18px] sm:text-[20px] font-bold tracking-tight leading-none mb-1 transition-colors duration-300 ${
                        grade === g.id ? "text-[#d0a34e]" : "text-[#f4ebd9]/40"
                      }`}>
                        {g.purity}
                      </span>
                      <span className={`font-sans text-[9px] tracking-[0.1em] uppercase font-semibold transition-colors duration-300 ${
                        grade === g.id ? "text-[#f4ebd9]/60" : "text-[#f4ebd9]/20"
                      }`}>
                        {g.tier} grade
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label htmlFor="cx-msg" className="cx-label">Requirements</label>
                <textarea id="cx-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Target volume, delivery timeline, specific formulation needs..." className="cx-input resize-none" />
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group/s inline-flex items-center justify-center gap-2.5 px-14 py-4 rounded-full font-sans font-semibold text-[11px] tracking-[0.22em] uppercase text-[#1a1105] cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:shadow-[0_8px_32px_rgba(176,116,26,0.3)] active:scale-[0.97]"
                  style={{
                    background: 'linear-gradient(135deg, #d0a34e 0%, #b0741a 60%, #8c540c 100%)',
                    boxShadow: '0 4px 20px rgba(176,116,26,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  <span>{submitting ? "Sending..." : "Request sample"}</span>
                  {!submitting && (
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transform group-hover/s:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  )}
                </button>
                {error && (
                  <p className="mt-4 font-sans text-[12px] text-red-400/80 text-center">{error}</p>
                )}
              </div>

            </motion.form>
          )}
        </div>

        {/* ─── Footer ─── */}
        <div className="relative z-10 border-t border-[#f4ebd9]/[0.06]">
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 py-10 lg:py-14">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 items-center">

              {/* Logo */}
              <div className="flex items-center">
                <a href="#hero-root-container" className="block">
                  <img
                    src="/curcumex_logo.png"
                    alt="Curcumex"
                    className="h-6 sm:h-7 w-auto brightness-0 invert opacity-45"
                  />
                </a>
              </div>

              {/* Nav */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6 md:gap-x-7">
                {[
                  { label: "Home", href: "#hero-root-container" },
                  { label: "Why Synthetic", href: "#about" },
                  { label: "Products", href: "#product-range" },
                  { label: "Applications", href: "#applications" },
                  { label: "Resources", href: "#resources" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <a key={link.label} href={link.href}
                    className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#f4ebd9]/45 hover:text-[#d0a34e] transition-colors duration-300 font-medium whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Address */}
              <div className="md:text-right">
                <span className="block font-sans text-[9px] tracking-[0.2em] font-semibold uppercase text-[#f4ebd9]/45 mb-2">Registered Office</span>
                <p className="font-sans text-[11px] text-[#f4ebd9]/45 leading-[1.7] tracking-wide">
                  Khasra No. 587, Akbarpuruood<br />
                  Behind Shree Cement, Haridwar–Laksar Road<br />
                  Laksar, Haridwar, Uttarakhand 247663
                </p>
              </div>

            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#f4ebd9]/[0.04]">
            <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 py-5 flex items-center justify-center">
              <span className="font-sans text-[10px] text-[#f4ebd9]/45 tracking-wider">
                © @2026 A brand of Aurvaay Wellness Private Limited. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Input styling */}
      <style>{`
        .cx-label {
          display: block;
          font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
          font-size: 10px;
          letter-spacing: 0.22em;
          font-weight: 600;
          text-transform: uppercase;
          color: rgba(208,163,78,0.7);
          margin-bottom: 8px;
        }
        .cx-input {
          width: 100%;
          background: rgba(244,235,217,0.05);
          border: 1px solid rgba(244,235,217,0.08);
          border-radius: 10px;
          padding: 14px 16px;
          font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
          font-size: 14px;
          color: #f4ebd9;
          transition: all 0.35s ease;
          outline: none;
        }
        .cx-input:focus {
          border-color: rgba(208,163,78,0.45);
          background: rgba(244,235,217,0.07);
          box-shadow: 0 0 0 3px rgba(208,163,78,0.06);
        }
        .cx-input::placeholder {
          color: rgba(244,235,217,0.3);
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
