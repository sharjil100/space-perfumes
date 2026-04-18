"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    bg: "radial-gradient(ellipse at 60% 55%, #2e1f0f 0%, #1a1108 40%, #0c0b09 100%)",
    eyebrow: "New Collection — 2026",
    headline: "A memory held in time.",
    cta: "Discover",
    href: "/product",
  },
  {
    bg: "radial-gradient(ellipse at 40% 50%, #1a1228 0%, #100d1a 40%, #0c0b09 100%)",
    eyebrow: "Luxury Line",
    headline: "Where scents become stories.",
    cta: "Explore",
    href: "/product",
  },
  {
    bg: "radial-gradient(ellipse at 55% 65%, #201a0c 0%, #13100a 40%, #0c0b09 100%)",
    eyebrow: "Authentic Decants",
    headline: "Worn by those who remember.",
    cta: "Shop Now",
    href: "/product",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [key, setKey] = useState(0);

  const goTo = useCallback((i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
      setKey((k) => k + 1);
    }, 500);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => {
      goTo((active + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [active, goTo]);

  const slide = slides[active];

  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ background: slide.bg }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(12,11,9,0.7) 100%)" }}
      />

      {/* Slide content */}
      <div
        key={key}
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        <p
          className="mb-5 text-[10px] tracking-[0.65em] text-[#c4a97d] uppercase anim-fade-up anim-d1"
        >
          {slide.eyebrow}
        </p>
        <h1
          className="mb-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-[#e8e0d4] anim-fade-up anim-d2"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {slide.headline}
        </h1>
        <Link
          href={slide.href}
          className="inline-block border border-[#c4a97d] px-14 py-3.5 text-[10px] tracking-[0.6em] text-[#c4a97d] uppercase hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all duration-300 anim-fade-up anim-d3"
        >
          {slide.cta}
        </Link>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`block transition-all duration-500 ${
              i === active
                ? "w-10 h-px bg-[#c4a97d]"
                : "w-4 h-px bg-[#8a8076] hover:bg-[#c4a97d]"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Vertical scroll label */}
      <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-3 z-10">
        <span
          className="text-[8px] tracking-[0.5em] text-[#8a8076] uppercase"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
        <div className="relative w-px h-14 bg-[rgba(138,128,118,0.25)] overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "40%",
              background: "#c4a97d",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(350%); }
        }
      `}</style>
    </section>
  );
}
