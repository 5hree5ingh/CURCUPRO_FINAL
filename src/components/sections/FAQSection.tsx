"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FaqPro, type FaqProItem } from "@/components/ui/faq-pro";

const faqItems: FaqProItem[] = [
  {
    id: "synthetic-vs-natural",
    question: "Is synthetic curcumin the same as natural curcumin?",
    answer: "Yes — it's the identical molecule (CAS 458-37-7), just produced via chemical synthesis instead of botanical extraction. It has the same chemical properties and bio-efficacy, but offers significantly higher purity and zero batch-to-batch variation."
  },
  {
    id: "grades-offered",
    question: "What product grades do you offer?",
    answer: "We offer three primary grades: Curcumex Pharma (99.5%+ purity) for pharma APIs and clinical formulations, Curcumex Pure (99.0%+ purity) for standard nutraceutical supplements, and Curcumex Color (95.0%+ curcuminoids) as a food colorant (E100)."
  },
  {
    id: "certifications-dossiers",
    question: "What certifications and documents do you provide?",
    answer: "Our facility and products are backed by ISO, GMP, FSSAI, Halal, and Kosher certifications. Every single batch includes a detailed Certificate of Analysis (COA) and Safety Data Sheet (SDS). Heavy metals are guaranteed at <1 ppm with zero pesticide residues."
  },
  {
    id: "sample-request",
    question: "Can I request a sample first?",
    answer: "Yes. We offer a 50g evaluation sample for ₹1,500 (inclusive of shipping and handling), dispatched within 3 days along with its COA. The sample cost is fully adjustable/refundable against your first commercial bulk order."
  },
  {
    id: "moq-capacity",
    question: "What is your MOQ and production capacity?",
    answer: "Our Minimum Order Quantity (MOQ) starts from 5–10 kg. Our current manufacturing capacity is 500–2,000 kg per month, which is highly scalable. We offer tiered volume pricing — please share your projected requirements for an exact quotation."
  },
  {
    id: "exports-incoterms",
    question: "Do you export? What are the payment and shipping terms?",
    answer: "Yes, we ship worldwide from India. We support standard Incoterms including EXW, FOB, and CIF. Payment terms are typically T/T (Telegraphic Transfer) or L/C (Letter of Credit). Evaluation samples dispatch in 3 days; bulk lead times are confirmed at the time of quotation."
  },
  {
    id: "synthetic-vs-chinese",
    question: "Why choose synthetic curcumin over natural or Chinese extracts?",
    answer: "It provides significantly higher purity (99.5% vs 75–85% typical of natural extracts), absolute batch-to-batch consistency, zero risk of pesticide or heavy metal contamination, and a stable year-round supply unaffected by crop failure or climate volatility — proudly manufactured in India."
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full bg-[#f4ebd9] text-[#1a1105] font-sans overflow-hidden py-16 lg:py-24 flex flex-col justify-center border-t border-[#e5dcd0]"
    >
      {/* Warm ambient glows matching the website's visual system */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#b0741a]/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#d08f30]/4 rounded-full blur-[70px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          {/* Eyebrow */}
          <p className="text-[#b0741a] text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 sm:mb-3">
            Frequently Asked Questions
          </p>

          {/* Title */}
          <h2 className="font-serif text-[30px] sm:text-[46px] md:text-[56px] lg:text-[66px] font-medium leading-[1.08] tracking-tight">
            <span className="text-[#1a1105]">Got </span>
            <span className="bg-gradient-to-r from-[#b0741a] via-[#d08f30] to-[#8c540c] bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
        </motion.div>

        {/* FAQ Pro Component container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <FaqPro
            items={faqItems}
            defaultOpenFirst={false}
            searchPlaceholder="Search our FAQs..."
          />
        </motion.div>
      </div>
    </section>
  );
}
