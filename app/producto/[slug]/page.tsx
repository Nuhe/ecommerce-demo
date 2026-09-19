import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, PackageCheck, RefreshCw, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { getProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <main className="product-page container"><Link className="back-link" href="/#tienda"><ChevronLeft />Volver a la tienda</Link><div className="product-detail"><div className="detail-image">{product.badge && <span className="badge">{product.badge}</span>}<Image src={product.image} alt={product.name} fill priority sizes="50vw" /></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><p className="detail-lead">{product.description}</p><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div><p>{product.longDescription}</p><ProductDetailActions product={product} /><div className="detail-perks"><span><PackageCheck />Envío gratis desde $75.000</span><span><RefreshCw />30 días para cambios</span><span><ShieldCheck />Compra protegida</span></div></div></div></main>;
}
