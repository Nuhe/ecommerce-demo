-- Foxstore schema. Run this in the Supabase SQL Editor or with `supabase db push`.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  long_description text not null,
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price is null or compare_at_price >= price),
  category text not null check (category in ('Perros', 'Gatos', 'Paseo')),
  image text not null,
  badge text,
  featured boolean not null default false,
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending',
  customer jsonb not null,
  items jsonb not null,
  total integer not null check (total >= 0),
  mercado_pago_preference_id text,
  mercado_pago_payment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
create policy "Products are publicly readable" on public.products for select using (active = true);

insert into public.products (id,slug,name,description,long_description,price,compare_at_price,category,image,badge,featured,stock) values
('f1001','cama-bosque','Cama Bosque','Descanso ortopédico con funda suave y lavable.','Una cama amplia y mullida que acompaña cada siesta. Su base ortopédica distribuye el peso y los bordes elevados crean un refugio cómodo para apoyar la cabeza.',89990,109990,'Perros','/images/cama-bosque.png','Más vendido',true,12),
('f1002','comedero-nordico','Comedero Nórdico','Cerámica y roble en una altura más cómoda.','Dos cuencos de cerámica esmaltada sobre una base elevada de roble. Fácil de limpiar, estable y pensado para integrar el rincón de tu mascota a tu casa.',42990,null,'Gatos','/images/comedero-nordico.png','Nuevo',true,18),
('f1003','arnes-terra','Arnés Terra','Ajuste seguro, herrajes firmes y paseo liviano.','Un set de arnés y correa regulable en tejido resistente. Distribuye la tensión en el pecho y suma herrajes metálicos de tacto suave para paseos más cómodos.',36990,42990,'Paseo','/images/arnes-terra.png','-14%',true,25),
('f1004','manta-nido','Manta Nido','Textura cálida para sillón, cama o transportadora.','Manta liviana de doble faz, fácil de lavar y diseñada para proteger tus muebles mientras crea un lugar familiar para descansar.',24990,null,'Gatos','/images/cama-bosque.png',null,false,31),
('f1005','correa-aventura','Correa Aventura','Control suave con agarre acolchado.','Correa de paseo resistente con mosquetón metálico y una empuñadura cómoda para caminatas urbanas o escapadas de fin de semana.',19990,null,'Paseo','/images/arnes-terra.png',null,false,40),
('f1006','bowl-calma','Bowl Calma','Plato de cerámica para comer sin apuro.','Su relieve interior favorece una ingesta pausada. La cerámica pesada evita desplazamientos y se limpia fácilmente.',17990,null,'Perros','/images/comedero-nordico.png',null,false,22)
on conflict (id) do update set name=excluded.name, price=excluded.price, stock=excluded.stock, active=true;
