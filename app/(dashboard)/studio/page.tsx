"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function StudioControlsPage() {
  const level = useStore((state) => state.level);

  const [complexity, setComplexity] = useState(3);
  const [questionCount, setQuestionCount] = useState(25);
  
  const complexityLabel = complexity < 3 ? "Foundational" : complexity > 3 ? "Expert" : "Intermediate";

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Dashboard</Link>
            <Link href="/community" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Community</Link>
            <Link href="/support" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-surface-variant p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">notifications</button>
          <button className="material-symbols-outlined text-surface-variant p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">settings</button>
          <div className="h-10 w-10 rounded-full border-2 border-primary-container bg-surface-container overflow-hidden flex items-center justify-center font-bold text-surface-variant">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar (Admin variant) */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container pb-6 z-40">
        <div className="px-6 mb-8 mt-6">
          <h2 className="font-headline text-xl font-bold text-primary">Admin Portal</h2>
          <p className="text-surface-variant text-xs font-semibold uppercase tracking-wider mt-1">System Overview</p>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/velocity" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-xl transition-all">
             <span className="material-symbols-outlined">insights</span> Analytics
          </Link>
          <Link href="/users" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-xl transition-all">
             <span className="material-symbols-outlined">group</span> Users
          </Link>
          <Link href="/studio" className="bg-primary/10 text-primary rounded-xl px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm">
             <span className="material-symbols-outlined">psychology</span> AI Controls
          </Link>
          <Link href="/billing" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-xl transition-all">
             <span className="material-symbols-outlined">payments</span> Billing
          </Link>
        </nav>
        <div className="px-4 mt-auto space-y-4">
          <button className="w-full bg-primary text-primary-on font-bold py-3 rounded-full shadow-md hover:brightness-110 transition-all font-headline text-sm">
            Export Data
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-24 pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-surface-on mb-2">AI Generation Controls</h1>
          <p className="text-surface-variant max-w-2xl text-lg">Tailor the machine learning algorithms to fit your curriculum requirements. Adjust complexity, depth, and output formats in real-time.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Global AI Parameters */}
          <section className="md:col-span-8 bg-white border border-surface-container p-8 rounded-2xl shadow-premium">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center border border-primary/20 shadow-inner">
                <span className="material-symbols-outlined text-primary">tune</span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-surface-on">Generation Parameters</h3>
                <p className="text-surface-variant text-sm mt-0.5">Fine-tune the complexity of generated items</p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Difficulty Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-headline font-bold text-surface-on">Cognitive Complexity</label>
                  <span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Level: {complexityLabel}
                  </span>
                </div>
                <input 
                  type="range" min="1" max="5" 
                  value={complexity} 
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between text-[10px] font-bold text-surface-variant uppercase tracking-widest mt-2">
                  <span>Foundational</span>
                  <span>Applied</span>
                  <span>Expert</span>
                </div>
              </div>

              {/* Question Count Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-headline font-bold text-surface-on">Batch Question Count</label>
                  <span className="text-primary font-bold bg-primary/5 px-3 py-1 rounded-full border border-primary/10">{questionCount} Items</span>
                </div>
                <input 
                  type="range" min="5" max="100" 
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary" 
                />
              </div>

              {/* Supported Formats Grid */}
              <div className="pt-6 border-t border-surface-container/50">
                <label className="font-headline font-bold text-surface-on block mb-6">Supported Formats</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <label className="flex items-center p-4 rounded-xl bg-surface border border-surface-container hover:border-primary/50 transition-all cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined mr-3 text-primary">check_circle</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-surface-on">MCQ</p>
                      <p className="text-[10px] text-surface-variant mt-0.5">Multiple Choice</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-5 w-5 bg-white border-surface-variant accent-primary" />
                  </label>

                  <label className="flex items-center p-4 rounded-xl bg-surface border border-surface-container hover:border-secondary/50 transition-all cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined mr-3 text-secondary">edit_note</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-surface-on">Short Answer</p>
                      <p className="text-[10px] text-surface-variant mt-0.5">Conceptual</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-secondary focus:ring-secondary h-5 w-5 bg-white border-surface-variant accent-secondary" />
                  </label>

                  <label className="flex items-center p-4 rounded-xl bg-surface border border-surface-container hover:border-tertiary/50 transition-all cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined mr-3 text-tertiary">code</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-surface-on">Code Lab</p>
                      <p className="text-[10px] text-surface-variant mt-0.5">Syntax & Logic</p>
                    </div>
                    <input type="checkbox" className="rounded text-tertiary focus:ring-tertiary h-5 w-5 bg-white border-surface-variant accent-tertiary" />
                  </label>

                </div>
              </div>
            </div>
          </section>

          {/* AI Engine Status & Templates */}
          <section className="md:col-span-4 space-y-8">
            
            {/* Status Card */}
            <div className="bg-surface border border-surface-container p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-primary text-primary-on text-[10px] font-bold px-3 py-1 rounded shadow-sm tracking-widest uppercase">Engine v4.2</span>
                  <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse border-2 border-green-200"></span>
                </div>
                <h4 className="font-headline font-bold text-xl text-surface-on mb-1">Learning Model</h4>
                <p className="text-sm text-surface-variant mb-8">Neural-Loom Multimodal</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-surface-variant uppercase tracking-wider">Uptime</span>
                    <span className="font-mono font-bold text-primary">99.98%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-primary h-full w-[99.9%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Templates Collection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-container">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline font-bold text-surface-on">AI Templates</h3>
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-all">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-surface rounded-xl flex items-center gap-4 border border-transparent hover:border-secondary/30 hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-surface-on">STEM Focused</p>
                    <p className="text-[10px] text-surface-variant">MCQ + Code Lab</p>
                  </div>
                  <span className="material-symbols-outlined text-surface-variant text-lg">star</span>
                </div>

                <div className="p-4 bg-surface rounded-xl flex items-center gap-4 border border-transparent hover:border-tertiary/30 hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 shadow-inner">
                    <span className="material-symbols-outlined">history_edu</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-surface-on">History Drill</p>
                    <p className="text-[10px] text-surface-variant">Short Answer Only</p>
                  </div>
                </div>

                <div className="p-4 bg-surface rounded-xl flex items-center gap-4 border border-transparent hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                    <span className="material-symbols-outlined">language</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-surface-on">Quick Vocab</p>
                    <p className="text-[10px] text-surface-variant">Mixed Batch</p>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* Bottom Feature Row */}
          <section className="md:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-surface-container flex items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-tertiary-container/30 flex items-center justify-center shrink-0 border border-tertiary/20 shadow-inner">
                <span className="material-symbols-outlined text-tertiary text-3xl">bolt</span>
              </div>
              <div className="flex-1">
                <h5 className="font-headline font-bold text-lg mb-2 text-surface-on">Instant Preview</h5>
                <p className="text-sm text-surface-variant leading-relaxed">Generate a sample quiz immediately to test your current parameters without saving them to the global learning model.</p>
                <div className="mt-6">
                   <Link href="/dashboard" className="text-primary font-bold text-sm flex items-center gap-2 hover:brightness-110">
                     Run Sample Batch <span className="material-symbols-outlined text-lg border border-primary/30 rounded-full p-0.5">arrow_forward</span>
                   </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-surface-container flex items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 shadow-inner">
                <span className="material-symbols-outlined text-secondary text-2xl">auto_awesome</span>
              </div>
              <div className="flex-1">
                <h5 className="font-headline font-bold text-lg mb-2 text-surface-on">Auto-Scaling</h5>
                <p className="text-sm text-surface-variant leading-relaxed">AI automatically adjusts difficulty based on student average performance across learning sets.</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 border border-secondary/20 rounded-md">Disabled</span>
                  <div className="w-12 h-6 bg-surface-container rounded-full relative p-1 cursor-pointer transition-colors hover:bg-surface-variant shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

          </section>

        </div>
      </main>
      
    </div>
  );
}
