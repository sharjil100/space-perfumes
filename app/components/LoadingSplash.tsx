"use client";

import { useState, useEffect, useRef } from "react";

// Module-level flag — resets on full page refresh, survives client-side navigation
let hasEnteredThisLoad = false;

const LOGO_DURATION   = 2200;  // ms before language picker appears
const EXIT_DURATION   = 900;   // ms for exit curtain

export default function LoadingSplash() {
  const [phase, setPhase]     = useState<"hidden" | "loading" | "select" | "exit">("hidden");
  const timers                = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  useEffect(() => {
    if (hasEnteredThisLoad) return;
    setPhase("loading");
    addTimer(() => setPhase("select"), LOGO_DURATION);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    hasEnteredThisLoad = true;
    setPhase("exit");
    addTimer(() => setPhase("hidden"), EXIT_DURATION + 100);
  };

  if (phase === "hidden") return null;

  const exiting = phase === "exit";

  return (
    <>
      <style id="splash-styles">{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -60px) scale(1.12); }
          66%       { transform: translate(-30px, 30px) scale(0.94); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-50px, 40px) scale(1.08); }
          70%       { transform: translate(35px, -35px) scale(0.96); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(25px, 50px) scale(1.1); }
        }
        @keyframes shimmerLine {
          0%   { transform: scaleX(0); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(24px); clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; transform: translateY(0);    clip-path: inset(0 0 0% 0); }
        }
        @keyframes revealFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196,169,125,0); }
          50%       { box-shadow: 0 0 22px 4px rgba(196,169,125,0.18); }
        }
        @keyframes curtainUp {
          from { transform: scaleY(1); }
          to   { transform: scaleY(0); }
        }
        @keyframes particle {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-120px) translateX(var(--dx)) scale(0); opacity: 0; }
        }
        .splash-revealUp  { animation: revealUp  0.85s cubic-bezier(.22,.61,.36,1) both; }
        .splash-revealFade{ animation: revealFade 0.7s  ease both; }
        .splash-shimmer   { animation: shimmerLine 1s  cubic-bezier(.22,.61,.36,1) both; }
        .enter-pulse      { animation: subtlePulse 2.4s ease-in-out infinite; }
        .curtain-exit     {
          animation: curtainUp ${EXIT_DURATION}ms cubic-bezier(.85,0,.15,1) forwards;
          transform-origin: bottom;
        }
      `}</style>

      {/* ── Outer wrapper — always dark, exempt from light mode via #splash-root ── */}
      <div
        id="splash-root"
        className={`fixed inset-0 z-[9999] transition-opacity duration-200 ${
          exiting ? "pointer-events-none" : ""
        }`}
      >
        {/* ── Curtain exit — slides up from bottom ── */}
        <div
          className={`absolute inset-0 bg-[#0c0b09] ${exiting ? "curtain-exit" : ""}`}
        />

        {/* ── Background ambient orbs ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12]"
            style={{
              background: "radial-gradient(circle, #c4a97d 0%, transparent 70%)",
              top: "10%", left: "20%",
              animation: "orbFloat1 14s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]"
            style={{
              background: "radial-gradient(circle, #9a7a5a 0%, transparent 70%)",
              bottom: "15%", right: "18%",
              animation: "orbFloat2 18s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, #e8e0d4 0%, transparent 70%)",
              top: "55%", left: "55%",
              animation: "orbFloat3 22s ease-in-out infinite",
            }}
          />
        </div>

        {/* ── Grain overlay ── */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating particles */}
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px rounded-full bg-[#c4a97d]"
            style={{
              left: `${15 + i * 9}%`,
              bottom: `${20 + (i % 3) * 15}%`,
              ["--dx" as string]: `${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}px`,
              animation: `particle ${3 + i * 0.7}s ease-out ${i * 0.4}s infinite`,
              opacity: 0,
              width: i % 3 === 0 ? "2px" : "1px",
              height: i % 3 === 0 ? "2px" : "1px",
            }}
          />
        ))}

        {/* ── Centered content ── */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">

          {/* Top horizontal line — animates in */}
          <div
            className="w-12 h-px bg-[#c4a97d] origin-left mb-10 splash-shimmer"
            style={{ animationDelay: "0.2s" }}
          />

          {/* Est. tag */}
          <span
            className="text-[9px] tracking-[0.75em] text-[#c4a97d] uppercase mb-6 splash-revealFade"
            style={{ animationDelay: "0.4s" }}
          >
            est. 2026
          </span>

          {/* Logo */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.45em] text-[#e8e0d4] uppercase splash-revealUp"
            style={{ fontFamily: "var(--font-cormorant)", animationDelay: "0.55s" }}
          >
            Space Perfumes
          </h1>

          {/* Tagline */}
          <p
            className="mt-4 text-[10px] tracking-[0.5em] text-[#8a8076] uppercase italic splash-revealFade"
            style={{
              fontFamily: "var(--font-cormorant)",
              animationDelay: "0.85s",
            }}
          >
            A memory held in time
          </p>

          {/* Bottom line */}
          <div
            className="w-12 h-px bg-[#c4a97d] origin-left mt-10 splash-shimmer"
            style={{ animationDelay: "1s" }}
          />

          {/* ── Language + Enter (phase === "select") ── */}
          {phase === "select" && (
            <div className="flex flex-col items-center gap-8 mt-14">

              <p
                className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase splash-revealFade"
                style={{ animationDelay: "0s" }}
              >
                Choose Your Language
              </p>

              <div className="flex gap-10 splash-revealFade" style={{ animationDelay: "0.12s" }}>
                <button className="text-[11px] tracking-[0.3em] text-[#e8e0d4] uppercase border-b border-[#c4a97d] pb-0.5 hover:text-[#c4a97d] transition-colors">
                  English
                </button>
                <button className="text-[11px] tracking-[0.3em] text-[#8a8076] uppercase pb-0.5 hover:text-[#c4a97d] transition-colors">
                  العربية
                </button>
              </div>

              <button
                onClick={handleEnter}
                className="enter-pulse mt-3 border border-[#c4a97d] px-16 py-4 text-[10px] tracking-[0.65em] text-[#c4a97d] uppercase hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all duration-300 splash-revealFade"
                style={{ animationDelay: "0.22s" }}
              >
                Enter
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

