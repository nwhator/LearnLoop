-- ============================================================
-- LearnLoop: Gamification XP Engine RPC Setup
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor
-- This creates a secure Remote Procedure Call (RPC) to increment 
-- a user's XP safely without race conditions.
-- ============================================================

CREATE OR REPLACE FUNCTION increment_user_xp(xp_amount int)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Ensures the function can bypass RLS for this specific update safely
AS $$
BEGIN
  -- We assume the user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Update users table (since XP is stored broadly there too)
  UPDATE public.users
  SET xp = xp + xp_amount,
      updated_at = timezone('utc'::text, now())
  WHERE id = auth.uid();

  -- Update user_stats table (specialized engine for leaderboard)
  UPDATE public.user_stats
  SET current_xp = current_xp + xp_amount,
      last_activity_at = timezone('utc'::text, now())
  WHERE user_id = auth.uid();

  -- Check and update leaderboard rank? 
  -- We already order leaderboard view by XP, but let's push XP to it
  UPDATE public.leaderboard
  SET xp = xp + xp_amount,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = auth.uid();

  -- Note: A real robust app might recalculate 
  -- ranks with a cron or trigger, but this works 
  -- cleanly for live increments.
END;
$$;
