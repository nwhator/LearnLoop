-- LearnLoop Supabase Schema
-- Run this in your Supabase SQL Editor

-- 1. Users Table
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  avatar_url text,
  initials text, 
  status text default 'Active' check (status in ('Active', 'Suspended', 'Banned')),
  is_banned boolean default false,
  
  -- Gamification Stats
  level integer not null default 1,
  xp bigint not null default 0,
  streak_count integer not null default 0,
  last_activity_at timestamp with time zone default now(),
  
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

-- 7. User Stats (Streaks, XP, and Leveling)
create table public.user_stats (
  user_id uuid primary key references public.users(id) on delete cascade,
  current_xp integer default 0,
  level integer default 1,
  streak_count integer default 0,
  last_activity_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- 8. Missions (Global Mission Definitions)
create table public.missions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  reward_xp integer default 0,
  type text check (type in ('daily','weekly','achievement')),
  target_value integer not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- 9. User Missions (Join Table for Tracking Progress)
create table public.user_missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  mission_id uuid references public.missions(id) on delete cascade,
  current_value integer default 0,
  is_completed boolean default false,
  is_claimed boolean default false,
  completed_at timestamp with time zone,
  unique (user_id, mission_id)
);
