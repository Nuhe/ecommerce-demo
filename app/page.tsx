import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, PackageCheck, Sparkles } from "lucide-react";
import { Suspense } from "react";
import { Catalog } from "@/components/catalog";
import { Logo } from "@/components/logo";
import { getProducts } from "@/lib/catalog";

export default async function Home() {
  const products = await getProducts();
  return <main>
    <section className="hero"><Image src="/images/foxstore-hero.png" alt="Un perro y un gato disfrutando su hogar" fill priority sizes="100vw" /><div className="hero-overlay" /><div className="container hero-content"><span className="eyebrow">Vivir mejor juntos</span><h1>Su lugar favorito<br />también es el tuyo.</h1><p>Objetos nobles y bien pensados para acompañar la vida con mascotas.</p><Link className="button primary" href="#tienda">Descubrir colección <ArrowRight /></Link></div><div className="hero-note"><span>01</span><p>Diseño que cuida<br />cada detalle.</p></div></section>
    <section className="values container"><article><PackageCheck /><div><strong>Envíos a todo el país</strong><span>Gratis desde $75.000</span></div></article><article><Heart /><div><strong>Elegido con amor</strong><span>Probado por mascotas reales</span></div></article><article><Leaf /><div><strong>Compra consciente</strong><span>Materiales que duran</span></div></article></section>
    <Suspense><Catalog products={products} /></Suspense>
    <section className="story section" id="historia"><div className="container story-grid"><div className="story-visual"><Image src="/images/foxstore-hero.png" alt="La familia Foxstore" fill sizes="50vw" /></div><div className="story-copy"><Sparkles /><span className="eyebrow">Nuestra forma de querer</span><h2>Menos cosas.<br />Mejores momentos.</h2><p>Foxstore nació de una idea simple: los objetos de nuestras mascotas pueden ser cómodos para ellos, lindos para tu casa y responsables con el mundo.</p><p>Seleccionamos materiales nobles y diseños durables, porque cuidar también es elegir mejor.</p><Link href="#tienda" className="text-link">Conocé la colección <ArrowRight /></Link></div></div></section>
    <section className="newsletter"><div className="container"><span className="eyebrow">La manada Foxstore</span><h2>Buenas noticias,<br />directo a tu inbox.</h2><p>Ideas, lanzamientos y un 10% de descuento para tu primera compra.</p><form><input type="email" placeholder="tu@email.com" aria-label="Email" /><button type="submit">Sumarme <ArrowRight /></button></form></div></section>
    <footer><div className="container footer-grid"><div><Logo /><p>Objetos bien pensados para mascotas muy queridas.</p></div><div><strong>Explorar</strong><Link href="#tienda">Tienda</Link><Link href="/?categoria=Perros#tienda">Perros</Link><Link href="/?categoria=Gatos#tienda">Gatos</Link></div><div><strong>Ayuda</strong><span>Envíos</span><span>Cambios</span><span>Contacto</span></div><div><strong>Seguinos</strong><span>Instagram</span><span>TikTok</span><span>Pinterest</span></div></div><div className="container footer-bottom"><span>© 2026 Foxstore</span><span>Hecho con cariño en Argentina</span></div></footer>
  </main>;
}
