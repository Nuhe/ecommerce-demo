"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/products";
import { useStore } from "./store-provider";

export function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useStore();
  return <div className="detail-actions"><div className="quantity large"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Plus /></button></div><button className="button primary" onClick={() => add(product, quantity)}><ShoppingBag />Agregar al carrito</button></div>;
}
