"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function GeneratingStatePage() {
  const router = useRouter();
  const level = useStore((state) => state.level);

  // In a real app we might poll or wait for a websocket event
  // Here we'll simulate waiting 5 seconds then redirecting
  useEffect(() => {
    const timer = setTimeout(() => {
       // redirect to a results page mock
       router.push("/results/mock-generated-123");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tight">LearnLoop</Link>
        </div>
      </nav>

      {/* SideNavBar (hidden on this focused screen, or simplified) */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container pb-6 z-40">
        <div className="px-6 mb-8 mt-6">
          <p className="text-xl font-bold text-on-surface font-headline">AI Studio</p>
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mt-1">Lvl {level} Architect</p>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/dashboard" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-xl transition-all">
             <span className="material-symbols-outlined">dashboard</span> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-24 pb-32 px-6 lg:px-12 max-w-7xl mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
        
        <div className="w-full max-w-lg bg-white border border-surface-container rounded-3xl p-10 flex flex-col items-center text-center shadow-premium group">
            <div className="w-full aspect-square relative mb-8 flex items-center justify-center max-h-[200px]">
                <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse transition-transform duration-500"></div>
                <div className="relative">
                    <span className="material-symbols-outlined text-primary text-7xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-on-surface mb-3 font-headline">Cooking New Content</h3>
            <p className="text-on-surface-variant text-base leading-relaxed mb-10">
                Our AI tutors are currently drafting your personalized quizzes and flashcards. This usually takes less than a minute.
            </p>
            
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-sm shadow-inner">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                    Processing Neural Weights
                </div>
                
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full py-4 border-2 border-surface-container text-on-surface-variant font-bold rounded-full hover:bg-surface-bright active:scale-95 transition-all"
                >
                    Cancel Generation
                </button>
            </div>
        </div>

      </main>
    </div>
  );
}
