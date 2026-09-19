"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useStore } from "./store-provider";

export function CheckoutForm() {
  const { cart, total } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const shipping = total >= 75000 ? 0 : 6900;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    if (process.env.NEXT_PUBLIC_STATIC_DEMO === "true") {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/checkout/pending/`;
      return;
    }
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cart.map((line) => ({ id: line.product.id, quantity: line.quantity })), customer: Object.fromEntries(form) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No pudimos iniciar el pago");
      window.location.href = data.initPoint;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Ocurrió un error"); setLoading(false); }
  }
  if (!cart.length) return <div className="checkout-empty"><h1>Tu carrito está vacío</h1><p>Elegí sus próximos favoritos antes de continuar.</p><Link href="/#tienda" className="button dark">Ir a la tienda</Link></div>;
  return <div className="checkout-layout"><section className="checkout-main"><Link href="/" className="back-link"><ArrowLeft />Seguir comprando</Link><span className="eyebrow">Último paso</span><h1>Datos de entrega</h1><form onSubmit={submit} className="checkout-form"><div className="form-grid"><label className="wide">Email<input required type="email" name="email" placeholder="vos@email.com" /></label><label>Nombre<input required name="name" /></label><label>Apellido<input required name="surname" /></label><label className="wide">Dirección<input required name="address" placeholder="Calle y número" /></label><label>Ciudad<input required name="city" /></label><label>Código postal<input required name="zip" /></label><label className="wide">Teléfono<input required name="phone" type="tel" /></label></div>{error && <p className="form-error">{error}</p>}<button disabled={loading} className="button mp-button">{loading ? "Conectando…" : "Pagar con Mercado Pago"}<LockKeyhole /></button><p className="secure-note">Pago seguro procesado por Mercado Pago. Serás redirigido para completar la compra.</p></form></section><aside className="order-summary"><span className="eyebrow">Tu pedido</span>{cart.map(({ product, quantity }) => <div className="order-line" key={product.id}><div className="order-thumb"><Image src={product.image} alt="" fill sizes="72px" /><span>{quantity}</span></div><div><strong>{product.name}</strong><span>{product.category}</span></div><b>{formatPrice(product.price * quantity)}</b></div>)}<div className="order-totals"><p><span>Subtotal</span><strong>{formatPrice(total)}</strong></p><p><span>Envío</span><strong>{shipping ? formatPrice(shipping) : "Gratis"}</strong></p><p className="grand-total"><span>Total</span><strong>{formatPrice(total + shipping)}</strong></p></div></aside></div>;
}
