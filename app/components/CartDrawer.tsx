"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../lib/cart";

export default function CartDrawer() {
  const { items, removeItem, updateQty, subtotal, totalItems, drawerOpen, closeDrawer } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[401] w-full max-w-md bg-[#0c0b09] border-l border-[rgba(196,169,125,0.12)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(196,169,125,0.12)]">
              <h2
                className="text-xl font-light text-[#e8e0d4] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Your Cart
              </h2>
              <button
                onClick={closeDrawer}
                className="text-[#8a8076] hover:text-[#e8e0d4] transition-colors"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <svg width="48" height="48" fill="none" stroke="#8a8076" strokeWidth="1" viewBox="0 0 24 24">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-[10px] tracking-[0.4em] text-[#8a8076] uppercase">Your cart is empty</p>
                  <Link
                    href="/product"
                    onClick={closeDrawer}
                    className="text-[9px] tracking-[0.45em] text-[#c4a97d] uppercase border-b border-[#c4a97d] pb-px hover:text-[#e8e0d4] hover:border-[#e8e0d4] transition-colors mt-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.ml}`}
                      className="flex gap-4 border-b border-[rgba(196,169,125,0.08)] pb-6"
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${item.productId}`}
                        onClick={closeDrawer}
                        className="shrink-0 w-20 h-24 bg-[#161410] overflow-hidden"
                      >
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#1e1b16]" />
                        )}
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <Link
                          href={`/product/${item.productId}`}
                          onClick={closeDrawer}
                          className="text-[10px] tracking-[0.18em] text-[#e8e0d4] uppercase hover:text-[#c4a97d] transition-colors line-clamp-2 leading-relaxed"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[8px] tracking-[0.3em] text-[#8a8076] uppercase mt-1">
                          {item.house} · {item.ml}ml
                        </p>
                        <p className="text-[11px] text-[#c4a97d] tracking-wider mt-auto">
                          ৳{item.price * item.qty}
                        </p>
                      </div>

                      {/* Qty + Remove */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.productId, item.ml)}
                          className="text-[#8a8076] hover:text-red-400 transition-colors"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-0 border border-[rgba(196,169,125,0.18)]">
                          <button
                            onClick={() => updateQty(item.productId, item.ml, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-7 h-7 flex items-center justify-center text-[#8a8076] hover:text-[#e8e0d4] disabled:opacity-30 transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="w-7 h-7 flex items-center justify-center text-[10px] text-[#e8e0d4] border-x border-[rgba(196,169,125,0.18)]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.productId, item.ml, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#8a8076] hover:text-[#e8e0d4] transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[rgba(196,169,125,0.12)] px-6 py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.4em] text-[#8a8076] uppercase">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="text-lg text-[#c4a97d] tracking-wider">৳{subtotal}</span>
                </div>
                <p className="text-[8px] text-[#8a8076] tracking-[0.2em]">
                  Shipping calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="block w-full text-center bg-[#c4a97d] text-[#0c0b09] text-[10px] tracking-[0.5em] uppercase py-4 font-medium hover:bg-[#d4b98d] transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  href="/product"
                  onClick={closeDrawer}
                  className="block w-full text-center text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
