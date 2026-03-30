-- ============================================================
-- LearnLoop: AI Content Schema Setup
-- ============================================================
-- Run this ONCE in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This creates the tables to hold flashcards and quizzes
-- linked to the study_sets table.
-- ============================================================

-- 1. Create the flashcards table
CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    study_set_id UUID NOT NULL REFERENCES public.study_sets(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    study_set_id UUID NOT NULL REFERENCES public.study_sets(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of strings for choices
    correct_answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS) on new tables
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

-- 4. Create proper policies to ensure only creators can interact with their data securely.
-- For Flashcards:
CREATE POLICY "Users can insert flashcards for their own study sets"
    ON public.flashcards FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.study_sets 
            WHERE study_sets.id = study_set_id 
            AND study_sets.creator_id = auth.uid()
        )
    );

CREATE POLICY "Users can read flashcards for their own study sets"
    ON public.flashcards FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.study_sets 
            WHERE study_sets.id = study_set_id 
            AND study_sets.creator_id = auth.uid()
        )
    );

-- For Quizzes:
CREATE POLICY "Users can insert quizzes for their own study sets"
    ON public.quizzes FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.study_sets 
            WHERE study_sets.id = study_set_id 
            AND study_sets.creator_id = auth.uid()
        )
    );

CREATE POLICY "Users can read quizzes for their own study sets"
    ON public.quizzes FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.study_sets 
            WHERE study_sets.id = study_set_id 
            AND study_sets.creator_id = auth.uid()
        )
    );
