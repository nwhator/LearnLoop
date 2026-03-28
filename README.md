# 🚀 LearnLoop | AI-Powered Gamified Learning Platform

LearnLoop is a cutting-edge, professional learning platform designed to transform static content—notes, PDFs, links, and audio—into an interactive, gamified adventure. By leveraging AI-generated quizzes and flashcards, LearnLoop makes studying engaging, competitive, and highly effective.

---

## 📖 Project Overview

LearnLoop bridges the gap between passive reading and active recall. Our mission is to provide a fun, engaging, and social learning environment that motivates users through gamification.

### Core Features:
- **🪄 AI Content Transformation**: Instantly convert any document or recording into structured learning sets.
- **🎮 Gamified Progression**: Earn XP, maintain streaks, and unlock exclusive badges.
- **🏆 Competitive Edge**: Rise through global leaderboards and challenge friends in social missions.
- **📊 Adaptive Learning**: Intelligent tracking of "weak areas" ensures you focus on what matters most.
- **⚡ Velocity Mode**: Fast-paced learning sessions designed for maximum retention in minimum time.

---

## 🎨 Design System

Our design language prioritizes clarity, energy, and a premium "glassmorphic" feel.

### 🍱 Style Notes
- **Aesthetics**: Clean, modern, and dark-mode compatible with subtle gradients and glass effects.
- **Animations**: Powered by Framer Motion for smooth transitions and micro-interactions.
- **Icons**: Material Symbols Outlined for a consistent, minimal look.

### 🎨 Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Primary** | `#005da7` | Action buttons, active states, progress bars |
| **Secondary** | `#843aa3` | Gamification elements, XP, and badges |
| **Tertiary** | `#6f5900` | Highlights, streaks, and awards |
| **Surface** | `#f5f7fa` | Main background and container surfaces |

### 📂 Typography
- **Headlines**: `Plus Jakarta Sans` — Bold, professional, and high-impact.
- **Body/Labels**: `Inter` — Highly legible and versatile for all screen sizes.

---

## 📱 Completed Screens

| Screen | Description |
| :--- | :--- |
| **Landing Page** | High-conversion entry point showcasing the value proposition and core loop. |
| **Login/Signup** | Seamless authentication flow with social login support. |
| **Dashboard** | Central hub for active sets, AI generation, and daily overview. |
| **Topic Library** | Organized collection of all generated and saved learning content. |
| **Learning Results** | Detailed breakdown of performance with AI-driven insights. |
| **Leaderboard** | Real-time social ranking based on weekly and monthly performance. |
| **Daily Missions** | Time-sensitive challenges to drive daily engagement and rewards. |
| **Progress/History** | In-depth analytics of your learning journey and mastery levels. |
| **Profile & Settings** | User personalization, badge showcases, and account management. |
| **Premium Subscription** | Tiered pricing and feature unlocks for advanced learners. |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Material Symbols](https://fonts.google.com/icons)

---

## 🏗️ Folder Structure Suggestion

Recommended structure for Next.js + Supabase + Tailwind integration:

```text
learnloop/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected application routes
│   └── api/              # Serverless API endpoints
├── components/           # Reusable UI components
│   ├── ui/               # Primary design system atoms (Buttons, Inputs)
│   ├── gamification/     # XP bars, Streaks, Badge displays
│   └── layout/           # Navbars, Sidebars, Footers
├── lib/                  # Utilities and shared logic
│   ├── supabase/         # Supabase client and types
│   └── utils/            # Tailwind helpers and calculation logic
├── public/               # Static assets (images, icons)
├── styles/               # Global CSS and Tailwind entry
└── types/                # TypeScript definitions for DB and App
```

---

## 👷 Development & Logic

### 🚀 Implementation Notes
- **Utility-First**: Strictly follow Tailwind's utility-first approach for responsive scaling across mobile and desktop.
- **Micro-interactions**: Use `active:scale-95` and `hover:translate-x-1` patterns found in our design files to ensure the app feels "alive."
- **Supabase Schema**:
  - `users`: Profiles, cumulative XP, and streak counts.
  - `learning_sets`: AI-extracted content linked to users.
  - `progress_logs`: Granular tracking of quiz answers for "weak area" detection.
  - `missions`: Dynamic daily challenges with expiration logic.

### 🔮 Future Enhancements (Roadmap)
- **AI Settings**: Configuration for AI extraction depth and tone.
- **Social Hub**: Community-shared study sets and collaborative learning.
- **Notifications**: Intelligent nudges to maintain streaks.
- **Admin Portal**: Comprehensive moderation and system analytics dashboard.

---

## 🎯 Our Goal
LearnLoop aims to be the **ultimate companion for the modern learner**—making knowledge acquisition feel less like a chore and more like a game you actually want to win.

---

> [!TIP]
> **Getting Started**: Clone the repo, run `npm install`, and set up your `.env.local` with Supabase credentials to begin.
