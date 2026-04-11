"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimationFrame } from "framer-motion";
import HeroSlider from "./components/HeroSlider";
import ScrollBottleSection from "./components/ScrollBottleSection";
import MarqueeTicker from "./components/MarqueeTicker";
import HotDeals from "./components/HotDeals";
import ReviewsSection from "./components/ReviewsSection";
import { useProducts } from "./components/ProductsProvider";
import { fadeUp, fadeIn, stagger, scaleIn } from "./lib/motion";

const lines = [
  {
    name: "Arabian Line",
    key: "arabian",
    badge: "Best Sellers",
    sub: "Oud · Musk · Oriental Spice",
    gradient: "radial-gradient(ellipse at 50% 70%, #2e1f0e 0%, #130e07 100%)",
    image: "/arabian-line.png",
  },
  {
    name: "Designer Line",
    key: "designer",
    badge: "Luxury Maisons",
    sub: "Dior · Chanel · YSL · Versace",
    gradient: "radial-gradient(ellipse at 50% 30%, #1a1624 0%, #0d0b18 100%)",
    image: "/designer-line.png",
  },
  {
    name: "Niche Line",
    key: "niche",
    badge: "Rare & Artisan",
    sub: "MFK · Serge Lutens · Parfums de Marly",
    gradient: "radial-gradient(ellipse at 40% 60%, #1a1e18 0%, #0e0f0a 100%)",
    image: "/niche-line.png",
  },
];

export default function Home() {
  const { products } = useProducts();
  const bestsellers = products.filter((p) => p.bestSeller);
  return (
    <div className="th-bg">

      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Scroll Bottle ── */}
      <ScrollBottleSection />

      {/* ── Marquee ticker ── */}
      <MarqueeTicker />

      {/* ── Tagline banner ── */}
      <motion.section
        className="py-28 px-6 text-center border-b border-[rgba(196,169,125,0.1)]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-6">Authentic Decants</motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          The world&apos;s finest fragrances,<br />by the millilitre.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-8 text-[9px] tracking-[0.45em] text-[#8a8076] uppercase">
          Arabian Line · Designer Line · Niche Line
        </motion.p>
      </motion.section>

      {/* ── Our 3 Lines ── */}
      <section className="py-20 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase text-center mb-14"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >Our Collections</motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {lines.map((line) => (
              <motion.div key={line.key} className="group cursor-pointer" variants={scaleIn}>
                <div
                  className="aspect-[3/4] overflow-hidden relative flex flex-col items-center justify-end pb-10"
                  style={{ background: line.gradient }}
                >
                  {/* Background image */}
                  <img
                    src={line.image}
                    alt={line.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay so text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="relative z-10 text-center px-4">
                    <p className="text-[7px] tracking-[0.55em] uppercase mb-2" style={{ color: "#c4a97d" }}>{line.badge}</p>
                    <h3
                      className="text-2xl font-light tracking-widest uppercase mb-2"
                      style={{ fontFamily: "var(--font-cormorant)", color: "#e8e0d4" }}
                    >
                      {line.name}
                    </h3>
                    <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "#a09488" }}>{line.sub}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/product"
                    className="text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <BestSellersCarousel products={bestsellers} />

      {/* ── Hot Deals ── */}
      <HotDeals />

      {/* ── Brand quote ── */}
      <motion.section
        className="py-36 px-6 text-center border-b border-[rgba(196,169,125,0.1)]"
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={stagger}
      >
        <div className="max-w-3xl mx-auto">
          <motion.span
            variants={fadeIn}
            className="block text-6xl font-light text-[#c4a97d] mb-6 leading-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            "
          </motion.span>
          <motion.p
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-light italic text-[#e8e0d4] leading-loose mb-12"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A fragrance that awakens memory and lingers like a whisper, carrying you through time, where emotions are never forgotten.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/product"
              className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Featured line banners ── */}
      <section className="py-20 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto">
          {/* Top: Arabian full-width */}
          <motion.div
            className="featured-banner relative h-[22rem] flex flex-col items-center justify-center group overflow-hidden mb-6"
            style={{ background: "radial-gradient(ellipse at 50% 60%, #3a2510 0%, #0c0b09 100%)" }}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={scaleIn}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
            <div className="relative z-10 text-center px-8">
              <p className="text-[8px] tracking-[0.6em] text-[#c4a97d] uppercase mb-3">Best Sellers</p>
              <h3
                className="text-4xl font-light text-[#e8e0d4] tracking-[0.35em] uppercase mb-3"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Arabian Line
              </h3>
              <p className="text-[9px] text-[#8a8076] tracking-[0.35em] uppercase mb-8">
                Oud · Amber · Musk · Oriental Warmth
              </p>
              <Link
                href="/product"
                className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
              >
                Shop Arabian
              </Link>
            </div>
          </motion.div>
          {/* Bottom: Designer + Niche side by side */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
          >
            <motion.div
              className="featured-banner relative h-[22rem] flex flex-col items-center justify-center group overflow-hidden"
              style={{ background: "radial-gradient(ellipse at 50% 40%, #1a1624 0%, #0c0b09 100%)" }}
              variants={scaleIn}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
              <div className="relative z-10 text-center px-8">
                <p className="text-[8px] tracking-[0.6em] text-[#c4a97d] uppercase mb-3">Iconic Maisons</p>
                <h3
                  className="text-3xl font-light text-[#e8e0d4] tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Designer Line
                </h3>
                <p className="text-[9px] text-[#8a8076] tracking-[0.3em] uppercase mb-8">
                  Dior · Chanel · YSL · Versace · Armani
                </p>
                <Link
                  href="/product"
                  className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
                >
                  Shop Designer
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="featured-banner relative h-[22rem] flex flex-col items-center justify-center group overflow-hidden"
              style={{ background: "radial-gradient(ellipse at 50% 50%, #161c12 0%, #0c0b09 100%)" }}
              variants={scaleIn}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
              <div className="relative z-10 text-center px-8">
                <p className="text-[8px] tracking-[0.6em] text-[#c4a97d] uppercase mb-3">Rare &amp; Artisan</p>
                <h3
                  className="text-3xl font-light text-[#e8e0d4] tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Niche Line
                </h3>
                <p className="text-[9px] text-[#8a8076] tracking-[0.3em] uppercase mb-8">
                  MFK · Serge Lutens · Memo Paris · Parfums de Marly
                </p>
                <Link
                  href="/product"
                  className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
                >
                  Shop Niche
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Customer Reviews ── */}
      <ReviewsSection />

    </div>
  );
}

/* ── Best Sellers Carousel ─────────────────────────────────────────────── */
import type { Product } from "./lib/products";

function BestSellersCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollX: 0 });

  useAnimationFrame((_, delta) => {
    if (pausedRef.current || !trackRef.current || products.length === 0) return;
    xRef.current -= delta * 0.04;
    const half = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= half) xRef.current = 0;
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  const track = [...products, ...products];

  if (products.length === 0) return null;

  function onPointerDown(e: React.PointerEvent) {
    pausedRef.current = true;
    setDragging(true);
    dragStart.current = { x: e.clientX, scrollX: xRef.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    xRef.current = dragStart.current.scrollX + (e.clientX - dragStart.current.x);
    if (trackRef.current) trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  }
  function onPointerUp() {
    setDragging(false);
    pausedRef.current = false;
  }

  return (
    <section className="py-20 border-b border-[rgba(196,169,125,0.1)]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-2">
            Most Loved
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-light text-[#e8e0d4] tracking-wide"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Best Sellers
          </motion.h2>
        </motion.div>
      </div>

      {/* Padded clipping wrapper — matches Hot Deals layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => { if (!dragging) pausedRef.current = true; }}
          onMouseLeave={() => { if (!dragging) pausedRef.current = false; }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={trackRef} className="flex gap-5 w-max py-4">
            {track.map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                href={`/product/${p.id}`}
                className="group relative flex-shrink-0 w-48 sm:w-56"
                draggable={false}
                onClick={(e) => { if (dragging) e.preventDefault(); }}
              >
                {/* Full-bleed image with overlaid info */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      draggable={false}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#161616]" />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/90 via-[#0c0b09]/10 to-transparent" />
                  {/* Rank number */}
                  <span className="absolute top-3 right-3 text-[28px] font-light leading-none text-white/10 select-none"
                    style={{ fontFamily: "var(--font-cormorant)" }}>
                    {String((i % products.length) + 1).padStart(2, "0")}
                  </span>
                  {/* Info overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[7px] tracking-[0.4em] text-[#8a8076] uppercase mb-[3px]">{p.house}</p>
                    <h4 className="text-[10px] tracking-[0.18em] text-[#e8e0d4] uppercase leading-snug line-clamp-2 mb-2 group-hover:text-[#c4a97d] transition-colors duration-300">
                      {p.name}
                    </h4>
                    <p className="text-[9px] text-[#c4a97d] tracking-wider">from ৳{p.sizes[0]?.price}</p>
                  </div>
                  {/* Gold left border on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#c4a97d] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="text-center mt-10"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}
      >
        <Link
          href="/product"
          className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
        >
          View All Fragrances
        </Link>
      </motion.div>
    </section>
  );
}
