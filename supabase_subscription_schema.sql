-- ============================================================
-- LearnLoop: Subscription Engine Setup
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor
-- This adds profitability limitations to the core 'users' table 
-- and creates an RPC to safely deduct credits.
-- ============================================================

-- 1. Add Monetization Columns
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free',
ADD COLUMN IF NOT EXISTS daily_credits int DEFAULT 3;

-- 2. Create reliable deduction mechanism (prevents race conditions)
CREATE OR REPLACE FUNCTION deduct_credit()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  UPDATE public.users
  SET daily_credits = GREATEST(daily_credits - 1, 0),
      updated_at = timezone('utc'::text, now())
  WHERE id = auth.uid() AND subscription_tier = 'free';

  -- NOTE: We do not deduct credits if the tier is 'scholar_plus' (Premium is unlimited)
END;
$$;
