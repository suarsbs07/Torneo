-- SUPABASE SQL PARA TORNEO FIFA 26 DE AMIGOS

create table if not exists public.torneos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  modo text not null check (modo in ('clubes', 'paises')),
  playoffs_activos boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.equipos (
  id uuid primary key default gen_random_uuid(),
  torneo_id uuid references public.torneos(id) on delete cascade,
  codigo text not null,
  jugador text,
  equipo text,
  rating_equipo int default 75,
  jugador_img text,
  equipo_img text,
  created_at timestamptz default now()
);

create table if not exists public.jornadas (
  id uuid primary key default gen_random_uuid(),
  torneo_id uuid references public.torneos(id) on delete cascade,
  nombre text not null,
  orden int not null,
  created_at timestamptz default now()
);

create table if not exists public.partidos (
  id uuid primary key default gen_random_uuid(),
  jornada_id uuid references public.jornadas(id) on delete cascade,
  local_codigo text not null,
  visita_codigo text not null,
  goles_local int,
  goles_visita int,
  created_at timestamptz default now()
);

create table if not exists public.playoffs (
  id uuid primary key default gen_random_uuid(),
  torneo_id uuid references public.torneos(id) on delete cascade,
  ronda text not null check (ronda in ('octavos', 'cuartos', 'semis', 'final')),
  orden int not null,
  local_codigo text,
  visita_codigo text,
  goles_local int,
  goles_visita int,
  created_at timestamptz default now()
);

alter table public.torneos enable row level security;
alter table public.equipos enable row level security;
alter table public.jornadas enable row level security;
alter table public.partidos enable row level security;
alter table public.playoffs enable row level security;

create policy "lectura publica torneos" on public.torneos for select to anon using (true);
create policy "lectura publica equipos" on public.equipos for select to anon using (true);
create policy "lectura publica jornadas" on public.jornadas for select to anon using (true);
create policy "lectura publica partidos" on public.partidos for select to anon using (true);
create policy "lectura publica playoffs" on public.playoffs for select to anon using (true);

-- No crees políticas públicas de update/insert/delete.
-- Luego conectamos login para que solo tú edites.
