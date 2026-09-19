import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const url = new URL(request.url);
  const paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");
  if (!token || !paymentId) return NextResponse.json({ received: true });
  const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!paymentResponse.ok) return NextResponse.json({ received: true });
  const payment = await paymentResponse.json();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey && payment.external_reference) {
    const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    await supabase.from("orders").update({ status: payment.status, mercado_pago_payment_id: String(payment.id), updated_at: new Date().toISOString() }).eq("id", payment.external_reference);
  }
  return NextResponse.json({ received: true });
}
