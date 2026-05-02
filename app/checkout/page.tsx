"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "../lib/cart";
import { fadeUp, stagger } from "../lib/motion";

/* ── helpers ─────────────────────────────────────────────────────── */
function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SP-${ts}-${rand}`;
}

const shippingOptions = [
  { label: "Inside Dhaka", price: 80 },
  { label: "Outside Dhaka", price: 120 },
];

type PaymentMethod = "cod" | "bank" | "bkash";

const inputCls =
  "w-full bg-[#111] border border-[#2a2a2a] text-[#e8e0d4] text-sm px-4 py-3 focus:outline-none focus:border-[#c4a97d] transition-colors placeholder:text-[#444]";

/* ═══════════════════════════════════════════════════════════════════ */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Shipping
  const [shippingIdx, setShippingIdx] = useState(0);
  const shipping = shippingOptions[shippingIdx].price;

  // Payment
  const [payment, setPayment] = useState<PaymentMethod>("cod");

  // Discount
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0);
  const [discountError, setDiscountError] = useState("");

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = subtotal - discountApplied + shipping;

  function applyDiscount() {
    // placeholder — can be wired to Supabase discount codes later
    setDiscountError("Invalid discount code");
    setDiscountApplied(0);
  }

  async function handleSubmit() {
    if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setError("");
    setSubmitting(true);

    const orderId = generateOrderId();

    const orderData = {
      orderId,
      customer: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        address: address.trim(),
        apartment: apartment.trim(),
        city: city.trim(),
        postalCode: postalCode.trim(),
        phone: phone.trim(),
        country: "Bangladesh",
      },
      items: items.map((i) => ({
        name: i.name,
        house: i.house,
        ml: i.ml,
        qty: i.qty,
        price: i.price,
        imageUrl: i.imageUrl,
      })),
      shipping: shippingOptions[shippingIdx],
      payment,
      subtotal,
      discount: discountApplied,
      total,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to place order");
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0 && !submitting) {
    return (
      <div className="th-bg min-h-screen flex flex-col items-center justify-center gap-6 pt-24">
        <svg width="56" height="56" fill="none" stroke="#8a8076" strokeWidth="1" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <p className="text-[10px] tracking-[0.4em] text-[#8a8076] uppercase">Your cart is empty</p>
        <Link
          href="/product"
          className="text-[9px] tracking-[0.45em] text-[#c4a97d] uppercase border border-[#c4a97d] px-8 py-3 hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="th-bg min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors mb-8"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-12">
          <motion.p variants={fadeUp} className="text-[9px] tracking-[0.6em] text-[#8a8076] uppercase mb-2">
            Checkout
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-light text-[#e8e0d4] tracking-wide"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Complete Your Order
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── LEFT COLUMN: Form ── */}
          <div className="lg:col-span-7 space-y-10">

            {/* Contact / Delivery */}
            <section>
              <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Delivery Information</h2>
              <div className="space-y-4">
                {/* Country */}
                <div>
                  <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Country / Region</label>
                  <div className="w-full bg-[#111] border border-[#2a2a2a] text-[#8a8076] text-sm px-4 py-3 cursor-not-allowed">
                    Bangladesh
                  </div>
                </div>

                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">First Name *</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Last Name *</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className={inputCls} />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Address *</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, Street, Area" className={inputCls} />
                </div>

                {/* Apartment */}
                <div>
                  <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Apartment, Suite, etc. (optional)</label>
                  <input value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="Apartment, suite, unit, etc." className={inputCls} />
                </div>

                {/* City + Postal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">City *</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Dhaka" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Postal Code (optional)</label>
                    <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="e.g. 1205" className={inputCls} />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Phone *</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880..." className={inputCls} />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase block mb-1.5">Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
                  <p className="text-[9px] text-[#5a5048] mt-1.5 tracking-[0.15em]">Your order confirmation will be sent here.</p>
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section>
              <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-6">Shipping Method</h2>
              <div className="space-y-3">
                {shippingOptions.map((opt, idx) => (
                  <label
                    key={opt.label}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      shippingIdx === idx
                        ? "border-[#c4a97d] bg-[rgba(196,169,125,0.05)]"
                        : "border-[#2a2a2a] hover:border-[#c4a97d]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        shippingIdx === idx ? "border-[#c4a97d]" : "border-[#444]"
                      }`}>
                        {shippingIdx === idx && <div className="w-2 h-2 rounded-full bg-[#c4a97d]" />}
                      </div>
                      <span className="text-sm text-[#e8e0d4]">{opt.label}</span>
                    </div>
                    <span className="text-sm text-[#c4a97d]">৳{opt.price}.00</span>
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingIdx === idx}
                      onChange={() => setShippingIdx(idx)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase mb-2">Payment</h2>
              <p className="text-[9px] text-[#8a8076] tracking-[0.2em] mb-6">All transactions are secure and encrypted.</p>

              <div className="space-y-3">
                {/* COD */}
                <PaymentOption
                  id="cod"
                  label="Cash on Delivery (COD)"
                  selected={payment === "cod"}
                  onSelect={() => setPayment("cod")}
                />

                {/* Bank Deposit */}
                <PaymentOption
                  id="bank"
                  label="Bank Deposit"
                  selected={payment === "bank"}
                  onSelect={() => setPayment("bank")}
                >
                  <div className="mt-4 space-y-4">
                    <h3 className="text-[10px] tracking-[0.4em] text-[#c4a97d] uppercase">Direct Bank Transfer (NPSB)</h3>
                    <div className="space-y-3 text-[11px] leading-relaxed text-[#8a8076]">
                      <p>• Make your payment directly into our bank account using <strong className="text-[#e8e0d4]">ONLY &quot;NPSB&quot;</strong> transfers.</p>
                      <p>• Please use your <strong className="text-[#e8e0d4]">&quot;ORDER ID&quot;</strong> as the <strong className="text-[#e8e0d4]">&quot;PAYMENT REFERENCE&quot;</strong>.</p>
                      <p>• Your order <strong className="text-[#e8e0d4]">WILL NOT BE SHIPPED until the FUNDS HAVE CLEARED</strong> in our account.</p>
                      <p>• Unpaid orders are <strong className="text-[#e8e0d4]">HELD FOR A MAXIMUM OF 24 HOURS</strong>.</p>
                      <p>• In case of ordered items being <strong className="text-[#e8e0d4]">OUT OF STOCK</strong>, the <strong className="text-[#e8e0d4]">COMPLETE PAID AMOUNT IS ELIGIBLE FOR REFUND</strong>.</p>
                    </div>
                    <div className="border border-[rgba(196,169,125,0.2)] p-4 mt-4 space-y-2">
                      <p className="text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase mb-3">Bank Details</p>
                      <Row label="Account Name" value="Mustafa Dilir Daiyan" />
                      <Row label="Account ID" value="1291570006538" />
                      <Row label="Bank Name" value="Dutch Bangla Bank Ltd" />
                      <Row label="Branch" value="O.R.Nizam Road Branch" />
                      <Row label="Routing" value="090151480" />
                    </div>
                  </div>
                </PaymentOption>

                {/* bKash Send Money */}
                <PaymentOption
                  id="bkash"
                  label="Send Money with bKash"
                  selected={payment === "bkash"}
                  onSelect={() => setPayment("bkash")}
                >
                  <div className="mt-4 space-y-3">
                    <div className="border border-[rgba(196,169,125,0.2)] p-4">
                      <p className="text-[9px] tracking-[0.4em] text-[#c4a97d] uppercase mb-2">bKash Personal Number (Send Money)</p>
                      <p className="text-lg text-[#e8e0d4] tracking-wider font-light">+8801996716966</p>
                    </div>
                    <ol className="space-y-2 text-[11px] leading-relaxed text-[#8a8076] list-decimal list-inside">
                      <li>Use <strong className="text-[#e8e0d4]">(Send Money)</strong> option from bKash app and use the number provided above.</li>
                      <li><strong className="text-[#e8e0d4]">Copy the Order ID</strong> of this order and paste it in the Payments <strong className="text-[#e8e0d4]">&quot;Reference Section&quot;</strong>.</li>
                      <li>The payment amount should be the Order <strong className="text-[#e8e0d4]">&quot;Total&quot;</strong> you see in this page.</li>
                      <li>We will not process the order until the funds clear in our account.</li>
                    </ol>
                  </div>
                </PaymentOption>
              </div>
            </section>

            {/* Submit */}
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#c4a97d] text-[#0c0b09] text-[10px] tracking-[0.5em] uppercase py-5 font-medium hover:bg-[#d4b98d] transition-colors disabled:opacity-50"
            >
              {submitting ? "Processing…" : "Complete Order"}
            </button>

            {/* Policy links */}
            <div className="flex flex-wrap gap-6 justify-center pt-4 pb-8">
              {[
                { label: "Privacy Policy", href: "/policies/privacy" },
                { label: "Refund Policy", href: "/policies/refund" },
                { label: "Terms of Service", href: "/policies/terms" },
                { label: "Contact", href: "/about" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[9px] tracking-[0.3em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors border-b border-[rgba(196,169,125,0.15)] pb-px"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Order Summary ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="border border-[rgba(196,169,125,0.15)] p-6 space-y-6">
                <h2 className="text-[10px] tracking-[0.5em] text-[#c4a97d] uppercase">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.ml}`} className="flex gap-4 items-center">
                      {/* Thumbnail + qty badge */}
                      <div className="shrink-0 relative">
                        <div className="w-14 h-18 overflow-hidden border border-[rgba(196,169,125,0.15)]" style={{ height: "4.5rem" }}>
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#1e1b16]" />
                          )}
                        </div>
                        <span className="absolute -top-2 -right-2 bg-[#c4a97d] text-[#0c0b09] rounded-full w-5 h-5 text-[9px] flex items-center justify-center font-bold leading-none z-10">
                          {item.qty}
                        </span>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] tracking-[0.12em] text-[#e8e0d4] uppercase line-clamp-2 leading-relaxed font-medium">
                          {item.name}
                        </p>
                        <p className="text-[9px] tracking-[0.3em] text-[#c4a97d] uppercase mt-1">
                          {item.ml}ml · {item.house}
                        </p>
                      </div>
                      <p className="text-sm text-[#e8e0d4] tracking-wider shrink-0 font-light">
                        ৳{item.price * item.qty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-[rgba(196,169,125,0.12)]" />

                {/* Discount */}
                <div>
                  <p className="text-[9px] tracking-[0.35em] text-[#8a8076] uppercase mb-2">Discount Code</p>
                  <div className="flex gap-2">
                    <input
                      value={discountCode}
                      onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(""); }}
                      placeholder="Enter code"
                      className="flex-1 bg-[#111] border border-[#2a2a2a] text-[#e8e0d4] text-sm px-3 py-2 focus:outline-none focus:border-[#c4a97d] transition-colors placeholder:text-[#444]"
                    />
                    <button
                      onClick={applyDiscount}
                      className="border border-[#c4a97d] text-[#c4a97d] text-[9px] tracking-[0.3em] uppercase px-4 hover:bg-[#c4a97d] hover:text-[#0c0b09] transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && <p className="text-red-400 text-[9px] mt-1">{discountError}</p>}
                </div>

                {/* Divider */}
                <div className="h-px bg-[rgba(196,169,125,0.12)]" />

                {/* Cost breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a8076]">Subtotal</span>
                    <span className="text-[#e8e0d4]">৳{subtotal}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8a8076]">Discount</span>
                      <span className="text-green-400">−৳{discountApplied}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8a8076]">Shipping</span>
                    <span className="text-[#e8e0d4]">৳{shipping}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[rgba(196,169,125,0.12)]" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-[#8a8076]">Total</span>
                    <span className="text-[9px] tracking-[0.3em] text-[#8a8076] ml-2">BDT</span>
                  </div>
                  <span className="text-2xl text-[#c4a97d] tracking-wider font-light">৳{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */

function PaymentOption({
  id,
  label,
  selected,
  onSelect,
  children,
}: {
  id: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`border transition-colors ${
        selected ? "border-[#c4a97d] bg-[rgba(196,169,125,0.03)]" : "border-[#2a2a2a]"
      }`}
    >
      <label className="flex items-center gap-3 p-4 cursor-pointer" onClick={onSelect}>
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-[#c4a97d]" : "border-[#444]"
          }`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-[#c4a97d]" />}
        </div>
        <span className="text-sm text-[#e8e0d4]">{label}</span>
        <input type="radio" name="payment" value={id} checked={selected} onChange={onSelect} className="sr-only" />
      </label>
      {selected && children && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px]">
      <span className="text-[#8a8076]">{label}</span>
      <span className="text-[#e8e0d4] font-mono tracking-wider">{value}</span>
    </div>
  );
}
