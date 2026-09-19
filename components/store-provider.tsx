"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/products";

type CartLine = { product: Product; quantity: number };
type StoreContextValue = {
  cart: CartLine[];
  count: number;
  total: number;
  isCartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  add: (product: Product, quantity?: number) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("foxstore-cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch { localStorage.removeItem("foxstore-cart"); }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("foxstore-cart", JSON.stringify(cart));
  }, [cart, ready]);

  const value = useMemo<StoreContextValue>(() => ({
    cart,
    count: cart.reduce((sum, line) => sum + line.quantity, 0),
    total: cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    isCartOpen,
    setCartOpen,
    add(product, quantity = 1) {
      setCart((current) => {
        const found = current.find((line) => line.product.id === product.id);
        return found
          ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line)
          : [...current, { product, quantity }];
      });
      setCartOpen(true);
    },
    remove(id) { setCart((current) => current.filter((line) => line.product.id !== id)); },
    update(id, quantity) {
      if (quantity < 1) return setCart((current) => current.filter((line) => line.product.id !== id));
      setCart((current) => current.map((line) => line.product.id === id ? { ...line, quantity } : line));
    },
    clear() { setCart([]); },
  }), [cart, isCartOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore debe utilizarse dentro de StoreProvider");
  return context;
}
