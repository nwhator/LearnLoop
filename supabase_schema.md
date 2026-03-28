# Supabase Schema for LearnLoop Platform

## Overview
This schema defines the core tables required for the LearnLoop platform, covering users, admin roles, moderation, study sets, challenges, leaderboard, and notifications. All tables use UUID primary keys for uniqueness and include appropriate foreign keys and indexes. Row Level Security (RLS) policies should be added in Supabase to enforce access control.

---

### 1. `users`
```sql
create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  avatar_url text,
  level integer not null default 1,
  xp bigint not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for quick look‑ups
create index idx_users_email on public.users(email);
create index idx_users_level on public.users(level);
```

### 2. `admin_roles`
```sql
create table public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  role text not null check (role in ('superadmin','moderator','content_manager')),
  created_at timestamp with time zone default now()
);

create index idx_admin_roles_user on public.admin_roles(user_id);
```

### 3. `moderation_items`
```sql
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

create index idx_moderation_type on public.moderation_items(type);
create index idx_moderation_status on public.moderation_items(status);
```

### 4. `study_sets`
```sql
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

create index idx_study_sets_creator on public.study_sets(creator_id);
create index idx_study_sets_category on public.study_sets(category);
```

### 5. `challenges`
```sql
create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  start_date date,
  end_date date,
  reward_xp bigint not null default 0,
  created_at timestamp with time zone default now()
);
```

### 6. `leaderboard`
```sql
create table public.leaderboard (
  user_id uuid primary key references public.users(id) on delete cascade,
  rank integer not null,
  xp bigint not null,
  updated_at timestamp with time zone default now()
);

create index idx_leaderboard_rank on public.leaderboard(rank);
```

### 7. `notifications`
```sql
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid references public.users(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamp with time zone default now()
);

create index idx_notifications_recipient on public.notifications(recipient_id);
```

---

## Row Level Security (RLS) Example
```sql
-- Enable RLS on the users table
alter table public.users enable row level security;

-- Users can read their own record
create policy "self read" on public.users for select using (auth.uid() = id);

-- Admins can read all users
create policy "admin read" on public.users for select using (
  exists (select 1 from public.admin_roles where user_id = auth.uid() and role = 'superadmin')
);
```

Add similar policies for other tables based on your security model.

---

## Notes for the Front‑end
* The Supabase client is initialized in `lib/supabaseClient.ts`.
* Use `supabase.from('users').select('*')` to fetch the user list (as done in the admin Users page).
* For other pages (moderation, community, leaderboard) replace the static arrays with analogous `supabase.from('<table>').select('*')` calls.
* Remember to handle loading and error states in each component.

---

## Deployment
* Run `supabase db push` with the above SQL to create the schema.
* Enable the RLS policies in the Supabase dashboard.
* Add the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
