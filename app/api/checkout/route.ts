import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!token) return NextResponse.json({ error: "Falta configurar MERCADOPAGO_ACCESS_TOKEN" }, { status: 503 });
    const body = await request.json();
    const requestedItems = Array.isArray(body.items) ? body.items : [];
    const items = requestedItems.map((line: { id: string; quantity: number }) => {
      const product = products.find((candidate) => candidate.id === line.id);
      if (!product || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 10) return null;
      return { id: product.id, title: product.name, quantity: line.quantity, unit_price: product.price, currency_id: "ARS", picture_url: new URL(product.image, process.env.NEXT_PUBLIC_SITE_URL || request.url).toString() };
    }).filter(Boolean);
    if (!items.length || items.length !== requestedItems.length) return NextResponse.json({ error: "El carrito no es válido" }, { status: 400 });
    const orderId = crypto.randomUUID();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const preferenceResponse = await fetch("https://api.mercadopago.com/checkout/preferences", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Idempotency-Key": orderId }, body: JSON.stringify({ items, payer: { email: body.customer?.email, name: body.customer?.name, surname: body.customer?.surname }, external_reference: orderId, back_urls: { success: `${baseUrl}/checkout/success`, pending: `${baseUrl}/checkout/pending`, failure: `${baseUrl}/checkout/failure` }, auto_return: "approved", notification_url: `${baseUrl}/api/mercadopago/webhook`, statement_descriptor: "FOXSTORE", metadata: { order_id: orderId } }) });
    const preference = await preferenceResponse.json();
    if (!preferenceResponse.ok) return NextResponse.json({ error: preference.message || "Mercado Pago rechazó la solicitud" }, { status: 502 });
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
      await supabase.from("orders").insert({ id: orderId, status: "pending", customer: body.customer, items, total: items.reduce((sum: number, item: { unit_price: number; quantity: number }) => sum + item.unit_price * item.quantity, 0), mercado_pago_preference_id: preference.id });
    }
    return NextResponse.json({ initPoint: preference.init_point, orderId });
  } catch { return NextResponse.json({ error: "No pudimos iniciar el pago" }, { status: 500 }); }
}
