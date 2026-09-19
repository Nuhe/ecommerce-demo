"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatPrice, Product } from "@/lib/products";
import { useStore } from "./store-provider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();
  return (
    <article className="product-card">
      <Link href={`/producto/${product.slug}`} className="product-image">
        {product.badge && <span className="badge">{product.badge}</span>}
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 80vw, 30vw" />
      </Link>
      <div className="product-info"><div><span>{product.category}</span><Link href={`/producto/${product.slug}`}><h3>{product.name}</h3></Link><p>{product.description}</p><div className="price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div></div><button className="add-button" onClick={() => add(product)} aria-label={`Agregar ${product.name}`}><Plus /></button></div>
    </article>
  );
}
