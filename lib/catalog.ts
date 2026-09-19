import { createClient } from "@supabase/supabase-js";
import { Product, products as fallbackProducts } from "./products";
import { assetPath } from "./assets";

export async function getProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallbackProducts;

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at");
    if (error || !data?.length) return fallbackProducts;
    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      description: item.description,
      longDescription: item.long_description,
      price: item.price,
      compareAtPrice: item.compare_at_price ?? undefined,
      category: item.category,
      image: assetPath(item.image),
      badge: item.badge ?? undefined,
      featured: item.featured,
      stock: item.stock,
    }));
  } catch {
    return fallbackProducts;
  }
}
