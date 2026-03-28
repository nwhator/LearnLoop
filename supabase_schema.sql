-- LearnLoop Supabase Schema
-- Run this in your Supabase SQL Editor

-- 1. Users Table
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  avatar_url text,
  level integer not null default 1,
  xp bigint not null default 0,
  initials text, -- Added for UI display
  status text default 'Active',
  is_banned boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. Admin Roles
create table public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  role text not null check (role in ('superadmin','moderator','content_manager')),
  created_at timestamp with time zone default now()
);

-- 3. Moderation Items
create table public.moderation_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quiz','flashcard','summary','set')),
  content_id uuid not null,
  flagged_by uuid references public.users(id),
  reason text not null,
  status text not null default 'pending' check (status in ('pending','reviewed','rejected','approved')),
  created_at timestamp with time zone default now(),
  reviewed_at timestamp with time zone
);

-- 4. Study Sets
create table public.study_sets (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.users(id) on delete set null,
  title text not null,
  description text,
  category text,
  tags text[],
  is_public boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 5. Leaderboard (Can be a view or a table)
create table public.leaderboard (
  user_id uuid primary key references public.users(id) on delete cascade,
  rank integer not null,
  xp bigint not null,
  updated_at timestamp with time zone default now()
);

-- 6. Notifications
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid references public.users(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamp with time zone default now()
);

-- Functions & Triggers (Example: Auto-update updated_at)
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at
  before update on public.users
  for each row execute procedure public.handle_updated_at();

-- RLS Policies
alter table public.users enable row level security;

create policy "Users can view their own profile"
  on public.users for select
  using ( auth.uid() = id );

create policy "Admins can view all users"
  on public.users for select
  using ( exists (select 1 from public.admin_roles where user_id = auth.uid()) );
