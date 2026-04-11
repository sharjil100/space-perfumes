"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { fadeUp, stagger } from "../lib/motion";

type Review = {
  id: string;
  reviewer_name: string;
  platform: string;
  content: string;
  rating: number;
  screenshot_url?: string | null;
  featured: boolean;
};

const platformColor: Record<string, string> = {
  Instagram: "#e1306c",
  TikTok: "#69c9d0",
  Facebook: "#1877f2",
  WhatsApp: "#25d366",
  Twitter: "#1da1f2",
  Google: "#ea4335",
  Other: "#c4a97d",
};

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<Review | null>(null);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setReviews(data ?? []));
  }, []);

  if (reviews.length === 0) return null;

  const screenshotReviews = reviews.filter((r) => r.screenshot_url);
  const textReviews = reviews.filter((r) => !r.screenshot_url);

  return (
    <>
      {/* ── Section teaser ── */}
      <section className="py-24 px-6 lg:px-12 border-b border-[rgba(196,169,125,0.1)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-[9px] tracking-[0.65em] text-[#8a8076] uppercase mb-4">
              Real Experiences
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-light text-[#e8e0d4] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              What People Say About Us
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-[#8a8076] mb-10 max-w-md mx-auto">
              {reviews.length} verified {reviews.length === 1 ? "review" : "reviews"} from our customers across social media.
            </motion.p>

            <motion.button
              variants={fadeUp}
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-3 border border-[#c4a97d] text-[#c4a97d] text-[10px] tracking-[0.5em] uppercase px-10 py-4 hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all duration-300"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View All Reviews
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Gallery modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0c0b09]/96 backdrop-blur-sm overflow-y-auto"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <div className="max-w-6xl mx-auto px-6 py-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-2">Customer Reviews</p>
                  <h2 className="text-3xl font-light text-[#e8e0d4]" style={{ fontFamily: "var(--font-cormorant)" }}>
                    What People Say About Us
                  </h2>
                </div>
                <button onClick={() => setOpen(false)} className="text-[#8a8076] hover:text-[#e8e0d4] transition-colors">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Screenshots grid — priority section */}
              {screenshotReviews.length > 0 && (
                <div className="mb-12">
                  <p className="text-[9px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Screenshots</p>
                  <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                    {screenshotReviews.map((r) => (
                      <div
                        key={r.id}
                        className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm border border-[rgba(196,169,125,0.1)] hover:border-[rgba(196,169,125,0.35)] transition-colors"
                        onClick={() => setLightbox(r)}
                      >
                        <img src={r.screenshot_url!} alt={r.reviewer_name} className="w-full h-auto block" />
                        <div className="absolute inset-0 bg-[#0c0b09]/0 group-hover:bg-[#0c0b09]/40 transition-colors duration-300 flex items-end p-3">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[10px] tracking-[0.2em] text-white uppercase">{r.reviewer_name}</p>
                            <p className="text-[8px] text-[#c4a97d] tracking-[0.3em] uppercase mt-[2px]">{r.platform}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Text reviews */}
              {textReviews.length > 0 && (
                <div>
                  {screenshotReviews.length > 0 && (
                    <p className="text-[9px] tracking-[0.5em] text-[#8a8076] uppercase mb-6">Written Reviews</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {textReviews.map((r) => (
                      <div key={r.id} className="border border-[rgba(196,169,125,0.1)] p-6 flex flex-col gap-4">
                        <div className="flex gap-[3px]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-sm ${i < r.rating ? "text-[#c4a97d]" : "text-[#2a2a2a]"}`}>★</span>
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-[#8a8076] flex-1">"{r.content}"</p>
                        <div className="pt-3 border-t border-[rgba(196,169,125,0.08)]">
                          <p className="text-[11px] tracking-[0.2em] text-[#e8e0d4] uppercase">{r.reviewer_name}</p>
                          <p className="text-[9px] tracking-[0.25em] mt-[1px]" style={{ color: platformColor[r.platform] ?? "#c4a97d" }}>
                            {r.platform}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-h-[90vh] max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.screenshot_url!} alt={lightbox.reviewer_name} className="w-full h-auto max-h-[85vh] object-contain rounded-sm" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-white uppercase">{lightbox.reviewer_name}</p>
                  <p className="text-[9px] tracking-[0.3em] uppercase mt-[2px]" style={{ color: platformColor[lightbox.platform] ?? "#c4a97d" }}>{lightbox.platform}</p>
                </div>
                <button onClick={() => setLightbox(null)} className="text-[#8a8076] hover:text-white transition-colors text-xs tracking-[0.3em] uppercase">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
