import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true" ? {
    output: "export" as const,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    trailingSlash: true,
  } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.STATIC_EXPORT === "true",
  },
};

export default nextConfig;
