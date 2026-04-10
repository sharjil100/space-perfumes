"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger, scaleIn } from "../lib/motion";

export default function About() {
  return (
    <div className="th-bg min-h-screen pt-24">

      {/* Hero */}
      <section
        id="about-hero"
        className="relative flex items-center justify-center h-[55vh] overflow-hidden"
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
            Our Story
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[#e8e0d4] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            About Us
          </motion.h1>
        </motion.div>
      </section>

      {/* Brand story */}
      <motion.section
        className="max-w-3xl mx-auto px-6 py-24 border-b border-[rgba(196,169,125,0.1)]"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase mb-8">The Beginning</motion.p>
        <motion.p
          variants={fadeUp}
          className="text-2xl sm:text-3xl font-light text-[#e8e0d4] leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Space Perfumes was born from a passion for extraordinary scents that transcend the everyday.
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm leading-loose text-[#8a8076] mb-6">
          We believe fragrance is more than a product — it is an experience, a memory, and an identity. Each bottle holds a story waiting to be worn, a feeling waiting to be rediscovered.
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm leading-loose text-[#8a8076] mb-6">
          Our carefully curated collection draws inspiration from the vastness of the cosmos, blending rare ingredients sourced from the finest corners of the world. From the deep resins of the Arabian Peninsula to the delicate florals of the Mediterranean coast, every element is chosen with intention.
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm leading-loose text-[#8a8076]">
          We are committed to craftsmanship, sustainability, and delivering a luxury experience to every customer. This is not just perfume — it is a journey through time, where emotions are never forgotten.
        </motion.p>
      </motion.section>

      {/* Three pillars */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 border-b border-[rgba(196,169,125,0.1)]">
        <motion.p
          className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase text-center mb-16"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp}
        >What We Stand For</motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          {[
            {
              title: "Craftsmanship",
              body: "Every fragrance is composed by master perfumers using the highest quality raw materials, blended in small batches to ensure the finest result.",
            },
            {
              title: "Sustainability",
              body: "We source ethically and responsibly, working with suppliers who share our commitment to the environment and the communities they serve.",
            },
            {
              title: "Legacy",
              body: "Fragrance connects generations. We craft scents that are worthy of becoming part of your story — and the stories of those who come after you.",
            },
          ].map((item) => (
            <motion.div key={item.title} className="border-t border-[rgba(196,169,125,0.15)] pt-8" variants={scaleIn}>
              <h3
                className="text-2xl font-light text-[#e8e0d4] tracking-wider mb-5"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {item.title}
              </h3>
              <p className="text-xs leading-loose text-[#8a8076]">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-28 px-6 text-center"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-light italic text-[#e8e0d4] max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          "Bring memories home, keep them close."
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            href="/product"
            className="border border-[#c4a97d] px-14 py-3.5 text-[10px] tracking-[0.55em] text-[#c4a97d] uppercase hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all duration-300"
          >
            Explore Collection
          </Link>
        </motion.div>
      </motion.section>

    </div>
  );
}
