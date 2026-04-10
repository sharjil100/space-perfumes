"use client";

import { useState, useEffect, useRef } from "react";

let hasEnteredThisLoad = false;

const TOTAL_DURATION = 4400; // ms before auto-exit
const EXIT_DURATION  = 900;

export default function LoadingSplash() {
  const [phase, setPhase] = useState<"hidden" | "show" | "exit">("hidden");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  useEffect(() => {
    if (hasEnteredThisLoad) return;
    setPhase("show");
    addTimer(() => {
      hasEnteredThisLoad = true;
      setPhase("exit");
      addTimer(() => setPhase("hidden"), EXIT_DURATION + 100);
    }, TOTAL_DURATION);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  if (phase === "hidden") return null;

  const exiting = phase === "exit";

  return (
    <>
      <style id="splash-styles">{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(40px,-60px) scale(1.12); }
          66%      { transform: translate(-30px,30px) scale(0.94); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-50px,40px) scale(1.08); }
          70%      { transform: translate(35px,-35px) scale(0.96); }
        }
        @keyframes logoReveal {
          from { opacity:0; transform:translateY(-90px) scale(0.92); filter:blur(8px); }
          to   { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
        }
        @keyframes shimmerLine {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
        @keyframes fromLeft {
          from { opacity:0; transform:translateX(-90px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fromRight {
          from { opacity:0; transform:translateX(90px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fromTop {
          from { opacity:0; transform:translateY(-70px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fromBottom {
          from { opacity:0; transform:translateY(70px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fromTopLeft {
          from { opacity:0; transform:translate(-70px,-55px); }
          to   { opacity:1; transform:translate(0,0); }
        }
        @keyframes fromBottomRight {
          from { opacity:0; transform:translate(70px,55px); }
          to   { opacity:1; transform:translate(0,0); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes curtainUp {
          from { transform:scaleY(1); }
          to   { transform:scaleY(0); }
        }
        @keyframes particle {
          0%   { transform:translateY(0) translateX(0) scale(1); opacity:0.7; }
          100% { transform:translateY(-120px) translateX(var(--dx)) scale(0); opacity:0; }
        }
        .sp-logo          { animation: logoReveal 1.5s cubic-bezier(.16,.84,.44,1) both; }
        .sp-shimmer       { animation: shimmerLine 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-from-left     { animation: fromLeft 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-from-right    { animation: fromRight 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-from-top      { animation: fromTop 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-from-bottom   { animation: fromBottom 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-from-tl       { animation: fromTopLeft 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-from-br       { animation: fromBottomRight 1s cubic-bezier(.22,.61,.36,1) both; }
        .sp-fade-up       { animation: fadeInUp 0.85s ease both; }
        .curtain-exit {
          animation: curtainUp ${EXIT_DURATION}ms cubic-bezier(.85,0,.15,1) forwards;
          transform-origin: bottom;
        }
        @keyframes contentFadeOut {
          from { opacity:1; }
          to   { opacity:0; }
        }
        .content-exit {
          animation: contentFadeOut 300ms ease forwards;
        }
      `}</style>

      <div
        id="splash-root"
        className={`fixed inset-0 z-[9999] ${exiting ? "pointer-events-none" : ""}`}
      >
        {/* Curtain */}
        <div className={`absolute inset-0 bg-[#0c0b09] ${exiting ? "curtain-exit" : ""}`} />

        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle,#c4a97d 0%,transparent 70%)", top: "10%", left: "20%", animation: "orbFloat1 14s ease-in-out infinite" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle,#9a7a5a 0%,transparent 70%)", bottom: "15%", right: "18%", animation: "orbFloat2 18s ease-in-out infinite" }} />
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        {/* Particles */}
        {[...Array(9)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-[#c4a97d]"
            style={{
              left: `${15 + i * 9}%`, bottom: `${20 + (i % 3) * 15}%`,
              ["--dx" as string]: `${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}px`,
              animation: `particle ${3 + i * 0.7}s ease-out ${i * 0.4}s infinite`,
              opacity: 0, width: i % 3 === 0 ? "2px" : "1px", height: i % 3 === 0 ? "2px" : "1px",
            }}
          />
        ))}

        {/* Centered content */}
        <div className={`relative z-10 flex flex-col items-center justify-center h-full px-6 ${exiting ? "content-exit" : ""}`}>

          {/* Logo — drops from top */}
          <div className="sp-logo mb-6" style={{ animationDelay: "0.1s" }}>
            <img src="/space-logo.png" alt="Space Perfumes"
              className="h-44 sm:h-60 md:h-72 w-auto object-contain" />
          </div>

          {/* Top shimmer line */}
          <div className="w-14 h-px bg-[#c4a97d] origin-left sp-shimmer mb-10"
            style={{ animationDelay: "1.0s" }} />

          {/* Punchline — each word from a different angle */}
          <div className="flex flex-wrap justify-center items-baseline gap-x-4 gap-y-2"
            style={{ fontFamily: "var(--font-cormorant)" }}>

            <span className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e8e0d4] tracking-wide sp-from-tl"
              style={{ animationDelay: "1.3s" }}>A</span>

            <span className="text-4xl sm:text-5xl md:text-6xl font-light text-[#c4a97d] tracking-wide sp-from-left"
              style={{ animationDelay: "1.6s" }}>Memory</span>

            <span className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e8e0d4] tracking-wide sp-from-top"
              style={{ animationDelay: "1.9s" }}>Held</span>

            <span className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e8e0d4] tracking-wide sp-from-right"
              style={{ animationDelay: "2.2s" }}>in</span>

            <span className="text-4xl sm:text-5xl md:text-6xl font-light text-[#c4a97d] tracking-wide sp-from-br"
              style={{ animationDelay: "2.5s" }}>Time.</span>

          </div>

          {/* Bottom shimmer line */}
          <div className="w-14 h-px bg-[#c4a97d] origin-left sp-shimmer mt-10 mb-6"
            style={{ animationDelay: "3.0s" }} />

          {/* Brand tag */}
          <span className="text-[9px] tracking-[0.7em] text-[#8a8076] uppercase sp-fade-up"
            style={{ animationDelay: "3.2s" }}>
            Space Perfumes · est. 2026
          </span>

        </div>
      </div>
    </>
  );
}

