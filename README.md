# Foxstore

Demo ecommerce de productos para mascotas construido con Next.js, Supabase y Mercado Pago.

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

La tienda funciona con catálogo local si Supabase aún no está configurado. Para activar persistencia, completa las variables de `.env.local` y ejecuta la migración de `supabase/migrations` en el SQL Editor.

Para activar el checkout, usa un `MERCADOPAGO_ACCESS_TOKEN` de prueba y configura `NEXT_PUBLIC_SITE_URL` con la URL pública de la aplicación. En Vercel, carga las mismas variables en Project Settings → Environment Variables.
