"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LINES, GENDERS, VIBES, type Line, type Gender, type VibeKey, type Product, type DecantSize } from "../lib/products";
import { useProducts } from "../components/ProductsProvider";
import { searchProducts } from "../lib/search";
import { useCart } from "../lib/cart";
import { fadeUp, fadeIn, stagger, staggerFast, scaleIn, slideLeft } from "../lib/motion";

// ── Per-card component handles its own size selection ──────────────────────
function ProductCard({ p }: { p: Product }) {
  const defaultSize = p.sizes[1] ?? p.sizes[0];
  const [selected, setSelected] = useState<DecantSize>(defaultSize);
  const { addItem } = useCart();

  const lineColor: Record<string, string> = {
    Arabian: "text-[#d4a853]",
    Designer: "text-[#8aadcf]",
    Niche:    "text-[#b89fd4]",
  };

  return (
    <motion.div className="group" variants={scaleIn} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <Link href={`/product/${p.id}`} className="block">
      {/* Image block */}
      <div className="aspect-[3/4] overflow-hidden th-card mb-4 relative">
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full th-card transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
            <span className="text-[8px] tracking-[0.3em] text-[#8a8076] uppercase">No image</span>
          </div>
        )}

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
        {p.inStock !== false && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({ productId: p.id, name: p.name, house: p.house, line: p.line, ml: selected.ml, price: selected.price, imageUrl: p.imageUrl });
            }}
            className="absolute bottom-0 left-0 right-0 bg-[#0c0b09]/92 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            <span className="text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase">Add to Cart</span>
          </button>
        )}

        {/* Out of stock overlay */}
        {p.inStock === false && (
          <div className="absolute inset-0 bg-[#0c0b09]/70 flex items-center justify-center">
            <span className="text-[8px] tracking-[0.4em] uppercase text-[#8a8076] border border-[#8a8076]/40 px-3 py-1">Out of Stock</span>
          </div>
        )}
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
      </Link>

      {/* Decant size chips */}
      <div className="flex flex-wrap gap-[5px] mb-2">
        {p.sizes.map((s) => (
          <button
            key={s.ml}
            onClick={(e) => { e.stopPropagation(); setSelected(s); }}
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
        ৳{selected.price}
      </p>
    </motion.div>
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

const VIBE_KEYS = Object.keys(VIBES) as VibeKey[];

function ProductPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { products } = useProducts();
  const [activeLine, setActiveLine] = useState<Line>("All");
  const [activeGender, setActiveGender] = useState<Gender>("All");
  const [activeVibe, setActiveVibe] = useState<VibeKey | null>(null);
  const [activeSort, setActiveSort] = useState<string>("Default");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const g = params.get("gender");
    const l = params.get("line");
    const v = params.get("vibe");
    const q = params.get("q");
    if (g && (["Him", "Her", "Unisex"] as string[]).includes(g)) setActiveGender(g as Gender);
    if (l && (["Arabian", "Designer", "Niche"] as string[]).includes(l)) setActiveLine(l as Line);
    if (v && v in VIBES) setActiveVibe(v as VibeKey);
    setQuery(q ?? "");
  }, [params]);

  const trimmedQuery = query.trim();

  // With a query active, `searchProducts` has already ordered by relevance, so
  // "Default" must preserve that order rather than re-sorting by stock.
  const searched = trimmedQuery ? searchProducts(products, trimmedQuery) : products;

  const filtered = searched
    .filter((p) => activeLine === "All" || p.line === activeLine)
    .filter((p) => activeGender === "All" || p.gender === activeGender)
    .filter((p) => {
      if (!activeVibe) return true;
      const vibeNotes = VIBES[activeVibe].notes.map((n) => n.toLowerCase());
      const matches = p.notes.filter((n) => vibeNotes.includes(n.toLowerCase())).length;
      return matches >= 2;
    })
    .sort((a, b) => {
      if (activeSort === "Price: Low to High") return (a.sizes[0]?.price ?? 0) - (b.sizes[0]?.price ?? 0);
      if (activeSort === "Price: High to Low") return (b.sizes[0]?.price ?? 0) - (a.sizes[0]?.price ?? 0);
      if (activeSort === "Name A-Z") return a.name.localeCompare(b.name);
      if (trimmedQuery) return 0; // keep relevance order
      // Default: in-stock first
      const aStock = a.inStock === false ? 1 : 0;
      const bStock = b.inStock === false ? 1 : 0;
      return aStock - bStock;
    });

  const activeFilters = (activeLine !== "All" ? 1 : 0) + (activeGender !== "All" ? 1 : 0) + (activeVibe ? 1 : 0);

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

      {/* Page header */}
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-b border-[rgba(196,169,125,0.1)]"
        initial="hidden" animate="show" variants={stagger}
      >
        <motion.p variants={slideLeft} className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-3">Catalogue</motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-light text-[#e8e0d4] tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Shop Decants
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-2 text-[10px] tracking-[0.3em] text-[#8a8076] uppercase">
          {filtered.length} fragrance{filtered.length !== 1 ? "s" : ""} · 3ml · 5ml · 10ml
        </motion.p>
      </motion.div>

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

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, brand, note, inspired-by…"
              className="w-full bg-transparent border-b border-[rgba(196,169,125,0.25)] pb-3 pr-8 text-[#e8e0d4] placeholder-[#8a8076] text-sm tracking-wider outline-none focus:border-[#c4a97d] transition-colors"
            />
            {trimmedQuery ? (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-0 top-0 text-[#8a8076] hover:text-[#c4a97d] transition-colors"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            ) : (
              <svg className="absolute right-0 top-0 text-[#8a8076]" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          {trimmedQuery && (
            <p className="mt-3 text-[9px] tracking-[0.3em] text-[#8a8076] uppercase">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{trimmedQuery}&rdquo;
            </p>
          )}
        </div>

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
              <div>
                <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Vibe</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="All" active={activeVibe === null} onClick={() => setActiveVibe(null)} />
                  {VIBE_KEYS.map((k) => (
                    <Chip key={k} label={VIBES[k].label} active={activeVibe === k} onClick={() => setActiveVibe(k)} />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => { setActiveLine("All"); setActiveGender("All"); setActiveVibe(null); setQuery(""); setFiltersOpen(false); }}
              className="mt-6 text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors border-b border-[rgba(138,128,118,0.3)] pb-px"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Decant sizes info */}
        <div className="mb-10 flex flex-wrap gap-6 text-[8px] tracking-[0.3em] text-[#8a8076] uppercase border-b border-[rgba(196,169,125,0.08)] pb-6">
          {["3ml · 45 sprays", "5ml · 75 sprays", "10ml · 150 sprays"].map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#c4a97d] inline-block" />
              {s}
            </span>
          ))}
          <span className="ml-auto text-[#8a8076] hidden sm:block">Authentic · Decanted from originals</span>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <motion.div className="py-32 text-center" initial="hidden" animate="show" variants={fadeIn}>
            <p className="text-[10px] tracking-[0.5em] text-[#8a8076] uppercase">
              {trimmedQuery ? `No fragrances found for “${trimmedQuery}”` : "No fragrances match your filters"}
            </p>
            {trimmedQuery && activeFilters > 0 && (
              <button
                onClick={() => { setActiveLine("All"); setActiveGender("All"); setActiveVibe(null); }}
                className="mt-5 text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase hover:text-[#e8e0d4] transition-colors"
              >
                Clear filters and search all lines
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`${activeLine}-${activeGender}-${activeSort}`}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10"
            initial="hidden"
            animate="show"
            variants={staggerFast}
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </motion.div>
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

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="th-bg min-h-screen" />}>
      <ProductPageInner />
    </Suspense>
  );
}
