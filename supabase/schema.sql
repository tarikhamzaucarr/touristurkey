-- TouristTurkey — Supabase şeması
-- Kullanım: Supabase SQL Editor'a yapıştırıp çalıştırın,
-- sonra Vercel'de VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY tanımlayın.

create table if not exists hotels (
  slug text primary key,
  name text not null,
  district text,
  rooms int default 0,
  accent text default '#12868A',
  concierge_id text,
  split numeric default 0.5,
  cover text,
  active boolean default true
);

create table if not exists concierges (
  id text primary key,
  name text not null,
  desk text,
  wa text,
  email text,
  pin text
);

create table if not exists suppliers (
  id text primary key,
  name text not null,
  cat text,
  wa text,
  pin text
);

create table if not exists products (
  id text primary key,
  slug text unique not null,
  cat text,
  supplier_id text references suppliers(id),
  title text not null,
  short text,
  long text,
  list numeric not null,
  net numeric not null,
  unit text,
  dur text,
  meet text,
  inc jsonb default '[]',
  exc jsonb default '[]',
  photo text,
  cap int default 10,
  rank int default 99,
  active boolean default true
);

-- Konsiyerjin kendi sayfasındaki fiyat/foto/gizleme
create table if not exists overrides (
  concierge_id text not null,
  product_id text not null,
  price numeric,
  photo text,
  hidden boolean default false,
  primary key (concierge_id, product_id)
);

-- Canlı müsaitlik: tedarikçi kapattığında closed=true
create table if not exists availability (
  product_id text not null,
  date date not null,
  cap int not null default 10,
  booked int not null default 0,
  closed boolean not null default false,
  reason text,
  updated_at timestamptz default now(),
  primary key (product_id, date)
);

create table if not exists bookings (
  id text primary key,
  ref text unique not null,
  hotel text,
  source text,
  room text,
  product_id text,
  pax int default 1,
  date date,
  slot text,
  phone text,
  note text,
  status text default 'new',
  price numeric,
  net numeric,
  sup_ok boolean default false,
  log jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists ads (
  id text primary key default gen_random_uuid()::text,
  hotel text,
  title text,
  body text,
  photo text,
  active boolean default true
);

create table if not exists partners (
  id bigserial primary key,
  type text,
  name text,
  org text,
  hotel text,
  phone text,
  city text,
  note text,
  created_at timestamptz default now()
);

create index if not exists idx_bookings_hotel on bookings(hotel);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_av_date on availability(date);

-- Realtime yayını
alter publication supabase_realtime add table availability;
alter publication supabase_realtime add table bookings;

-- ============================================================
-- RLS (Row Level Security) — PROTOTİP AYARI
-- Anon anahtarla okuma/yazma açık. Canlıya çıkmadan önce
-- bunları daraltın: misafir sadece insert, panel işlemleri
-- kimlik doğrulamalı olmalı.
-- ============================================================
alter table hotels       enable row level security;
alter table concierges   enable row level security;
alter table suppliers    enable row level security;
alter table products     enable row level security;
alter table overrides    enable row level security;
alter table availability enable row level security;
alter table bookings     enable row level security;
alter table ads          enable row level security;
alter table partners     enable row level security;

do $$
declare t text;
begin
  foreach t in array array['hotels','concierges','suppliers','products',
                           'overrides','availability','bookings','ads','partners']
  loop
    execute format('drop policy if exists anon_all on %I', t);
    execute format('create policy anon_all on %I for all to anon using (true) with check (true)', t);
  end loop;
end $$;

-- PIN'ler istemciye gitmesin diye concierges/suppliers okuması
-- ileride kısıtlanmalı. Prototipte açık bırakıldı.
