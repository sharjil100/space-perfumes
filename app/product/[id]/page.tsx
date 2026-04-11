"use client";

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { DecantSize } from "../../lib/products";
import { useProducts } from "../../components/ProductsProvider";
import { fadeUp, fadeIn, stagger, scaleIn } from "../../lib/motion";

const lineColor: Record<string, string> = {
  Arabian:  "#d4a853",
  Designer: "#8aadcf",
  Niche:    "#b89fd4",
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const defaultSize = product.sizes[1] ?? product.sizes[0];
  const [selected, setSelected] = useState<DecantSize>(defaultSize ?? product.sizes[0]);
  const router = useRouter();

  const color = lineColor[product.line];
  const image = product.imageUrl;

  // Related: same line, different product, up to 4
  const related = products
    .filter((p) => p.line === product.line && p.id !== product.id)
    .slice(0, 4);

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

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image */}
          <motion.div
            initial="hidden" animate="show" variants={scaleIn}
            className="aspect-[3/4] th-card relative overflow-hidden"
          >
            {image ? (
              <img
                src={image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[9px] tracking-[0.4em] text-[#8a8076] uppercase">Image coming soon</span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.bestSeller && (
                <span className="text-[7px] tracking-[0.35em] uppercase bg-[#c4a97d] text-[#0c0b09] px-2 py-[3px] font-medium">
                  Best Seller
                </span>
              )}
              <span
                className="text-[7px] tracking-[0.3em] uppercase border px-2 py-[3px]"
                style={{ color, borderColor: color + "55" }}
              >
                {product.line}
              </span>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            className="flex flex-col"
          >
            {/* House */}
            <motion.p
              variants={fadeUp}
              className="text-[9px] tracking-[0.55em] text-[#8a8076] uppercase mb-3"
            >
              {product.house}
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-light text-[#e8e0d4] tracking-wide mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {product.name}
            </motion.h1>

            {/* Gender + line badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
              <span className="text-[8px] tracking-[0.35em] uppercase border border-[rgba(196,169,125,0.2)] text-[#8a8076] px-3 py-1">
                {product.gender}
              </span>
              <span
                className="text-[8px] tracking-[0.35em] uppercase border px-3 py-1"
                style={{ color, borderColor: color + "55" }}
              >
                {product.line} Line
              </span>
              {product.inStock === false && (
                <span className="text-[8px] tracking-[0.35em] uppercase border border-red-500/40 text-red-400 px-3 py-1">
                  Out of Stock
                </span>
              )}
            </motion.div>

            {/* Inspired By banner */}
            {product.inspiredBy && (
              <motion.div
                variants={fadeUp}
                className="mb-8 border border-[#c4a97d]/30 bg-[rgba(196,169,125,0.04)] px-5 py-4"
              >
                <p className="text-[8px] tracking-[0.5em] text-[#c4a97d] uppercase mb-1">Inspired By</p>
                <p className="text-sm tracking-[0.15em] text-[#e8e0d4]">
                  {product.inspiredBy.name}
                  <span className="text-[#8a8076] ml-2 text-[10px] tracking-[0.3em] uppercase">
                    — {product.inspiredBy.house}
                  </span>
                </p>
              </motion.div>
            )}

            {/* Description */}
            {product.description && (
              <motion.p
                variants={fadeUp}
                className="text-xs leading-relaxed text-[#8a8076] mb-8 max-w-md"
              >
                {product.description}
              </motion.p>
            )}

            {/* Notes */}
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Fragrance Notes</p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="text-[9px] tracking-[0.25em] uppercase border border-[rgba(196,169,125,0.18)] text-[#8a8076] px-3 py-[5px] hover:border-[#c4a97d] hover:text-[#e8e0d4] transition-colors"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Occasions + Seasons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-10 mb-10">
              <div>
                <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-3">Occasions</p>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((o) => (
                    <span key={o} className="text-[8px] tracking-[0.25em] text-[#8a8076] uppercase">{o}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-3">Seasons</p>
                <div className="flex flex-wrap gap-2">
                  {product.seasons.map((s) => (
                    <span key={s} className="text-[8px] tracking-[0.25em] text-[#8a8076] uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeIn} className="w-full h-px bg-[rgba(196,169,125,0.12)] mb-8" />

            {/* Size picker */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.ml}
                    onClick={() => setSelected(s)}
                    className={`flex flex-col items-center px-5 py-3 border transition-all duration-200 ${
                      selected.ml === s.ml
                        ? "border-[#c4a97d] bg-[rgba(196,169,125,0.07)]"
                        : "border-[rgba(196,169,125,0.18)] hover:border-[#c4a97d]"
                    }`}
                  >
                    <span className={`text-[11px] tracking-[0.2em] uppercase ${selected.ml === s.ml ? "text-[#c4a97d]" : "text-[#8a8076]"}`}>
                      {s.ml}ml
                    </span>
                    <span className={`text-[10px] mt-1 ${selected.ml === s.ml ? "text-[#e8e0d4]" : "text-[#8a8076]"}`}>
                      ৳{s.price}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Price + CTA */}
            <motion.div variants={fadeUp} className="flex items-center gap-6">
              <div>
                <p className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase mb-1">Price</p>
                <p className="text-2xl text-[#c4a97d] tracking-wider">৳{selected.price}</p>
                <p className="text-[8px] text-[#8a8076] mt-1">{selected.ml}ml decant · authentic</p>
              </div>
              <button className="flex-1 max-w-[220px] border border-[#c4a97d] py-4 text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all duration-300">
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-[rgba(196,169,125,0.1)]">
          <motion.p
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-[9px] tracking-[0.55em] text-[#8a8076] uppercase mb-2"
          >
            More from {product.line} Line
          </motion.p>
          <motion.h2
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-2xl font-light text-[#e8e0d4] tracking-wide mb-10"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            You May Also Like
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {related.map((p) => (
              <motion.div key={p.id} variants={scaleIn}>
                <Link href={`/product/${p.id}`} className="group block">
                  <div className="aspect-[3/4] th-card overflow-hidden relative mb-3">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="25vw"
                      />
                    ) : (
                      <div className="w-full h-full th-card transition-transform duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <p className="text-[8px] tracking-[0.35em] text-[#8a8076] uppercase mb-[3px]">{p.house}</p>
                  <p className="text-[10px] tracking-[0.15em] text-[#e8e0d4] uppercase group-hover:text-[#c4a97d] transition-colors line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-[#c4a97d] mt-2">from ৳{p.sizes[0].price}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
