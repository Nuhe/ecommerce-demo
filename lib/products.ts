export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  category: "Perros" | "Gatos" | "Paseo";
  image: string;
  badge?: string;
  featured: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    id: "f1001",
    slug: "cama-bosque",
    name: "Cama Bosque",
    description: "Descanso ortopédico con funda suave y lavable.",
    longDescription: "Una cama amplia y mullida que acompaña cada siesta. Su base ortopédica distribuye el peso y los bordes elevados crean un refugio cómodo para apoyar la cabeza.",
    price: 89990,
    compareAtPrice: 109990,
    category: "Perros",
    image: "/images/cama-bosque.png",
    badge: "Más vendido",
    featured: true,
    stock: 12,
  },
  {
    id: "f1002",
    slug: "comedero-nordico",
    name: "Comedero Nórdico",
    description: "Cerámica y roble en una altura más cómoda.",
    longDescription: "Dos cuencos de cerámica esmaltada sobre una base elevada de roble. Fácil de limpiar, estable y pensado para integrar el rincón de tu mascota a tu casa.",
    price: 42990,
    category: "Gatos",
    image: "/images/comedero-nordico.png",
    badge: "Nuevo",
    featured: true,
    stock: 18,
  },
  {
    id: "f1003",
    slug: "arnes-terra",
    name: "Arnés Terra",
    description: "Ajuste seguro, herrajes firmes y paseo liviano.",
    longDescription: "Un set de arnés y correa regulable en tejido resistente. Distribuye la tensión en el pecho y suma herrajes metálicos de tacto suave para paseos más cómodos.",
    price: 36990,
    compareAtPrice: 42990,
    category: "Paseo",
    image: "/images/arnes-terra.png",
    badge: "-14%",
    featured: true,
    stock: 25,
  },
  {
    id: "f1004",
    slug: "manta-nido",
    name: "Manta Nido",
    description: "Textura cálida para sillón, cama o transportadora.",
    longDescription: "Manta liviana de doble faz, fácil de lavar y diseñada para proteger tus muebles mientras crea un lugar familiar para descansar.",
    price: 24990,
    category: "Gatos",
    image: "/images/cama-bosque.png",
    featured: false,
    stock: 31,
  },
  {
    id: "f1005",
    slug: "correa-aventura",
    name: "Correa Aventura",
    description: "Control suave con agarre acolchado.",
    longDescription: "Correa de paseo resistente con mosquetón metálico y una empuñadura cómoda para caminatas urbanas o escapadas de fin de semana.",
    price: 19990,
    category: "Paseo",
    image: "/images/arnes-terra.png",
    featured: false,
    stock: 40,
  },
  {
    id: "f1006",
    slug: "bowl-calma",
    name: "Bowl Calma",
    description: "Plato de cerámica para comer sin apuro.",
    longDescription: "Su relieve interior favorece una ingesta pausada. La cerámica pesada evita desplazamientos y se limpia fácilmente.",
    price: 17990,
    category: "Perros",
    image: "/images/comedero-nordico.png",
    featured: false,
    stock: 22,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
