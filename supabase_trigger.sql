-- ============================================================
-- LearnLoop: Auto-create public.users row on signup
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This trigger fires whenever a new user signs up via Supabase Auth
-- and automatically creates the corresponding row in public.users
-- ============================================================

-- 1. Create the trigger function
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, initials, level, xp, streak_count)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New Scholar'),
    new.email,
    upper(
      coalesce(
        left(split_part(new.raw_user_meta_data->>'full_name', ' ', 1), 1) ||
        left(split_part(new.raw_user_meta_data->>'full_name', ' ', 2), 1),
        left(new.email, 2)
      )
    ),
    1,   -- Starting level
    0,   -- Starting XP
    0    -- Starting streak
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create the trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Add RLS policy so users can read their own data after signup
-- (Your existing policies may already cover this, but this ensures it works)
create policy "Users can insert their own profile"
  on public.users for insert
  with check ( auth.uid() = id );

-- 4. Allow authenticated users to update their own profile
create policy "Users can update their own profile"
  on public.users for update
  using ( auth.uid() = id );

-- ============================================================
-- OPTIONAL: Backfill existing auth.users who don't have public.users rows
-- Uncomment and run if you have existing auth users without profiles
-- ============================================================
-- insert into public.users (id, name, email, level, xp, streak_count)
-- select 
--   au.id,
--   coalesce(au.raw_user_meta_data->>'full_name', 'Scholar'),
--   au.email,
--   1, 0, 0
-- from auth.users au
-- left join public.users pu on au.id = pu.id
-- where pu.id is null;
