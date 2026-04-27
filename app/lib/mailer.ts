import nodemailer from "nodemailer";

const ADMIN_EMAIL = "Spaceperfume27@gmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string | null;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  items: { name: string; house: string; ml: number; qty: number; price: number }[];
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
}

function paymentLabel(method: string) {
  const map: Record<string, string> = {
    cod: "Cash on Delivery",
    bank: "Bank Deposit (NPSB)",
    bkash: "Send Money with bKash",
  };
  return map[method] ?? method;
}

function itemRows(items: OrderEmailData["items"]) {
  return items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(196,169,125,0.12);">
          <div style="font-size:13px;color:#e8e0d4;">${i.name}</div>
          <div style="font-size:11px;color:#8a8076;margin-top:3px;">${i.ml}ml &middot; ${i.house}</div>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(196,169,125,0.12);text-align:center;color:#8a8076;font-size:13px;">&times;${i.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(196,169,125,0.12);text-align:right;color:#e8e0d4;font-size:13px;">&#2547;${i.price * i.qty}</td>
      </tr>`
    )
    .join("");
}

function shell(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Space Perfumes</title></head>
<body style="margin:0;padding:0;background:#0c0b09;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0b09;">
  <tr><td align="center" style="padding:48px 16px;">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr>
        <td style="text-align:center;padding-bottom:32px;">
          <p style="margin:0;font-size:8px;letter-spacing:0.65em;color:#c4a97d;text-transform:uppercase;">Space Perfumes</p>
          <div style="width:36px;height:1px;background:rgba(196,169,125,0.5);margin:12px auto 0;"></div>
        </td>
      </tr>
      <tr>
        <td style="background:#111009;border:1px solid rgba(196,169,125,0.18);padding:40px 36px;">
          ${body}
        </td>
      </tr>
      <tr>
        <td style="text-align:center;padding:28px 0;">
          <p style="margin:0;font-size:8px;letter-spacing:0.4em;color:#3a3530;text-transform:uppercase;">&copy; 2026 Space Perfumes &middot; Bangladesh</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function customerHtml(d: OrderEmailData) {
  return shell(`
    <h1 style="margin:0 0 6px;font-size:30px;font-weight:300;color:#e8e0d4;letter-spacing:0.04em;">Order Confirmed</h1>
    <p style="margin:0 0 32px;font-size:12px;letter-spacing:0.18em;color:#8a8076;">Thank you, ${d.customerName.split(" ")[0]}. We&rsquo;ve received your order.</p>

    <!-- Reference ID -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:#0c0b09;border:1px solid rgba(196,169,125,0.35);padding:22px;text-align:center;">
          <p style="margin:0 0 8px;font-size:8px;letter-spacing:0.55em;color:#8a8076;text-transform:uppercase;">Order Reference ID</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#c4a97d;letter-spacing:0.22em;font-family:'Courier New',monospace;">${d.orderId}</p>
          <p style="margin:10px 0 0;font-size:10px;color:#5a5048;line-height:1.6;">Use this ID as your payment reference if paying via bKash or Bank Transfer.</p>
        </td>
      </tr>
    </table>

    <!-- Items -->
    <p style="margin:0 0 10px;font-size:8px;letter-spacing:0.5em;color:#c4a97d;text-transform:uppercase;">Items Ordered</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${itemRows(d.items)}
    </table>

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="font-size:12px;color:#8a8076;padding:4px 0;">Subtotal</td>
        <td style="font-size:12px;color:#e8e0d4;text-align:right;padding:4px 0;">&#2547;${d.subtotal}</td>
      </tr>
      ${d.discount > 0 ? `<tr><td style="font-size:12px;color:#8a8076;padding:4px 0;">Discount</td><td style="font-size:12px;color:#7abf7a;text-align:right;padding:4px 0;">&minus;&#2547;${d.discount}</td></tr>` : ""}
      <tr>
        <td style="font-size:12px;color:#8a8076;padding:4px 0;">Shipping &mdash; ${d.shippingMethod}</td>
        <td style="font-size:12px;color:#e8e0d4;text-align:right;padding:4px 0;">&#2547;${d.shippingCost}</td>
      </tr>
      <tr><td colspan="2" style="border-top:1px solid rgba(196,169,125,0.2);padding-top:12px;"></td></tr>
      <tr>
        <td style="font-size:13px;color:#e8e0d4;font-weight:600;padding:4px 0;">Total (BDT)</td>
        <td style="font-size:20px;color:#c4a97d;font-weight:700;text-align:right;padding:4px 0;">&#2547;${d.total}</td>
      </tr>
    </table>

    <!-- Delivery + Payment -->
    <div style="border-top:1px solid rgba(196,169,125,0.15);padding-top:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:50%;padding-right:12px;">
            <p style="margin:0 0 8px;font-size:8px;letter-spacing:0.45em;color:#c4a97d;text-transform:uppercase;">Deliver To</p>
            <p style="margin:0;font-size:12px;color:#e8e0d4;line-height:1.8;">${d.customerName}<br>${d.address}${d.apartment ? "<br>" + d.apartment : ""}<br>${d.city}, ${d.country}</p>
          </td>
          <td style="vertical-align:top;width:50%;padding-left:12px;">
            <p style="margin:0 0 8px;font-size:8px;letter-spacing:0.45em;color:#c4a97d;text-transform:uppercase;">Payment Method</p>
            <p style="margin:0;font-size:12px;color:#e8e0d4;">${paymentLabel(d.paymentMethod)}</p>
          </td>
        </tr>
      </table>
    </div>
  `);
}

function adminHtml(d: OrderEmailData) {
  return shell(`
    <h1 style="margin:0 0 6px;font-size:26px;font-weight:300;color:#e8e0d4;">New Order Received</h1>
    <p style="margin:0 0 32px;font-size:12px;color:#8a8076;letter-spacing:0.15em;">A customer just placed an order on Space Perfumes.</p>

    <!-- Reference ID -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:#0c0b09;border:1px solid rgba(196,169,125,0.35);padding:22px;text-align:center;">
          <p style="margin:0 0 8px;font-size:8px;letter-spacing:0.55em;color:#8a8076;text-transform:uppercase;">Order Reference ID</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#c4a97d;letter-spacing:0.22em;font-family:'Courier New',monospace;">${d.orderId}</p>
        </td>
      </tr>
    </table>

    <!-- Customer details -->
    <p style="margin:0 0 10px;font-size:8px;letter-spacing:0.5em;color:#c4a97d;text-transform:uppercase;">Customer</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${[
        ["Name", d.customerName],
        ["Email", d.customerEmail],
        ["Phone", d.phone],
        ["Address", `${d.address}${d.apartment ? ", " + d.apartment : ""}, ${d.city}, ${d.country}`],
        ["Payment", paymentLabel(d.paymentMethod)],
        ["Shipping", `${d.shippingMethod} — ৳${d.shippingCost}`],
      ]
        .map(
          ([label, value]) => `
        <tr>
          <td style="font-size:11px;color:#8a8076;padding:5px 0;width:100px;">${label}</td>
          <td style="font-size:12px;color:#e8e0d4;padding:5px 0;">${value}</td>
        </tr>`
        )
        .join("")}
    </table>

    <!-- Items -->
    <p style="margin:0 0 10px;font-size:8px;letter-spacing:0.5em;color:#c4a97d;text-transform:uppercase;">Items</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${itemRows(d.items)}
    </table>

    <!-- Total -->
    <div style="border-top:1px solid rgba(196,169,125,0.2);padding-top:16px;text-align:right;">
      <p style="margin:0;font-size:20px;color:#c4a97d;font-weight:700;">Total: &#2547;${d.total}</p>
    </div>
  `);
}

export async function sendOrderEmails(data: OrderEmailData) {
  const sends = [
    transporter.sendMail({
      from: `"Space Perfumes" <${process.env.EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Order — ${data.orderId}`,
      html: adminHtml(data),
    }),
  ];

  if (data.customerEmail) {
    sends.push(
      transporter.sendMail({
        from: `"Space Perfumes" <${process.env.EMAIL_USER}>`,
        to: data.customerEmail,
        subject: `Order Confirmed — ${data.orderId} | Space Perfumes`,
        html: customerHtml(data),
      })
    );
  }

  await Promise.all(sends);
}
