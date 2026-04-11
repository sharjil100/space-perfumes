"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useAnimationFrame } from "framer-motion";
import { useProducts } from "./ProductsProvider";
import { fadeUp, stagger } from "../lib/motion";

const lineColor: Record<string, string> = {
  Arabian:  "#d4a853",
  Designer: "#8aadcf",
  Niche:    "#b89fd4",
};

export default function HotDeals() {
  const { products } = useProducts();
  const deals = products
    .filter((p) => (p.discount ?? 0) > 0)
    .map((product) => {
      const discount = product.discount!;
      const size = product.sizes[1] ?? product.sizes[0];
      const original = size.price;
      const sale = Math.round(original * (1 - discount / 100));
      return { product, size, original, sale, discount };
    });

  // Duplicate for seamless loop
  const track = [...deals, ...deals];

  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || !trackRef.current || deals.length === 0) return;
    xRef.current -= delta * 0.09;
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= halfWidth) xRef.current = 0;
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  if (deals.length === 0) return null;

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
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
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
