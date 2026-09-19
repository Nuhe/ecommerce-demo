"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useStore } from "./store-provider";

export function CartDrawer() {
  const { cart, total, isCartOpen, setCartOpen, update, remove } = useStore();
  return (
    <>
      <button className={`cart-backdrop ${isCartOpen ? "show" : ""}`} onClick={() => setCartOpen(false)} aria-label="Cerrar carrito" />
      <aside className={`cart-drawer ${isCartOpen ? "show" : ""}`} aria-hidden={!isCartOpen}>
        <div className="cart-title"><div><span className="eyebrow">Tu selección</span><h2>Carrito</h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X /></button></div>
        {!cart.length ? (
          <div className="empty-cart"><ShoppingBag size={44} /><h3>Tu carrito está esperando</h3><p>Encontrá algo especial para tu compañero.</p><button className="button dark" onClick={() => setCartOpen(false)}>Explorar productos</button></div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.map(({ product, quantity }) => (
                <article className="cart-line" key={product.id}>
                  <Image src={product.image} alt={product.name} width={92} height={92} />
                  <div><h3>{product.name}</h3><p>{formatPrice(product.price)}</p><div className="line-actions"><div className="quantity"><button onClick={() => update(product.id, quantity - 1)}><Minus /></button><span>{quantity}</span><button onClick={() => update(product.id, quantity + 1)}><Plus /></button></div><button className="remove" onClick={() => remove(product.id)} aria-label={`Eliminar ${product.name}`}><Trash2 /></button></div></div>
                </article>
              ))}
            </div>
            <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p>El envío se calcula al finalizar la compra.</p><Link className="button primary full" href="/checkout" onClick={() => setCartOpen(false)}>Finalizar compra</Link></div>
          </>
        )}
      </aside>
    </>
  );
}
