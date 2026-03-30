-- ============================================================
-- LearnLoop: Live API Diagnostics Schema
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor
-- This table permanently stores failing user questions and AI tutor hints 
-- mapped directly to their dashboard.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_diagnostics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    study_set_id uuid REFERENCES public.study_sets(id) ON DELETE CASCADE,
    question_text text NOT NULL,
    ai_feedback text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect row-level security (Only users can see/insert their own diagnostics)
ALTER TABLE public.user_diagnostics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own diagnostics"
ON public.user_diagnostics FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own diagnostics"
ON public.user_diagnostics FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
