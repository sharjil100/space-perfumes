import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, customer, items, shipping, payment, subtotal, discount, total } = body;

    if (!orderId || !customer?.firstName || !customer?.phone || !items?.length) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store order in Supabase
    const { error } = await supabase.from("orders").insert({
      order_id: orderId,
      customer_name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      address: customer.address,
      apartment: customer.apartment || null,
      city: customer.city,
      postal_code: customer.postalCode || null,
      country: customer.country,
      items: JSON.stringify(items),
      shipping_method: shipping.label,
      shipping_cost: shipping.price,
      payment_method: payment,
      subtotal,
      discount: discount || 0,
      total,
      status: "pending",
    });

    if (error) {
      console.error("Order insert error:", error);
      return Response.json({ error: "Failed to save order" }, { status: 500 });
    }

    // Send email notification via Supabase Edge Function or external service
    // For now, we store the order and it can be reviewed in admin/Supabase dashboard
    // You can add Resend/SendGrid integration later

    return Response.json({ success: true, orderId });
  } catch (err) {
    console.error("Order API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
