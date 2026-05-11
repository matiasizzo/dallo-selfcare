-- ─────────────────────────────────────────────────────────────────────────────
-- QUEVI + DALL'O — SUPABASE SCHEMA
-- Ejecutar en: Supabase Dashboard → SQL Editor → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── TIENDAS ──────────────────────────────────────────────────────────────────
-- Representa QUEVI y Dall'O como dos entidades independientes
create table stores (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  domain      text not null unique,
  stripe_account_id text,          -- Stripe account de cada NIF
  nif         text,
  email       text,
  phone       text,
  address     text,
  created_at  timestamptz default now()
);

-- Seed inicial
insert into stores (name, domain, email) values
  ('QUEVI Wellness Clinic', 'queviwellnessclinic.es', 'info@quevi.com'),
  ('Dall''O Selfcare',      'dalloselfcare.com',      'info@dalloselfcare.com');

-- ─── CATEGORÍAS ───────────────────────────────────────────────────────────────
create table categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  slug       text not null unique,
  created_at timestamptz default now()
);

insert into categories (name, slug) values
  ('Limpiadores',    'limpiadores'),
  ('Sérums',        'serums'),
  ('Aceites',       'aceites'),
  ('Suplementos',   'suplementos'),
  ('Vouchers',      'vouchers');

-- ─── PRODUCTOS ────────────────────────────────────────────────────────────────
-- Catálogo compartido. available_on controla en qué tienda(s) aparece
create table products (
  id                  uuid primary key default uuid_generate_v4(),
  category_id         uuid references categories(id),
  name                text not null,
  slug                text not null unique,
  tagline             text,
  description         text,
  ingredients         text,          -- Texto libre INCI
  usage_instructions  text,
  dosage              text,
  frequency           text,
  storage             text,
  shelf_life_months   integer,       -- Vida útil en meses tras apertura
  skin_type           text[],        -- ['todo tipo', 'grasa', 'sensible', ...]
  volume_ml           integer,
  active              boolean default true,
  featured            boolean default false,
  -- Controla visibilidad por tienda: 'quevi' | 'dallo' | 'both'
  available_on        text[] default '{"both"}',
  image_url           text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Seed productos Dall'O (del catálogo recibido)
insert into products
  (name, slug, tagline, description, usage_instructions, dosage, frequency, shelf_life_months, volume_ml, skin_type, available_on, category_id)
values
  (
    'D-LONGEVITY Mousse',
    'd-longevity-mousse',
    'Pureza Ozonizada & Renovación Celular',
    'Limpia a profundidad y protege la barrera cutánea. Formulado con aceites vegetales ozonizados, rosa mosqueta, ácidos glicólico y láctico, vitaminas B5 y B12.',
    'Por la mañana y noche, hacer espuma y masajear sobre el rostro y cuello humedecidos. Dejar actuar 1–2 minutos y enjuagar con agua tibia.',
    'Media cucharadita',
    'Mañana y noche',
    5, 150,
    '{"todo tipo","sensibles"}',
    '{"both"}',
    (select id from categories where slug = 'limpiadores')
  ),
  (
    'D-PURIFYING Mousse',
    'd-purifying-mousse',
    'Equilibrio Microbiótico & Control de Pureza',
    'Mousse limpiadora para eliminar impurezas mientras protege la microbiota. Aceites ozonizados, aceite de geranio, ácido salicílico y niacinamida.',
    'Mañana y noche sobre rostro y cuello humedecidos. Masajear hasta crear espuma suave, dejar actuar 1–2 minutos y aclarar.',
    'Media cucharadita',
    'Mañana y noche',
    6, 150,
    '{"grasa","mixta","acné"}',
    '{"both"}',
    (select id from categories where slug = 'limpiadores')
  ),
  (
    'D-Senolytic Serum',
    'd-senolytic-serum',
    'Advanced Cellular Recovery',
    'Combate la senescencia celular. NMN (precursor de NAD+), péptidos GHK-Cu y ácido hialurónico. Restaura densidad y protege la barrera cutánea.',
    'Aplicar sobre piel limpia. Masaje ascendente hasta absorción. Si se usa de día, completar con protección solar.',
    '4–8 gotas',
    '3–4 veces por semana',
    3, 20,
    '{"todo tipo","envejecimiento"}',
    '{"both"}',
    (select id from categories where slug = 'serums')
  ),
  (
    'D-Purifying Serum',
    'd-purifying-serum',
    'Purifica y Restaura la Vitalidad',
    'Concentrado de alta precisión para piel mixta a grasa. Niacinamida, ácido salicílico e hialurónico. Poros menos visibles, microbiota equilibrada.',
    'Mañana y noche sobre piel limpia y ligeramente humedecida.',
    '6–8 gotas',
    'Mañana y noche',
    3, 20,
    '{"grasa","mixta","acné"}',
    '{"both"}',
    (select id from categories where slug = 'serums')
  ),
  (
    'D-EVENGLOW Serum',
    'd-evenglow-serum',
    'Iluminación y Bio-Regeneración',
    'Vitamina C, E, Ferúlico, SOD, Ácido Azelaico, Ácido Kójico e Hialurónico. Difumina manchas y restaura luminosidad. Uso exclusivo nocturno.',
    'Uso nocturno exclusivo. Aplicar 10 gotas exactas en rostro, cuello, escote y dorso de manos. Masaje ascendente hasta absorción.',
    '10 gotas',
    'Noche',
    3, 20,
    '{"todo tipo","manchas","fotoenvejecimiento"}',
    '{"both"}',
    (select id from categories where slug = 'serums')
  ),
  (
    'D-RESCUE Serum',
    'd-rescue-serum',
    'DNA Repair System',
    'PDRN (polinucleótidos), SOD, Coenzima Q10 y aceite de Açaí. Restaura la salud dérmica post-procedimientos. Regeneración avanzada.',
    'Día y noche. Aplicar 4–8 gotas en rostro, cuello, escote y dorso de manos. Masaje ascendente.',
    '4–8 gotas',
    'Mañana y noche',
    3, 20,
    '{"todo tipo","post-procedimiento","fotoenvejecimiento"}',
    '{"both"}',
    (select id from categories where slug = 'serums')
  ),
  (
    'D-AOX Oil',
    'd-aox-oil',
    'Restorative Treatment',
    'SOD, Vitamina E, Rosa Mosqueta, Resveratrol, Q10. Protección antioxidante total, regeneración y energía celular. Restaura barrera cutánea y microbiota.',
    'Masajear sobre piel recién limpia y tonificada.',
    '5–10 gotas',
    '3–4 veces por semana',
    3, 20,
    '{"todo tipo","sensibles","post-procedimiento"}',
    '{"both"}',
    (select id from categories where slug = 'aceites')
  );

-- ─── VARIANTES DE PRODUCTO ────────────────────────────────────────────────────
-- Cada variante tiene su precio y stock independiente
create table product_variants (
  id               uuid primary key default uuid_generate_v4(),
  product_id       uuid references products(id) on delete cascade,
  name             text not null,   -- '150ml', '20ml', 'Pack Duo', etc.
  price_cents      integer not null, -- precio en céntimos (ej: 4500 = 45,00€)
  compare_at_cents integer,          -- precio tachado para ofertas
  stripe_price_id  text,             -- se rellena al configurar Stripe
  stock_quantity   integer default 0,
  is_default       boolean default false,
  active           boolean default true,
  created_at       timestamptz default now()
);

-- Variantes de productos Dall'O (precios pendientes de confirmar con el cliente)
-- price_cents = 0 hasta recibir precios reales
insert into product_variants (product_id, name, price_cents, is_default, stock_quantity)
select id, '150ml', 0, true, 0 from products where slug = 'd-longevity-mousse';

insert into product_variants (product_id, name, price_cents, is_default, stock_quantity)
select id, '150ml', 0, true, 0 from products where slug = 'd-purifying-mousse';

insert into product_variants (product_id, name, price_cents, is_default, stock_quantity)
select id, '20ml', 0, true, 0 from products where slug in (
  'd-senolytic-serum', 'd-purifying-serum', 'd-evenglow-serum', 'd-rescue-serum', 'd-aox-oil'
);

-- ─── CLIENTES ─────────────────────────────────────────────────────────────────
create table customers (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  name       text,
  phone      text,
  created_at timestamptz default now()
);

-- ─── PEDIDOS ──────────────────────────────────────────────────────────────────
create table orders (
  id                       uuid primary key default uuid_generate_v4(),
  store_id                 uuid references stores(id),
  customer_id              uuid references customers(id),
  -- Estados: pending | paid | processing | shipped | delivered | refunded | cancelled
  status                   text not null default 'pending',
  subtotal_cents           integer not null,
  shipping_cents           integer not null default 0,
  total_cents              integer not null,
  stripe_payment_intent_id text unique,
  shipping_address         jsonb,  -- { name, line1, line2, city, postal_code, country }
  notes                    text,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

-- ─── LÍNEAS DE PEDIDO ─────────────────────────────────────────────────────────
create table order_items (
  id               uuid primary key default uuid_generate_v4(),
  order_id         uuid references orders(id) on delete cascade,
  variant_id       uuid references product_variants(id),
  -- Snapshot del momento de compra (el precio puede cambiar luego)
  product_name     text not null,
  variant_name     text not null,
  quantity         integer not null check (quantity > 0),
  unit_price_cents integer not null,
  created_at       timestamptz default now()
);

-- ─── RESERVAS (QUEVI) ─────────────────────────────────────────────────────────
create table bookings (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  message    text,
  -- Estados: pending | confirmed | cancelled | completed
  status     text not null default 'pending',
  created_at timestamptz default now()
);

-- ─── TRIGGERS: updated_at automático ──────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function set_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
alter table stores           enable row level security;
alter table categories       enable row level security;
alter table products         enable row level security;
alter table product_variants enable row level security;
alter table customers        enable row level security;
alter table orders           enable row level security;
alter table order_items      enable row level security;
alter table bookings         enable row level security;

-- Cualquiera puede leer productos activos y categorías (tienda pública)
create policy "Public: read active products"
  on products for select
  using (active = true);

create policy "Public: read categories"
  on categories for select
  using (true);

create policy "Public: read active variants"
  on product_variants for select
  using (active = true);

-- Cualquiera puede crear una reserva (formulario de contacto)
create policy "Public: create booking"
  on bookings for insert
  with check (true);

-- Solo service_role (backend) puede leer y gestionar el resto
create policy "Service: full access bookings"
  on bookings for all
  using (auth.role() = 'service_role');

create policy "Service: full access orders"
  on orders for all
  using (auth.role() = 'service_role');

create policy "Service: full access customers"
  on customers for all
  using (auth.role() = 'service_role');

create policy "Service: full access order_items"
  on order_items for all
  using (auth.role() = 'service_role');
