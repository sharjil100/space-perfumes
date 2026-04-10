"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollBottleSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  // ── Main center bottle ────────────────────────────────────────
  const y = useTransform(scrollYProgress, [0, 0.55, 0.72, 0.82, 0.9], [-420, -40, 14, -6, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.7, 0.9], [10, 2, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.7, 0.82, 0.9], [0.88, 0.97, 1.03, 1]);

  // Mist glow expands when bottle lands
  const glowOpacity = useTransform(scrollYProgress, [0.72, 0.95], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.72, 0.95], [0.4, 1]);

  // Shadow grows as bottle lands
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [0, 0.2, 0.6]);
  const shadowScaleX = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.1, 0.5, 1]);

  // Text fades in after bottle lands
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.8, 1], [20, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[180vh] border-b border-[rgba(196,169,125,0.1)]"
      style={{ background: "radial-gradient(ellipse at 50% 80%, #1a1208 0%, #0c0b09 60%)" }}
    >
      {/* Sticky container — bottle and text stay centered while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[60vw] max-w-[560px] h-[30vh] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(196,169,125,0.07) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Bottle */}
        <motion.div
          style={{ y, rotate, opacity, scale }}
          className="relative z-10 flex flex-col items-center"
        >
          <img
            src="/hero-bottle-3.png"
            alt="Space Perfumes signature bottle"
            className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[480px] drop-shadow-2xl"
            draggable={false}
          />
          {/* Contact shadow under bottle base */}
          <motion.div
            style={{ opacity: shadowOpacity, scaleX: shadowScaleX }}
            className="w-[160px] sm:w-[200px] md:w-[260px] h-5 rounded-full -mt-3 pointer-events-none"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(196,169,125,0.55) 0%, rgba(100,70,30,0.18) 50%, transparent 75%)",
                filter: "blur(8px)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Landing mist / glow under the bottle */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[50vw] max-w-[420px] h-20 pointer-events-none"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(196,169,125,0.28) 0%, rgba(196,169,125,0.06) 50%, transparent 75%)",
              filter: "blur(12px)",
            }}
          />
        </motion.div>

        {/* Text that appears after landing */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center w-full px-6 pointer-events-none"
        >
          <p className="text-[8px] tracking-[0.65em] text-[#c4a97d] uppercase mb-3">
            Authentic Decants
          </p>
          <p
            className="text-2xl sm:text-3xl font-light text-[#e8e0d4]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A memory held in time.
          </p>
        </motion.div>

        {/* Scroll hint — fades out as you scroll */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] tracking-[0.5em] text-[#8a8076] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#c4a97d] to-transparent"
          />
        </motion.div>

      </div>
    </section>
  );
}
