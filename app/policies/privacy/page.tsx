import Link from "next/link";

export const metadata = { title: "Privacy Policy — Space Perfumes" };

export default function PrivacyPolicy() {
  return (
    <div className="th-bg min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[8px] tracking-[0.7em] text-[#c4a97d] uppercase mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-light text-[#e8e0d4] mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            Privacy Policy
          </h1>
          <div className="w-10 h-px bg-[rgba(196,169,125,0.4)]" />
        </div>

        <div className="space-y-10 text-[13px] leading-relaxed text-[#8a8076]">

          <section>
            <p>
              Space Perfumes is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website or place an order with us.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect the following types of personal information:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Contact details</strong> — name, phone number, and email address.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Delivery information</strong> — address, city, and postal code.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Transaction data</strong> — order history, items purchased, and payment method selected.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Usage data</strong> — pages visited, time spent, and device or browser information.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">How We Use Your Information</h2>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>To process and fulfil your orders.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>To send order confirmation and delivery updates to your email.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>To respond to customer service enquiries.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>To improve our website and product offerings.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>To prevent fraud and ensure the security of transactions.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>To comply with applicable legal obligations.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Data Sharing</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your data only with trusted third parties who assist us in operating our business, including:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Payment processors (bKash, bank services) for transaction handling.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Courier and logistics partners for order delivery.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span>Cloud infrastructure and database providers (Supabase) for secure data storage.</span></li>
            </ul>
            <p className="mt-4">All third parties are required to handle your information in accordance with applicable privacy laws.</p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfil your orders, comply with legal obligations, and resolve disputes. You may request deletion of your account data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Access</strong> the personal data we hold about you.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Correct</strong> inaccurate or incomplete information.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Delete</strong> your personal data from our systems.</span></li>
              <li className="flex gap-3"><span className="text-[#c4a97d] mt-1">—</span><span><strong className="text-[#e8e0d4]">Opt out</strong> of promotional communications at any time.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Children&apos;s Privacy</h2>
            <p>
              Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with their data, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of our website after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.5em] text-[#c4a97d] uppercase mb-4">Contact Us</h2>
            <p>
              For any privacy-related enquiries, please reach us at{" "}
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
