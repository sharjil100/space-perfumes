"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

const faqs = [
  {
    q: "What is the difference between EDP and EDT?",
    a: "EDP (Eau de Parfum) contains a higher concentration of fragrance oil — typically 15–20% — giving it a richer, longer-lasting scent that stays on skin for 6–10 hours. EDT (Eau de Toilette) sits at 8–12% concentration, making it lighter, more casual, and better suited for warmer weather or daytime wear. If you want presence and longevity, choose the EDP. For a fresh, easy companion throughout the day, the EDT is ideal.",
  },
  {
    q: "How long will a decant last on my skin?",
    a: "Longevity depends on the fragrance concentration, your skin type, and application point. On average, a quality EDP lasts 6–10 hours, while an EDT lasts 4–6 hours. Oilier skin retains fragrance longer than dry skin. Applying to pulse points — wrists, neck, inner elbow, and chest — maximises diffusion and wear time. Moisturising the skin before spraying also extends longevity significantly.",
  },
  {
    q: "How much fragrance is in each decant size?",
    a: "Our decants come in 3 ml, 5 ml, 9 ml, and 15 ml sizes. To give you a sense of value: a typical spray is around 0.1 ml, so a 5 ml decant gives you approximately 50 sprays — enough for 25–50 full wearings depending on how many sprays you apply. A 15 ml decant can easily last 3–6 months of daily use.",
  },
  {
    q: "Are these authentic fragrances or copies?",
    a: "Every decant we offer is extracted directly from an authentic, original bottle of the parent fragrance. We never dilute, blend, or imitate. What you receive is the exact same liquid that comes from the designer or niche house — simply transferred into a travel-friendly atomiser. Some products also have an 'inspired by' note indicating which icon inspired the Arabian or niche creation, but those are distinct products clearly labelled as such.",
  },
  {
    q: "What does 'Inspired By' mean?",
    a: "'Inspired By' indicates that a fragrance — typically from an Arabian or niche house — was crafted with a famous designer scent in mind as a reference point. These are original creations by their own perfumers, not imitations or copies. They share a similar character or DNA but are unique compositions in their own right. Think of it as a tribute that stands on its own merits.",
  },
  {
    q: "How should I store my decant?",
    a: "Keep your decant away from direct sunlight, heat, and humidity — all of which degrade fragrance molecules over time. A cool, dark drawer or shelf is ideal. Avoid leaving it in the bathroom, as steam accelerates oxidation. Stored correctly, a decant will retain its character for 2–3 years, and many fine fragrances last even longer.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="th-bg min-h-screen pt-24">

      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      {/* Hero */}
      <section
        className="relative flex items-center justify-center h-[45vh] overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 60%, #2e1f0e 0%, #1a1108 40%, #0c0b09 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <motion.div
          className="relative z-10 text-center px-6"
          initial="hidden" animate="show" variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[9px] tracking-[0.65em] text-[#c4a97d] uppercase mb-5">
            Knowledge Base
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[#e8e0d4] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Frequently Asked
          </motion.h1>
        </motion.div>
      </section>

      {/* FAQ list */}
      <motion.section
        className="max-w-3xl mx-auto px-6 py-24"
        initial="hidden" animate="show" variants={stagger}
      >
        <div className="divide-y divide-[rgba(196,169,125,0.1)]">
          {faqs.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-8 text-left group"
              >
                <span
                  className="text-lg sm:text-xl font-light text-[#e8e0d4] group-hover:text-[#c4a97d] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {item.q}
                </span>
                <span
                  className={`shrink-0 mt-1 text-[#c4a97d] transition-transform duration-300 ${open === i ? "rotate-45" : "rotate-0"}`}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-sm leading-loose text-[#8a8076]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
