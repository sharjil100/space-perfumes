"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useProducts } from "./ProductsProvider";
import { useCart } from "../lib/cart";
import { searchProducts } from "../lib/search";
import type { Product } from "../lib/products";

/** Results shown inline in the overlay; the rest live on /product?q= */
const PREVIEW_LIMIT = 10;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/product" },
  { label: "Arabian Line", href: "/product" },
  { label: "Designer Line", href: "/product" },
  { label: "Niche Line", href: "/product" },
  { label: "Best Sellers", href: "/product" },
  { label: "Our Story", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const { theme, toggle } = useTheme();
  const { products } = useProducts();
  const { totalItems, openDrawer } = useCart();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim();
  const matches: Product[] = trimmed ? searchProducts(products, trimmed) : [];
  const results = matches.slice(0, PREVIEW_LIMIT);

  const lineColor: Record<string, string> = {
    Arabian:  "#d4a853",
    Designer: "#8aadcf",
    Niche:    "#b89fd4",
  };

  const openSearch = () => { setSearchOpen(true); setQuery(""); };
  const closeSearch = () => { setSearchOpen(false); setQuery(""); };

  const handleResultClick = () => {
    closeSearch();
  };

  // Enter (or "view all") hands the query to the shop page, which shows every match.
  const showAllResults = () => {
    if (!trimmed) return;
    const q = trimmed;
    closeSearch();
    router.push(`/product?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Main header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-[#0c0b09] border-b border-[rgba(196,169,125,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 lg:px-12">

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] group z-10"
            aria-label="Open navigation"
          >
            <span className="block h-px w-7 transition-all duration-300 group-hover:bg-[#c4a97d]" style={{ backgroundColor: "var(--fg)" }} />
            <span className="block h-px w-5 transition-all duration-300 group-hover:bg-[#c4a97d] group-hover:w-7" style={{ backgroundColor: "var(--fg)" }} />
            <span className="block h-px w-7 transition-all duration-300 group-hover:bg-[#c4a97d]" style={{ backgroundColor: "var(--fg)" }} />
          </button>

          {/* Logo — centered absolutely */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-sm sm:text-base tracking-[0.45em] th-fg uppercase font-light whitespace-nowrap hover:text-[#c4a97d] transition-colors duration-300"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Space Perfumes
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5 z-10">
            {/* Theme toggle — hidden on mobile, visible sm+ */}
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="hidden sm:block th-fg hover:text-[#c4a97d] transition-colors"
            >
              {theme === "dark" ? (
                /* Sun icon */
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
                </svg>
              ) : (
                /* Moon icon */
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <button
              onClick={openSearch}
              aria-label="Search"
              className="th-fg hover:text-[#c4a97d] transition-colors"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Basket */}
            <button onClick={openDrawer} aria-label="Basket" className="relative th-fg hover:text-[#c4a97d] transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c4a97d] text-[#0c0b09] rounded-full w-4 h-4 text-[9px] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen nav overlay ── */}
      <div
        className={`fixed inset-0 z-[300] th-bg flex flex-col transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay header bar */}
        <div className="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-[rgba(196,169,125,0.12)]">
          <span className="text-[9px] tracking-[0.5em] text-[#8a8076] uppercase">Menu</span>
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm tracking-[0.45em] text-[#e8e0d4] uppercase font-light"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Space Perfumes
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-[#e8e0d4] hover:text-[#c4a97d] transition-colors"
            aria-label="Close menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-5 px-6 overflow-y-auto py-10">
          {navLinks.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`transition-colors duration-200 hover:text-[#c4a97d] anim-fade-up ${
                i < 2
                  ? "text-3xl sm:text-4xl font-light tracking-[0.2em] text-[#e8e0d4] uppercase"
                  : "text-xs tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d]"
              }`}
              style={{
                fontFamily: i < 2 ? "var(--font-cormorant)" : "inherit",
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle row — mobile only */}
        <div className="sm:hidden flex items-center justify-center px-6 py-5 border-t border-[rgba(196,169,125,0.12)]">
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-3 text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors"
          >
            {theme === "dark" ? (
              <>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>

        {/* Social row */}
        <div className="flex items-center justify-center gap-8 px-6 py-7 border-t border-[rgba(196,169,125,0.12)]">
          {[
            { label: "Instagram", href: "https://www.instagram.com/space__perfumes_" },
            { label: "Facebook", href: "https://www.facebook.com/people/Space-Perfumes/61573867521816/" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Search overlay ── */}
      <div
        className={`fixed inset-0 z-[400] bg-[#0c0b09]/96 flex flex-col items-center pt-32 p-6 transition-all duration-300 ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={closeSearch}
          className="absolute top-6 right-6 text-[#e8e0d4] hover:text-[#c4a97d] transition-colors"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="w-full max-w-xl max-h-[calc(100vh-9rem)] overflow-y-auto no-scrollbar">
          <p className="text-[9px] tracking-[0.55em] text-[#8a8076] uppercase text-center mb-8">Search</p>

          {/* Input */}
          <form
            className="relative"
            onSubmit={(e) => { e.preventDefault(); showAllResults(); }}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, brand, note, inspired-by…"
              className="w-full bg-transparent border-b border-[rgba(196,169,125,0.4)] pb-3 text-[#e8e0d4] placeholder-[#8a8076] text-sm tracking-wider outline-none focus:border-[#c4a97d] transition-colors pr-8"
            />
            <svg className="absolute right-0 top-0 text-[#8a8076]" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </form>

          {/* Hint */}
          {!trimmed && (
            <p className="mt-4 text-[9px] tracking-[0.3em] text-[#8a8076] uppercase text-center">
              Search by name, brand, note or inspiration
            </p>
          )}

          {/* Results */}
          {results.length > 0 && (
            <ul className="mt-6 divide-y divide-[rgba(196,169,125,0.08)]">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.id}`}
                    onClick={handleResultClick}
                    className="flex items-center justify-between py-4 group hover:pl-1 transition-all duration-200"
                  >
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-[#8a8076] uppercase mb-[3px]">{p.house}</p>
                      <p className="text-sm tracking-[0.15em] text-[#e8e0d4] uppercase group-hover:text-[#c4a97d] transition-colors">
                        {p.name}
                      </p>
                      <p className="text-[8px] text-[#8a8076] mt-1">{p.notes.slice(0, 3).join(" · ")}</p>
                    </div>
                    <span
                      className="text-[7px] tracking-[0.35em] uppercase border px-2 py-[3px] flex-shrink-0"
                      style={{ color: lineColor[p.line], borderColor: lineColor[p.line] + "55" }}
                    >
                      {p.line}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* View all — the overlay only previews the top matches */}
          {matches.length > results.length && (
            <button
              onClick={showAllResults}
              className="mt-6 w-full text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase text-center hover:text-[#e8e0d4] transition-colors"
            >
              View all {matches.length} results →
            </button>
          )}

          {/* No results */}
          {trimmed && matches.length === 0 && (
            <p className="mt-8 text-[9px] tracking-[0.4em] text-[#8a8076] uppercase text-center">
              No fragrances found for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>
    </>
  );
}

