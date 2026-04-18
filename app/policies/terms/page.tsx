import Link from "next/link";

export const metadata = { title: "Terms of Service — Space Perfumes" };

export default function TermsOfService() {
  return (
    <div className="th-bg min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[8px] tracking-[0.7em] text-[#c4a97d] uppercase mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-light text-[#e8e0d4] mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            Terms of Service
          </h1>
          <div className="w-10 h-px bg-[rgba(196,169,125,0.4)]" />
        </div>

        <div className="space-y-10 text-[13px] leading-relaxed text-[#8a8076]">

          <section>
            <p>
              By accessing or using the Space Perfumes website and placing orders with us, you agree to be bound by the following Terms of Service. Please read them carefully before proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">A. Acceptance of Terms</h2>
            <p>
              By browsing our website or placing an order, you confirm that you have read, understood, and agreed to these Terms of Service. Space Perfumes reserves the right to modify these terms at any time. Continued use of the website after changes constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">B. Products & Authenticity</h2>
            <p className="mb-4">
              All fragrances sold by Space Perfumes are <strong className="text-[#e8e0d4]">100% authentic</strong>. We source directly from authorised channels. Our decants are transferred from original bottles into clean, sealed vials.
            </p>
            <p>
              Product images are for illustrative purposes only. Colours of decant bottles or packaging may vary slightly due to photography lighting and screen settings.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">C. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, and design — is the property of Space Perfumes and is protected under applicable copyright and intellectual property laws. Unauthorised reproduction or use of any content is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">D. Decanting Limitations</h2>
            <p className="mb-4">
              While we take the utmost care in the decanting process, Space Perfumes is not liable for:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Natural batch variations in fragrance character or longevity.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Minor colour changes due to oxidation or storage conditions after purchase.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Performance shifts caused by exposure to extreme temperatures or light.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Minor leakage resulting from improper storage after delivery.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">E. Orders & Pricing</h2>
            <p className="mb-4">
              Placing an order does not guarantee acceptance. Space Perfumes reserves the right to cancel or modify orders due to stock unavailability, pricing errors, or suspected fraudulent activity.
            </p>
            <p>
              All prices are listed in Bangladeshi Taka (BDT) and are subject to change without prior notice. Confirmed order prices will not be altered after checkout.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">F. Payments</h2>
            <p>
              We accept Cash on Delivery (COD), Bank Deposit via NPSB, and bKash (Send Money). For prepaid orders, payment must be completed and confirmed before your order is dispatched. Orders with unconfirmed payments after <strong className="text-[#e8e0d4]">24 hours</strong> may be cancelled.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">G. Prohibited Activities</h2>
            <p className="mb-4">Users of this website may not:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Submit false, fraudulent, or misleading information.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Reproduce or distribute our content without written permission.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Attempt to manipulate pricing, inventory, or order systems.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Use the website for any unlawful or unauthorised purpose.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">H. Limitation of Liability</h2>
            <p>
              Space Perfumes shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website, products, or services. Our total liability in any circumstance shall not exceed the value of the relevant order.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">I. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of <strong className="text-[#e8e0d4]">Bangladesh</strong>. Any disputes arising from these terms shall be subject to the jurisdiction of the courts of Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Contact Us</h2>
            <p>
              For questions regarding these terms, contact us at{" "}
              <a href="mailto:Spaceperfume27@gmail.com" className="text-[#c4a97d] hover:text-[#e8e0d4] transition-colors">
                Spaceperfume27@gmail.com
              </a>.
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
