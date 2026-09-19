"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { useStore } from "./store-provider";

export function Header() {
  const { count, setCartOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="announcement">Envío gratis desde $75.000 · 3 cuotas sin interés</div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <Logo />
          <nav className={menuOpen ? "nav open" : "nav"}>
            <Link href="/#tienda">Tienda</Link>
            <Link href="/?categoria=Perros#tienda">Perros</Link>
            <Link href="/?categoria=Gatos#tienda">Gatos</Link>
            <Link href="/?categoria=Paseo#tienda">Paseo</Link>
            <Link href="/#historia">Nuestra historia</Link>
          </nav>
          <div className="header-actions">
            <Link href="/#tienda" className="icon-button" aria-label="Buscar"><Search /></Link>
            <button className="icon-button cart-button" onClick={() => setCartOpen(true)} aria-label={`Carrito, ${count} productos`}>
              <ShoppingBag /><span>{count}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
