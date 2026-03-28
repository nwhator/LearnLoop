'use client'; // Required for Zustand & React hooks

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { useStore } from '@/lib/store'; // Zustand store for XP and gamification state
// import { createClient } from '@/lib/supabase/client'; // Supabase browser client

export default function DashboardPage() {
  // --- STATE MANAGEMENT ---
  // const xp = useStore((state) => state.xp); // Example global state mapping
  // const incrementXP = useStore((state) => state.incrementXP);
  
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [learningSets, setLearningSets] = useState([]);

  // --- SUPABASE INITIALIZATION ---
  // const supabase = createClient();
  
  // Real-world example: Fetch active user sets on mount
  /*
  useEffect(() => {
    const fetchLearningSets = async () => {
      const { data, error } = await supabase
        .from('learning_sets')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setLearningSets(data);
    };
    fetchLearningSets();
  }, [supabase]);
  */

  // --- AI INTEGRATION ENDPOINT TRIGGER ---
  const handleGenerate = async () => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // CONNECTION TO AI ENDPOINT:
      // This routes to an internal Next.js API route that proxies to OpenAI/Gemini
      // const response = await fetch('/api/generate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ source_text: content }),
      // });
      
      // const data = await response.json();
      
      // The `data` schema strictly returns: { "flashcards": [...], "quizzes": [...] }
      // We would then push this into Supabase:
      // await supabase.from('learning_sets').insert({ content: data, user_id: '...' });

      // Trigger gamification (e.g. +50 XP for importing a new study set)
      // incrementXP(50);
      
      console.log('AI Generation success simulated!');
      
    } catch (e) {
      console.error('Generation Failed', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-surface w-full overflow-hidden">
      
      {/* Sidebar Mock (Desktop) */}
      <aside className="hidden md:flex flex-col w-72 bg-surface-bright border-r border-surface-container/50 h-full p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-on font-bold font-headline select-none">
            LL
          </div>
          <h1 className="text-2xl font-extrabold font-headline text-primary tracking-tighter">LearnLoop</h1>
        </div>

        {/* Gamification Indicator */}
        <div className="glass-panel bg-tertiary-container/30 border border-tertiary-container p-4 rounded-2xl mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-tertiary uppercase tracking-wide">Explorer Mode</span>
            <span className="material-symbols-outlined text-tertiary">local_fire_department</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            {/* Animated XP progression bar component would go here */}
            <motion.div 
              layout 
              className="h-full bg-tertiary origin-left" 
              initial={{ width: 0 }}
              animate={{ width: '65%' }} // Tied to Zustand XP state
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        <nav className="flex flex-col gap-2 font-semibold">
          <a href="#" className="flex items-center gap-4 bg-primary-container/20 text-primary rounded-full px-6 py-3 transition-transform hover:translate-x-1 active:scale-95">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          {/* other links */}
        </nav>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col p-8 lg:px-16 lg:py-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold font-headline text-surface-on tracking-tight">
            What do you want to learn today?
          </h2>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center hover:bg-surface-container transition-all active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden border-2 border-primary-container" />
          </div>
        </header>

        {/* Primary AI Input Hub */}
        <section className="relative w-full max-w-4xl">
          <div className="p-8 bg-surface-bright rounded-[2rem] shadow-premium relative z-10 border border-surface-container border-b-4 border-b-surface-variant/20">
            <div className="flex gap-4 mb-6">
              <button className="flex items-center gap-2 text-primary font-semibold text-sm px-4 py-2 bg-primary-container/20 rounded-xl hover:bg-primary-container/30 transition-colors">
                <span className="material-symbols-outlined text-lg">note_add</span> Paste Text
              </button>
              <button className="flex items-center gap-2 text-secondary font-semibold text-sm px-4 py-2 bg-secondary-container/20 rounded-xl hover:bg-secondary-container/30 transition-colors">
                <span className="material-symbols-outlined text-lg">link</span> Paste Link
              </button>
            </div>
            
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 resize-none rounded-xl bg-surface p-4 text-surface-on/80 placeholder:text-surface-variant border-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all appearance-none"
              placeholder="Paste your classroom notes or topic here to dynamically generate your AI learning adventure..."
            />

            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !content.trim()}
                className="flex items-center gap-3 bg-primary text-primary-on px-8 py-4 rounded-full font-headline font-bold text-lg shadow-lg hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
              >
                {isGenerating ? (
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined">auto_awesome</span>
                )}
                {isGenerating ? 'Generating Quizzes...' : 'Generate Learning Set'}
              </button>
            </div>
          </div>

          {/* Gamified Background Element */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-secondary-container to-primary-container rounded-full blur-3xl opacity-40 mix-blend-multiply z-0 pointer-events-none" />
        </section>

        {/* Dynamic Glassmorphic Card Example */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
           <div className="glass-panel bg-white/70 p-6 rounded-3xl border border-white shadow-glass hover:translate-y-[-4px] transition-transform cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-error-container/20 text-error rounded-2xl">
                   <span className="material-symbols-outlined">trending_down</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl">Weak Area Alert</h3>
                  <p className="text-surface-variant text-sm font-medium">Protein Synthesis (Biology 101)</p>
                </div>
              </div>
              <p className="text-surface-on/80 mb-6">4 new dynamic flashcards wait for you based on yesterday's quiz results.</p>
              <button className="text-error font-bold uppercase text-sm tracking-wider hover:underline">Review Now →</button>
           </div>
           
           {/* Daily Mission Card */}
           <div className="glass-panel bg-tertiary-container/10 p-6 rounded-3xl border border-tertiary-container/30 shadow-glass">
              <h3 className="font-headline font-bold text-xl mb-2 text-tertiary flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">stars</span> Daily Mission
              </h3>
              <p className="text-surface-on/80 mb-4">Complete 3 sets to unlock "Early Bird" badge.</p>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-4">
                 <div className="h-full bg-tertiary w-[33%]" />
              </div>
              <p className="text-xs font-bold text-surface-variant text-right">1 / 3 Completed</p>
           </div>
        </section>

      </main>
    </div>
  );
}
