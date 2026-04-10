"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger } from "../lib/motion";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about" },
];

const shopLinks = [
  { label: "Shop All", href: "/product" },
  { label: "Arabian Line", href: "/product" },
  { label: "Designer Line", href: "/product" },
  { label: "Niche Line", href: "/product" },
  { label: "Best Sellers", href: "/product" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Returns", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="th-bg-2 border-t border-[rgba(196,169,125,0.12)]">

      {/* Main grid */}
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >

        {/* Brand */}
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="inline-block text-2xl font-light tracking-[0.45em] text-[#e8e0d4] uppercase mb-6 hover:text-[#c4a97d] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Space<br />Perfumes
          </Link>
          <p className="text-xs leading-relaxed text-[#8a8076] max-w-[18rem]">
            A memory held in time. Luxury fragrances crafted to awaken the senses and carry you through time, where emotions are never forgotten.
          </p>
          <div className="flex flex-wrap gap-5 mt-8">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Company */}
        <motion.div variants={fadeUp}>
          <h4 className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase mb-7">Company</h4>
          <ul className="flex flex-col gap-4">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[11px] tracking-[0.25em] text-[#8a8076] uppercase hover:text-[#e8e0d4] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Collections */}
        <motion.div variants={fadeUp}>
          <h4 className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase mb-7">Collections</h4>
          <ul className="flex flex-col gap-4">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[11px] tracking-[0.25em] text-[#8a8076] uppercase hover:text-[#e8e0d4] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Legal */}
        <motion.div variants={fadeUp}>
          <h4 className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase mb-7">Support</h4>
          <ul className="flex flex-col gap-4">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[11px] tracking-[0.25em] text-[#8a8076] uppercase hover:text-[#e8e0d4] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        className="border-t border-[rgba(196,169,125,0.1)] px-6 lg:px-12 py-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 1 }}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] tracking-[0.3em] text-[#8a8076] uppercase">
            &copy; {new Date().getFullYear()} Space Perfumes. All rights reserved.
          </p>
          <p className="text-[9px] tracking-[0.3em] text-[#8a8076] uppercase">
            Bangladesh
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

