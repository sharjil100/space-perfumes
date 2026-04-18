import Link from "next/link";

export const metadata = { title: "Refund Policy — Space Perfumes" };

export default function RefundPolicy() {
  return (
    <div className="th-bg min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[8px] tracking-[0.7em] text-[#c4a97d] uppercase mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-light text-[#e8e0d4] mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            Refund Policy
          </h1>
          <div className="w-10 h-px bg-[rgba(196,169,125,0.4)]" />
        </div>

        <div className="space-y-10 text-[13px] leading-relaxed text-[#8a8076]">

          <section>
            <p>
              At Space Perfumes, customer satisfaction is our priority. We offer authentic fragrance decants and full bottles, and we stand behind the quality of every order. Please read our refund and return policy carefully before placing an order.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Return Eligibility</h2>
            <p className="mb-4">We accept returns under the following conditions:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Decants that are <strong className="text-[#e8e0d4]">un-sprayed</strong> and in their original packaging.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Full bottles that are <strong className="text-[#e8e0d4]">unopened</strong> with cellophane or seal intact.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Products that arrived <strong className="text-[#e8e0d4]">damaged or incorrect</strong>, verified at the time of delivery.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>A valid proof of purchase (order ID) must be provided.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Non-Returnable Items</h2>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Opened or used full bottles.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Decants that have been sprayed or tested.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Products returned beyond the 48-hour window.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Return Window</h2>
            <p>
              All return requests must be submitted within <strong className="text-[#e8e0d4]">48 hours</strong> of receiving your order. Requests made after this period will not be accepted. To initiate a return, contact us with your order ID and a description of the issue.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Exchanges</h2>
            <p>
              Eligible unused or defective products may be exchanged at the point of delivery (hand-to-hand). In such cases, Space Perfumes covers the courier fees for the exchange. Please inspect your order in the presence of the delivery agent before accepting it.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Refund Options</h2>
            <p className="mb-4">Once your return is verified and approved, you may choose from:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Full refund</strong> to your original payment method.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Store credit</strong> for a future purchase.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Partial refund</strong> depending on the condition of the returned item.</span></li>
            </ul>
            <p className="mt-4">Approved refunds are processed within <strong className="text-[#e8e0d4]">24 hours</strong> of verification.</p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Order Cancellations</h2>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Cancellations made <strong className="text-[#e8e0d4]">before shipment</strong> are free of charge.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Cancellations after dispatch may incur courier and processing fees.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Lost or Delayed Shipments</h2>
            <p>
              Space Perfumes assumes full responsibility for packages confirmed lost in transit. If your order has not arrived within <strong className="text-[#e8e0d4]">7 days</strong> of the expected delivery date, please contact us and we will investigate or issue a replacement.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Contact Us</h2>
            <p>
              For return requests or any concerns, reach us at{" "}
              <a href="mailto:Spaceperfume27@gmail.com" className="text-[#c4a97d] hover:text-[#e8e0d4] transition-colors">
                Spaceperfume27@gmail.com
              </a>
              {" "}with your order ID and details.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[rgba(196,169,125,0.1)]">
          <Link href="/" className="text-[9px] tracking-[0.4em] text-[#8a8076] uppercase hover:text-[#c4a97d] transition-colors">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
