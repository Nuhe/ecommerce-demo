"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

const categories = ["Todos", "Perros", "Gatos", "Paseo"];

export function Catalog({ products }: { products: Product[] }) {
  const requested = useSearchParams().get("categoria");
  const [category, setCategory] = useState(requested && categories.includes(requested) ? requested : "Todos");
  const visible = category === "Todos" ? products : products.filter((product) => product.category === category);
  return (
    <section className="catalog section container" id="tienda">
      <div className="section-heading"><div><span className="eyebrow">Elegidos con criterio</span><h2>Lo mejor para ellos</h2></div><p>Productos honestos, cómodos y lindos para compartir mejor cada día.</p></div>
      <div className="filters" aria-label="Filtrar por categoría">{categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}
