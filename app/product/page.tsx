"use client";

import { useState } from "react";
import { products, LINES, GENDERS, type Line, type Gender, type Product, type DecantSize } from "../lib/products";

// ── Per-card component handles its own size selection ──────────────────────
function ProductCard({ p }: { p: Product }) {
  const defaultSize = p.sizes[1] ?? p.sizes[0];
  const [selected, setSelected] = useState<DecantSize>(defaultSize);

  const lineColor: Record<string, string> = {
    Arabian: "text-[#d4a853]",
    Designer: "text-[#8aadcf]",
    Niche:    "text-[#b89fd4]",
  };

  return (
    <div className="group">
      {/* Image block */}
      <div className="aspect-[3/4] overflow-hidden th-card mb-4 relative">
        <div className="w-full h-full th-card transition-transform duration-500 group-hover:scale-105" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {p.bestSeller && (
            <span className="text-[7px] tracking-[0.35em] uppercase bg-[#c4a97d] text-[#0c0b09] px-2 py-[3px] font-medium">
              Best Seller
            </span>
          )}
          <span className={`text-[7px] tracking-[0.3em] uppercase ${lineColor[p.line]} border border-current px-2 py-[3px]`}>
            {p.line}
          </span>
        </div>

        {/* Gender badge top-right */}
        <span className="absolute top-2 right-2 text-[7px] tracking-[0.25em] text-[#8a8076] uppercase bg-[rgba(12,11,9,0.65)] px-2 py-[3px]">
          {p.gender}
        </span>

        {/* Quick-add hover bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0c0b09]/92 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase">Add to Cart</span>
        </div>
      </div>

      {/* Meta */}
      <p className="text-[8px] tracking-[0.4em] text-[#8a8076] uppercase mb-[3px]">{p.house}</p>
      <h3 className="text-[10px] tracking-[0.18em] text-[#e8e0d4] uppercase mb-2 leading-relaxed line-clamp-2 group-hover:text-[#c4a97d] transition-colors">
        {p.name}
      </h3>

      {/* Top notes */}
      <p className="text-[8px] text-[#8a8076] mb-3 line-clamp-1">
        {p.notes.slice(0, 3).join(" · ")}
      </p>

      {/* Decant size chips */}
      <div className="flex flex-wrap gap-[5px] mb-2">
        {p.sizes.map((s) => (
          <button
            key={s.ml}
            onClick={() => setSelected(s)}
            className={`text-[8px] tracking-wider px-[7px] py-[4px] border transition-all ${
              selected.ml === s.ml
                ? "border-[#c4a97d] text-[#c4a97d] bg-[rgba(196,169,125,0.08)]"
                : "border-[rgba(196,169,125,0.18)] text-[#8a8076] hover:border-[#c4a97d] hover:text-[#c4a97d]"
            }`}
          >
            {s.ml}ml
          </button>
        ))}
      </div>

      {/* Price */}
      <p className="text-[11px] text-[#c4a97d] tracking-wider">
        {selected.price} <span className="text-[8px] text-[#8a8076]">SAR</span>
      </p>
    </div>
  );
}

// ── Filter chip ─────────────────────────────────────────────────────────────
function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-[7px] text-[9px] tracking-[0.35em] uppercase transition-all border ${
        active
          ? "border-[#c4a97d] text-[#c4a97d] bg-[rgba(196,169,125,0.07)]"
          : "border-[rgba(196,169,125,0.15)] text-[#8a8076] hover:border-[#c4a97d] hover:text-[#c4a97d]"
      }`}
    >
      {label}
    </button>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
const SORT = ["Default", "Price: Low to High", "Price: High to Low", "Name A-Z"] as const;

export default function ProductPage() {
  const [activeLine, setActiveLine] = useState<Line>("All");
  const [activeGender, setActiveGender] = useState<Gender>("All");
  const [activeSort, setActiveSort] = useState<string>("Default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = products
    .filter((p) => activeLine === "All" || p.line === activeLine)
    .filter((p) => activeGender === "All" || p.gender === activeGender)
    .sort((a, b) => {
      if (activeSort === "Price: Low to High") return a.sizes[0].price - b.sizes[0].price;
      if (activeSort === "Price: High to Low") return b.sizes[0].price - a.sizes[0].price;
      if (activeSort === "Name A-Z") return a.name.localeCompare(b.name);
      return 0;
    });

  const activeFilters = (activeLine !== "All" ? 1 : 0) + (activeGender !== "All" ? 1 : 0);

  return (
    <div className="th-bg min-h-screen pt-24">

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-b border-[rgba(196,169,125,0.1)]">
        <p className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-3">Catalogue</p>
        <h1
          className="text-4xl sm:text-5xl font-light text-[#e8e0d4] tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Shop Decants
        </h1>
        <p className="mt-2 text-[10px] tracking-[0.3em] text-[#8a8076] uppercase">
          {filtered.length} fragrance{filtered.length !== 1 ? "s" : ""} · 3ml · 5ml · 10ml · 15ml
        </p>
      </div>

      {/* Line tabs */}
      <div className="border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {LINES.map((line) => (
              <button
                key={line}
                onClick={() => setActiveLine(line)}
                className={`flex-shrink-0 px-6 py-5 text-[9px] tracking-[0.45em] uppercase transition-all border-b-2 ${
                  activeLine === line
                    ? "border-[#c4a97d] text-[#c4a97d]"
                    : "border-transparent text-[#8a8076] hover:text-[#c4a97d]"
                }`}
              >
                {line === "Arabian" ? "Arabian Line" : line === "Designer" ? "Designer Line" : line === "Niche" ? "Niche Line" : line}
              </button>
            ))}
            {activeLine === "Arabian" && (
              <span className="ml-auto flex-shrink-0 self-center pr-2 text-[8px] tracking-[0.3em] text-[#8a8076] hidden md:block">
                Best Sellers · Oud · Oriental · Musk
              </span>
            )}
            {activeLine === "Designer" && (
              <span className="ml-auto flex-shrink-0 self-center pr-2 text-[8px] tracking-[0.3em] text-[#8a8076] hidden md:block">
                Iconic Maisons · Dior · Chanel · YSL · Versace
              </span>
            )}
            {activeLine === "Niche" && (
              <span className="ml-auto flex-shrink-0 self-center pr-2 text-[8px] tracking-[0.3em] text-[#8a8076] hidden md:block">
                Rare Artisan · MFK · Serge Lutens · Parfums de Marly
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">

        {/* Filter / Sort bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-[#e8e0d4] uppercase hover:text-[#c4a97d] transition-colors"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="0" y1="1" x2="16" y2="1" />
              <line x1="3" y1="6" x2="13" y2="6" />
              <line x1="6" y1="11" x2="10" y2="11" />
            </svg>
            Filters {activeFilters > 0 && `(${activeFilters})`}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase hidden sm:block">Sort by</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-transparent border border-[rgba(196,169,125,0.2)] text-[#8a8076] text-[10px] tracking-wider uppercase px-3 py-2 outline-none hover:border-[#c4a97d] transition-colors cursor-pointer"
            >
              {SORT.map((o) => (
                <option key={o} value={o} className="bg-[#1e1b16] text-[#e8e0d4]">{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter drawer */}
        {filtersOpen && (
          <div className="mb-10 p-6 border border-[rgba(196,169,125,0.1)] th-bg-2">
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Line</p>
                <div className="flex flex-wrap gap-2">
                  {LINES.map((l) => (
                    <Chip key={l} label={l} active={activeLine === l} onClick={() => setActiveLine(l)} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">For</p>
                <div className="flex flex-wrap gap-2">
                  {GENDERS.map((g) => (
                    <Chip key={g} label={g} active={activeGender === g} onClick={() => setActiveGender(g)} />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => { setActiveLine("All"); setActiveGender("All"); setFiltersOpen(false); }}
              className="mt-6 text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors border-b border-[rgba(138,128,118,0.3)] pb-px"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Decant sizes info */}
        <div className="mb-10 flex flex-wrap gap-6 text-[8px] tracking-[0.3em] text-[#8a8076] uppercase border-b border-[rgba(196,169,125,0.08)] pb-6">
          {["3ml · 45 sprays", "5ml · 75 sprays", "10ml · 150 sprays", "15ml · 225 sprays"].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c4a97d] inline-block" />
              {s}
            </span>
          ))}
          <span className="ml-auto text-[#8a8076] hidden sm:block">Authentic · Decanted from originals</span>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-[10px] tracking-[0.5em] text-[#8a8076] uppercase">No fragrances match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-20 pb-10 text-center border-t border-[rgba(196,169,125,0.08)] pt-10">
          <p className="text-[9px] tracking-[0.5em] text-[#8a8076] uppercase mb-3">
            Space Perfumes · Authentic Decants
          </p>
          <p className="text-[10px] text-[#8a8076] max-w-lg mx-auto leading-loose">
            Every decant is sourced from authentic originals. We do not alter, dilute, or reformulate any fragrance.
          </p>
        </div>
      </div>
    </div>
  );
}
