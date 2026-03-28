"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-surface min-h-screen font-body">
      
      {/* Dynamic Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 md:px-12 h-20 border-b border-surface-container/30">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tighter">LearnLoop</Link>
          <div className="hidden md:flex gap-8 items-center font-headline font-bold text-sm tracking-wide">
            <Link href="#features" className="text-surface-variant hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-surface-variant hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="text-surface-variant hover:text-primary transition-colors">Pricing</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-surface-on hover:text-primary transition-colors px-4">Log in</Link>
          <Link href="/register" className="bg-primary text-white font-bold px-6 py-2.5 rounded-full shadow-lg hover:shadow-primary/30 active:scale-95 transition-all text-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full w-fit">
              <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">New: AI Study Missions live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black font-headline text-surface-on leading-[0.95] tracking-tighter">
              Turn any doc into <br /> an <span className="text-primary">interactive adventure.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-surface-variant font-medium leading-relaxed max-w-xl">
              Transform your notes, recordings, or links into gamified flashcards and quizzes instantly with AI. Level up your learning, conquer missions, and master anything.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/register" className="bg-primary text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center">
                Start Learning Free
              </Link>
              <Link href="#demo" className="bg-white border border-surface-container text-surface-on px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-bright active:scale-95 transition-all text-center">
                Watch Demo
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-surface bg-surface-container flex items-center justify-center font-bold text-xs ring-2 ring-white/50">{String.fromCharCode(64 + i)}</div>
                ))}
              </div>
              <p className="text-xs font-bold text-surface-variant">Join 7,000+ top performing scholars</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-4 rounded-[2.5rem] shadow-premium border border-surface-container relative z-10">
              <div className="aspect-[4/3] bg-surface-container rounded-[2rem] overflow-hidden relative overflow-hidden group">
                 {/* Video background for the hero screen mockup */}
                <video 
                  autoPlay muted loop playsInline 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">AI Flashcard Generator</p>
                      <p className="text-sm font-bold text-surface-on mt-1 italic">"Summarize Neuroscience Ch. 4"</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
                    <div className="h-full bg-primary w-2/3" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decors */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-3xl -z-10 rotate-12" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "AI Flashcards", val: "1.2M+" },
            { label: "Learning Hours", val: "500K+" },
            { label: "Daily Missions", val: "45K+" },
            { label: "Avg. Grade Jump", val: "+22%" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-3xl font-black font-headline text-primary tracking-tighter">{stat.val}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-surface-variant">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black font-headline text-surface-on tracking-tighter leading-none mb-6">Built for the <br /> <span className="text-secondary">modern learner.</span></h2>
          <p className="text-lg text-surface-variant font-medium">Forget messy notes. LearnLoop handles the heavy lifting so you can focus on mastering the concepts.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            { 
              title: "Instant Flashcards", 
              icon: "style", 
              color: "bg-primary/10 text-primary",
              desc: "Paste text or upload a PDF. Our AI generates high-quality active recall cards grounded in Spaced Repetition Science." 
            },
            { 
              title: "Adaptive Quizzes", 
              icon: "quiz", 
              color: "bg-secondary/10 text-secondary",
              desc: "Tests that evolve with you. We targeted your weak spots to ensure true mastery of any subject." 
            },
            { 
              title: "Gamified Arena", 
              icon: "emoji_events", 
              color: "bg-tertiary/10 text-tertiary",
              desc: "Earn XP, complete daily streaks, and compete in the global leaderboard. Studying finally feels like playing." 
            }
          ].map((feat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-surface-container shadow-sm hover:shadow-premium transition-all group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 shadow-inner ${feat.color}`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{feat.icon}</span>
              </div>
              <h3 className="text-2xl font-black font-headline text-surface-on mb-4 tracking-tight">{feat.title}</h3>
              <p className="text-sm text-surface-variant font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-surface-container bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-2xl font-black text-primary font-headline tracking-tighter">LearnLoop</span>
            <p className="text-xs font-bold text-surface-variant opacity-60">© 2026 LearnLoop. The future of AI-powered study.</p>
          </div>
          <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-surface-variant">
             <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
             <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
             <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
