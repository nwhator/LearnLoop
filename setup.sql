-- ============================================================
-- LearnLoop: Complete Database Setup & Identity Sync
-- ============================================================
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- This script ensures all tables exist, RLS is active, and
-- new users are automatically synced from Supabase Auth.
-- ============================================================

-- 1. Ensure the 'users' table is fully equipped
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    avatar_url text,
    initials text,
    level integer DEFAULT 1,
    xp bigint DEFAULT 0,
    streak_count integer DEFAULT 0,
    subscription_tier text DEFAULT 'free',
    daily_credits int DEFAULT 3,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Create permissive but secure policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users 
FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users 
FOR UPDATE USING (auth.uid() = id);

-- 4. Create the Identity Sync Function
-- This function runs every time a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, initials, daily_credits, subscription_tier)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    UPPER(LEFT(COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 1)),
    3,
    'free'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Attach the Trigger to Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Backfill existing users (Optional but helpful)
INSERT INTO public.users (id, email, name, initials, daily_credits, subscription_tier)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  UPPER(LEFT(COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)), 1)),
  3,
  'free'
FROM auth.users
ON CONFLICT (id) DO NOTHING;
