import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart-drawer";
import { Header } from "@/components/header";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = { title: "Foxstore · Vivir mejor juntos", description: "Objetos bien pensados para mascotas muy queridas." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><StoreProvider><Header />{children}<CartDrawer /></StoreProvider></body></html>;
}
