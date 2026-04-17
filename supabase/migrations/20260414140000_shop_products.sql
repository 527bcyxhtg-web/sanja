-- Catalog stored in Supabase; app falls back to src/data/products.fallback.ts when table is empty.
-- Optional seed: run `npm run generate:shop-seed` then execute supabase/seed_shop_products.sql in the SQL editor.

create table if not exists public.shop_products (
  id integer primary key,
  body jsonb not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists shop_products_sort_idx on public.shop_products (sort_order);

alter table public.shop_products enable row level security;

drop policy if exists "Allow public read published shop products" on public.shop_products;
create policy "Allow public read published shop products"
  on public.shop_products
  for select
  to anon, authenticated
  using (is_published = true);

comment on table public.shop_products is 'Product catalog JSON (ProductDetail shape); synced with fallback in src/data/products.fallback.ts';
