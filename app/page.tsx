import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import { products } from "./lib/products";

const lines = [
  {
    name: "Arabian Line",
    key: "arabian",
    badge: "Best Sellers",
    sub: "Oud · Musk · Oriental Spice",
    gradient: "radial-gradient(ellipse at 50% 70%, #2e1f0e 0%, #130e07 100%)",
  },
  {
    name: "Designer Line",
    key: "designer",
    badge: "Luxury Maisons",
    sub: "Dior · Chanel · YSL · Versace",
    gradient: "radial-gradient(ellipse at 50% 30%, #1a1624 0%, #0d0b18 100%)",
  },
  {
    name: "Niche Line",
    key: "niche",
    badge: "Rare & Artisan",
    sub: "MFK · Serge Lutens · Parfums de Marly",
    gradient: "radial-gradient(ellipse at 40% 60%, #1a1e18 0%, #0e0f0a 100%)",
  },
];

const bestsellers = products.filter((p) => p.bestSeller).slice(0, 6);

export default function Home() {
  return (
    <div className="th-bg">

      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Tagline banner ── */}
      <section className="py-28 px-6 text-center border-b border-[rgba(196,169,125,0.1)]">
        <p className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-6">Authentic Decants</p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#e8e0d4] max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          The world&apos;s finest fragrances,<br />by the millilitre.
        </h2>
        <p className="mt-8 text-[9px] tracking-[0.45em] text-[#8a8076] uppercase">
          Arabian Line · Designer Line · Niche Line
        </p>
      </section>

      {/* ── Our 3 Lines ── */}
      <section className="py-20 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase text-center mb-14">Our Collections</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {lines.map((line) => (
              <div key={line.key} className="group cursor-pointer">
                <div
                  className="aspect-[3/4] overflow-hidden relative flex flex-col items-center justify-end pb-10"
                  style={{ background: line.gradient }}
                >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="py-20 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase text-center mb-2">
            Most Loved
          </p>
          <h2
            className="text-3xl font-light text-[#e8e0d4] tracking-wide text-center mb-14"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Best Sellers
          </h2>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-2 min-w-max lg:grid lg:grid-cols-6 lg:min-w-0">
              {bestsellers.map((p) => (
                <Link
                  key={p.id}
                  href="/product"
                  className="group flex-shrink-0 w-48 lg:w-auto"
                >
                  <div className="aspect-[3/4] overflow-hidden th-card mb-4 relative">
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-105 th-card" />
                    <span className="absolute top-2 left-2 text-[7px] tracking-[0.3em] uppercase bg-[#c4a97d] text-[#0c0b09] px-2 py-[3px]">
                      {p.line}
                    </span>
                  </div>
                  <p className="text-[8px] tracking-[0.35em] text-[#8a8076] uppercase mb-[2px]">{p.house}</p>
                  <h4 className="text-[10px] tracking-[0.2em] text-[#e8e0d4] uppercase mb-1 group-hover:text-[#c4a97d] transition-colors line-clamp-2 leading-relaxed">
                    {p.name}
                  </h4>
                  <p className="text-[9px] text-[#c4a97d]">from {p.sizes[0].price} SAR</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/product"
              className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
            >
              View All Fragrances
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand quote ── */}
      <section className="py-36 px-6 text-center border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-3xl mx-auto">
          <span
            className="block text-6xl font-light text-[#c4a97d] mb-6 leading-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            "
          </span>
          <p
            className="text-2xl sm:text-3xl font-light italic text-[#e8e0d4] leading-loose mb-12"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A fragrance that awakens memory and lingers like a whisper, carrying you through time, where emotions are never forgotten.
          </p>
          <Link
            href="/product"
            className="text-[9px] tracking-[0.55em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* ── Featured line banners ── */}
      <section className="py-20 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto">
          {/* Top: Arabian full-width */}
          <div
            className="featured-banner relative h-[22rem] flex flex-col items-center justify-center group overflow-hidden mb-6"
            style={{ background: "radial-gradient(ellipse at 50% 60%, #3a2510 0%, #0c0b09 100%)" }}
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
          </div>
          {/* Bottom: Designer + Niche side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="featured-banner relative h-[22rem] flex flex-col items-center justify-center group overflow-hidden"
              style={{ background: "radial-gradient(ellipse at 50% 40%, #1a1624 0%, #0c0b09 100%)" }}
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
            </div>
            <div
              className="featured-banner relative h-[22rem] flex flex-col items-center justify-center group overflow-hidden"
              style={{ background: "radial-gradient(ellipse at 50% 50%, #161c12 0%, #0c0b09 100%)" }}
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
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

