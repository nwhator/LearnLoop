# AI Development Prompt for LearnLoop

**To the AI (Claude):** You are an expert Full-Stack Next.js Developer. Your task is to generate complete, production-ready code for a Gamified AI Learning Platform called **LearnLoop**. Below are the comprehensive development instructions, starter configurations, and architectural guidelines. Please follow them strictly, ensuring code quality, responsiveness, and top-tier SEO optimizations.

---

## 1. Project Structure (Next.js 14+ App Router)

Initialize the project using recommended Next.js conventions (`app` directory paradigm).

```text
learnloop/
├── app/                  
│   ├── (auth)/                 # Route group for auth (no layout shifts)
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/            # Dashboard & internal gamified routes
│   │   ├── dashboard/page.tsx
│   │   ├── results/[id]/page.tsx
│   │   ├── missions/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   ├── profile/page.tsx
│   │   └── premium/page.tsx
│   ├── admin/                  # Protected Admin panel
│   ├── api/                    # Serverless API endpoints (Supabase/AI proxy)
│   ├── layout.tsx              # Root layout (SEO/Fonts/Providers)
│   └── page.tsx                # Landing Page
├── components/           
│   ├── ui/                     # Buttons, Inputs, Cards (glassmorphic)
│   ├── gamification/           # XP bars, Streaks, Badges components
│   └── seo/                    # Dynamic Meta tags/Structured schema components
├── lib/                  
│   ├── supabase/               # Supabase browser & server clients
│   ├── store/                  # Zustand state management
│   └── utils.ts                # Tailwind merge (cn), formatting utils
├── styles/               
│   └── globals.css             # Tailwind imports & CSS variables
└── types/                
    └── supabase.ts             # Generated Supabase DB types
```

---

## 2. Tailwind Configuration & Design System

LearnLoop uses a premium, modern design system heavily featuring glassmorphism, rounded corners, and dynamic colors. 

**`tailwind.config.ts` Starter:**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005da7',
          container: '#68abff',
          on: '#eef3ff',
        },
        secondary: {
          DEFAULT: '#843aa3',
          container: '#f1c1ff',
          on: '#ffedff',
        },
        tertiary: {
          DEFAULT: '#6f5900',
          container: '#fed023',
          on: '#fff2d3',
        },
        surface: {
          DEFAULT: '#f5f7fa',
          bright: '#ffffff',
          container: '#e5e8ec',
          on: '#2c2f32',
          variant: '#595c5e'
        },
        error: {
          DEFAULT: '#b31b25',
          container: '#fb5151',
          on: '#ffefee',
        }
      },
      fontFamily: {
        headline: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'premium': '0 12px 40px rgba(44, 47, 50, 0.06)',
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};

export default config;
```

**Global CSS Notes:**
Include `.glass-panel` utilities with `backdrop-filter: blur(16px)` and semi-transparent `rgba(255,255,255,0.7)` backgrounds.

---

## 3. Supabase Setup (Database & Real-time)

Here is the initial SQL Schema representing our DB Models. Ensure RLS (Row Level Security) is implemented later.

```sql
-- Users / Profiles
CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  xp numeric default 0,
  streak_count integer default 0,
  premium_status boolean default false,
  role text default 'user', -- 'admin' or 'user'
  created_at timestamp with time zone default now()
);

-- Learning Sets (Notes, Quizzes, Flashcards)
CREATE TABLE public.learning_sets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  source_type text, -- 'pdf', 'link', 'text', 'audio'
  content jsonb, -- AI generated questions & answers
  mastery_percentage numeric default 0,
  created_at timestamp with time zone default now()
);

-- Missions / Gamification Tracking
CREATE TABLE public.user_missions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  mission_type text not null, -- 'daily_quiz', 'streak_3'
  status text default 'pending', -- 'pending', 'completed'
  xp_reward integer not null,
  expires_at timestamp with time zone
);

-- Leaderboard View
-- Can fetch Top 30 Users dynamically ordered by XP
CREATE VIEW public.global_leaderboard AS 
SELECT id, username, avatar_url, xp, streak_count 
FROM public.profiles 
ORDER BY xp DESC 
LIMIT 30;
```
*Action Item:* Set up Supabase Realtime for `public.profiles` to broadcast XP updates to the Leaderboard.

---

## 4. Page Development & SEO Requirements

### Global SEO Standards:
- Utilize Next.js `metadata` API in `layout.tsx` and specific `page.tsx` files.
- Implement strictly customized `<title>` and `<meta name="description">`.
- Add Open Graph (`og:image`) and Twitter card schemas for social sharing.
- Use Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`).

### Page Breakdown:

1. **Landing Page:** 
   - **SEO:** Target Keywords: "AI Gamified Learning", "Auto generate flashcards", "Study app".
   - **UI:** Hero section with animated glassmorphic cards. Use Framer Motion for scroll reveal. Include a call-to-action to "Try for Free".

2. **Auth (Login/Signup/Forgot Password):**
   - Implement Supabase Auth UI or custom UI using `@supabase/ssr`.
   - Include Next.js Server Actions for secure login.
   - Support OAuth (Google/Github).

3. **Dashboard / Home:**
   - **State:** Fetch user XP, current streaks, and recent `learning_sets`.
   - **UI:** Render a primary "Input Area" to paste text/links/files for AI processing. Show a "Daily Mission" glass card.

4. **Results / Learning (Notes, Flashcards, Quizzes):**
   - Implement an interactive Flashcard component with 3D flip animation (Tailwind `preserve-3d`, `rotate-y-180`).
   - XP Progress bar that fills dynamically upon answering questions correctly.

5. **Leaderboard:**
   - **State:** Use Supabase Realtime subscriptions `supabase.channel('custom-all-channel')`.
   - Highlight the current user in the Top 30 list. Use staggered entry animations.

6. **Admin Panel:**
   - Protected Route middleware.
   - Tables with search/pagination for user moderation, adjusting XP points, and managing generic flagged content.

---

## 5. Gamification & AI Integration Details

- **State Management:** Use `Zustand` to manage the local `xp` counter and trigger a "Level Up" toast notification universally when thresholds are met.
- **AI Integration:** Build a route `/api/generate` that takes raw text/links, sends to OpenAI/Gemini, and returns a strict JSON structured schema containing `{ "flashcards": [...], "quizzes": [...] }`.
- **Missions:** Run a Supabase PostgreSQL cron job or Edge Function nightly to reset daily missions in the `user_missions` table.

---

## 6. Responsive Design & Animations

- **Mobile First:** Navigation should be a bottom tab bar on mobile (`fixed bottom-0 w-full`) and a left-aligned sidebar on desktop (`md:w-72 fixed left-0`).
- **Micro-interactions:** 
  - Buttons: `hover:scale-105 active:scale-95 transition-transform`.
  - XP Bars: Include an inner animated gradient to show active progress. Use Framer Motion `<motion.div layout />` for smooth bar expansions.
- **Dark Mode:** Support `next-themes` mapped back to Tailwind config classes (`dark:bg-surface-on dark:text-surface-bright`).

---

## 7. Step-by-Step Development Roadmap

Execute the build iteratively in the following order:

1. **Bootstrap & System Config:** Initialize Next.js 14, install Tailwind, configure Custom Fonts (`Plus Jakarta Sans` & `Inter`), setup Supabase CLI.
2. **Database & Auth Integration:** Deploy Supabase schemas, enable RLS, hook up Server-Side Rendering (SSR) Authentication via Supabase.
3. **Core Layous & UI Library:** Build `Sidebar`, `BottomNav`, `GlassCard`, and `Button` components. Set up Dark Mode provider.
4. **Landing Page & Navigation Flow:** Complete marketing page with high-end SEO, link up auth routes.
5. **Dashboard & AI Engine:** Build the main dashboard input area. Implement the `/api/generate` endpoint for creating learning content.
6. **Learning Interface (Flashcards/Quizzes):** Build the actual study screens with interactive feedback and flip animations.
7. **Gamification Layer:** Tie quiz results to XP updates in Supabase. Build the visual Level Up indicators.
8. **Social & Premium Features:** Implement Realtime Leaderboard fetching and stripe setup for the Premium Subscription tier.
9. **Admin Panel:** Create protected routes for content and user management.
10. **Final Audit:** Test responsiveness, SEO meta tags generation, Lighthouse scores, and micro-interaction fluidity.

---

## Deliverable Request (To Claude)
Please begin by generating the `layout.tsx`, `tailwind.config.ts`, `globals.css` and the `dashboard/page.tsx` integrating the UI specifications, Supabase client initialization, and state management structure dictated above. Ensure to include comments explaining where AI endpoints connect.
