-- ============================================================
-- LearnLoop: Structured Notes Integration
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor
-- This adds the newly formulated `summary_notes` column safely 
-- to your `study_sets` table exactly as outlined in the Plan.
-- ============================================================

ALTER TABLE public.study_sets
ADD COLUMN IF NOT EXISTS summary_notes JSONB DEFAULT '[]'::jsonb;
