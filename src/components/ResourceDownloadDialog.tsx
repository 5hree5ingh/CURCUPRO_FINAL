"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

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

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setSubmitted(false);
      setError("");
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError("");

      try {
        // Use the exact same /api/submit endpoint with the same payload shape
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
          // Auto-close after 2 seconds
          setTimeout(() => onClose(), 2000);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [name, email, phone, company, resourceName, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1a1105]/70 backdrop-blur-sm" />

          {/* Dialog card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(165deg, rgba(255,253,248,0.99) 0%, rgba(252,248,238,0.97) 40%, rgba(245,236,215,0.94) 100%)",
              border: "1px solid rgba(208, 163, 78, 0.3)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,1) inset, 0 24px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(176,116,26,0.12)",
            }}
          >
            {/* Top gold accent */}
            <div
              className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(218,175,85,0.7) 30%, rgba(232,196,108,0.85) 50%, rgba(218,175,85,0.7) 70%, transparent)",
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#5c4a32]/40 hover:text-[#1a1105] hover:bg-[#b0741a]/[0.06] transition-all duration-200 z-10"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(176,116,26,0.08), rgba(208,143,48,0.12))",
                      border: "1px solid rgba(176,116,26,0.15)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#b0741a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#1a1105] mb-2">
                    Thank you!
                  </h3>
                  <p className="font-sans text-sm text-[#5c4a32]/60 leading-relaxed">
                    We&apos;ll send the <span className="font-medium text-[#b0741a]">{resourceName}</span> to your email shortly.
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-[#b0741a] text-[9px] font-semibold tracking-[0.2em] uppercase font-sans mb-1.5">
                      Download Resource
                    </p>
                    <h3 className="font-serif text-[22px] sm:text-[26px] font-medium text-[#1a1105] leading-tight tracking-tight mb-1.5">
                      {resourceName}
                    </h3>
                    <p className="font-sans text-[12px] text-[#5c4a32]/50 leading-relaxed">
                      Please share your details and we&apos;ll send this resource to your email.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    {/* Name */}
                    <div>
                      <label className="block font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5c4a32]/50 mb-1.5">
                        Name <span className="text-[#b0741a]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl font-sans text-[13px] text-[#1a1105] placeholder:text-[#5c4a32]/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#b0741a]/20"
                        style={{
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(208, 163, 78, 0.18)",
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5c4a32]/50 mb-1.5">
                        Email <span className="text-[#b0741a]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl font-sans text-[13px] text-[#1a1105] placeholder:text-[#5c4a32]/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#b0741a]/20"
                        style={{
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(208, 163, 78, 0.18)",
                        }}
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5c4a32]/50 mb-1.5">
                        Company Name <span className="text-[#b0741a]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your company"
                        className="w-full px-4 py-3 rounded-xl font-sans text-[13px] text-[#1a1105] placeholder:text-[#5c4a32]/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#b0741a]/20"
                        style={{
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(208, 163, 78, 0.18)",
                        }}
                      />
                    </div>

                    {/* Mobile (optional) */}
                    <div>
                      <label className="block font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5c4a32]/50 mb-1.5">
                        Mobile Number <span className="text-[#5c4a32]/25 normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl font-sans text-[13px] text-[#1a1105] placeholder:text-[#5c4a32]/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#b0741a]/20"
                        style={{
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(208, 163, 78, 0.18)",
                        }}
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="font-sans text-[12px] text-red-600/80 text-center">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-1 py-3.5 rounded-xl font-sans text-[13px] font-semibold tracking-wide text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#b0741a]/20 active:scale-[0.98]"
                      style={{
                        background: submitting
                          ? "rgba(176,116,26,0.5)"
                          : "linear-gradient(135deg, #b0741a, #8c540c)",
                      }}
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting…
                        </span>
                      ) : (
                        "Download Resource"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
