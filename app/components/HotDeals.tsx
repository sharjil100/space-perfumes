"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimationFrame } from "framer-motion";
import { products } from "../lib/products";
import { fadeUp, stagger } from "../lib/motion";

// Map product id → public image path (only ids that have an image)
const PRODUCT_IMAGES: Record<string, string> = {
  "khamrah":      "/khamrah.png",
  "sauvage-edp":  "/sauvage-edp.png",
  "hawas":        "/hawas.png",
  "eros-edp":     "/eros-edp.png",
  "y-edp":        "/y-edp.png",
};

const DEAL_IDS = [
  { id: "khamrah",       discount: 15 },
  { id: "sauvage-edp",   discount: 10 },
  { id: "hawas",         discount: 20 },
  { id: "eros-edp",      discount: 12 },
  { id: "y-edp",         discount: 18 },
  { id: "724-mfk",       discount: 8  },
  { id: "akaster",       discount: 10 },
];

const lineColor: Record<string, string> = {
  Arabian:  "#d4a853",
  Designer: "#8aadcf",
  Niche:    "#b89fd4",
};

const deals = DEAL_IDS.map(({ id, discount }) => {
  const product = products.find((p) => p.id === id)!;
  const size = product.sizes[1] ?? product.sizes[0];
  const original = size.price;
  const sale = Math.round(original * (1 - discount / 100));
  return { product, size, original, sale, discount };
});

// Duplicate for seamless loop
const track = [...deals, ...deals];

export default function HotDeals() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || !trackRef.current) return;
    xRef.current -= delta * 0.09; // px per ms → ~90px/sec
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= halfWidth) xRef.current = 0;
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <section className="py-20 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 text-center">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-2">
            Limited Time
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-light text-[#e8e0d4] tracking-wide"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Hot Deals
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-[10px] tracking-[0.3em] text-[#8a8076] uppercase">
            Curated offers · Updated regularly
          </motion.p>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div className="max-w-7xl mx-auto">
      <div
        className="overflow-hidden rounded-sm"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div ref={trackRef} className="flex gap-5 w-max py-4">
        {track.map(({ product, size, original, sale, discount }, i) => (
          <Link
            key={`${product.id}-${i}`}
            href={`/product/${product.id}`}
            className="group relative flex-shrink-0 w-52 sm:w-60"
          >
            {/* Card */}
            <div className="aspect-[3/4] th-card overflow-hidden relative mb-4 transition-transform duration-500 group-hover:scale-[1.02]">
              {PRODUCT_IMAGES[product.id] ? (
                <Image
                  src={PRODUCT_IMAGES[product.id]}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 208px, 240px"
                />
              ) : (
                <div className="w-full h-full th-card" />
              )}

              {/* Discount badge */}
              <div className="absolute top-2 left-2 bg-[#c4a97d] text-[#0c0b09] px-2 py-[3px]">
                <span className="text-[8px] tracking-[0.3em] font-semibold uppercase">−{discount}%</span>
              </div>

              {/* Line badge */}
              <span
                className="absolute top-2 right-2 text-[7px] tracking-[0.3em] uppercase border px-2 py-[3px]"
                style={{ color: lineColor[product.line], borderColor: lineColor[product.line] + "55" }}
              >
                {product.line}
              </span>

              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(196,169,125,0.08) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>

            {/* Info */}
            <p className="text-[8px] tracking-[0.4em] text-[#8a8076] uppercase mb-[3px]">{product.house}</p>
            <h3 className="text-[10px] tracking-[0.18em] text-[#e8e0d4] uppercase mb-2 leading-relaxed line-clamp-2 group-hover:text-[#c4a97d] transition-colors">
              {product.name}
            </h3>
            <p className="text-[8px] text-[#8a8076] mb-3">{size.ml}ml decant</p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] text-[#c4a97d] tracking-wider font-medium">৳{sale}</span>
              <span className="text-[9px] text-[#8a8076] line-through">৳{original}</span>
            </div>
          </Link>
        ))}
        </div>
      </div>
      </div>
    </section>
  );
}
