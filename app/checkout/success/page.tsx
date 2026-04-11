"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../lib/motion";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "—";

  return (
    <div className="th-bg min-h-screen flex items-center justify-center px-6 pt-24">
      <motion.div
        className="max-w-lg w-full text-center space-y-8"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        {/* Checkmark */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#c4a97d] flex items-center justify-center">
            <svg width="36" height="36" fill="none" stroke="#c4a97d" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>

        <motion.p variants={fadeUp} className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase">
          Order Confirmed
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-light text-[#e8e0d4] tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Thank You!
        </motion.h1>

        <motion.div variants={fadeUp} className="border border-[rgba(196,169,125,0.2)] p-6 space-y-3">
          <p className="text-[9px] tracking-[0.4em] text-[#8a8076] uppercase">Your Order ID</p>
          <p className="text-xl text-[#c4a97d] tracking-[0.25em] font-mono">{orderId}</p>
          <p className="text-[10px] text-[#8a8076] leading-relaxed">
            Please save this Order ID. If you chose bKash, Nagad, or Bank Transfer,
            use this as your payment reference.
          </p>
        </motion.div>

        <motion.p variants={fadeUp} className="text-xs text-[#8a8076] leading-relaxed max-w-sm mx-auto">
          We&apos;ll process your order shortly. For COD orders, you&apos;ll pay upon delivery.
          For prepaid orders, shipping begins once payment is confirmed.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/product"
            className="border border-[#c4a97d] text-[#c4a97d] text-[10px] tracking-[0.4em] uppercase px-8 py-3 hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="text-[10px] tracking-[0.4em] text-[#8a8076] uppercase px-8 py-3 hover:text-[#c4a97d] transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="th-bg min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}
