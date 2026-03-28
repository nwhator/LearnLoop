"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function VelocityAnalyticsPage() {
  const level = useStore((state) => state.level);

  return (
    <div className="bg-surface text-surface-on min-h-screen relative overflow-hidden">
      
      {/* Contextual FAB (Copied from HTML functionality) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-primary text-primary-on rounded-full shadow-premium flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group">
           <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">smart_toy</span>
        </button>
      </div>

      {/* Side Navigation Bar (Admin / Deep Analytics specific layout adjustment - blending with dashboard) */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-surface-bright border-r border-surface-container z-40">
        <div className="flex flex-col h-full p-4 gap-2">
          
          <div className="px-4 py-6 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-on shadow-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
              </div>
              <div>
                <h2 className="text-lg font-black font-headline text-primary leading-none">LearnLoop</h2>
                <p className="text-[10px] font-bold text-surface-variant mt-1 tracking-widest uppercase">System Analytics</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1">
             <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-primary hover:bg-surface-container rounded-xl font-headline text-sm font-semibold transition-all">
               <span className="material-symbols-outlined">dashboard</span>
               <span>Dashboard Output</span>
             </Link>
             <Link href="/velocity" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-headline text-sm font-semibold transition-all">
               <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
               <span>Velocity Metrics</span>
             </Link>
             <Link href="/leaderboard" className="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-primary hover:bg-surface-container rounded-xl font-headline text-sm font-semibold transition-all">
               <span className="material-symbols-outlined">leaderboard</span>
               <span>Global Ranks</span>
             </Link>
          </nav>
          
          <div className="pt-4 border-t border-surface-container space-y-1">
             <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-primary hover:bg-surface-container rounded-xl font-headline text-sm font-semibold transition-all">
               <span className="material-symbols-outlined">settings</span>
               <span>Settings</span>
             </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-0 md:ml-64 min-h-screen">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-surface-container/50">
          <div className="flex items-center justify-between px-8 py-4 w-full">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold font-headline tracking-tight text-primary">Intelligence Console</h1>
              <div className="relative hidden lg:block">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-surface-variant text-lg">search</span>
                <input type="text" placeholder="Search analytics..." className="pl-12 pr-4 py-2 bg-surface border border-surface-container rounded-full text-sm w-72 focus:ring-2 focus:ring-primary outline-none transition-all placeholder-surface-variant" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors active:scale-95 duration-200">
                <span className="material-symbols-outlined text-surface-variant">notifications</span>
              </button>
              <div className="h-8 w-px bg-surface-container mx-2"></div>
               <div className="flex items-center gap-3 pl-2">
                 <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-surface-on">Alex Rivera</p>
                   <p className="text-[10px] text-surface-variant uppercase tracking-wider font-bold">Lvl {level} Admin</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold shadow-inner">
                   A
                 </div>
               </div>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-8 max-w-[1600px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl font-extrabold font-headline text-surface-on tracking-tight">Velocity Engine</h2>
              <p className="text-surface-variant mt-2 text-lg">Real-time performance metrics and AI generation growth data.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-surface border border-surface-container rounded-full p-1 shadow-inner">
                <button className="px-5 py-2 text-xs font-bold bg-white shadow-sm rounded-full text-primary">Live</button>
                <button className="px-5 py-2 text-xs font-bold text-surface-variant hover:text-surface-on">24h</button>
                <button className="px-5 py-2 text-xs font-bold text-surface-variant hover:text-surface-on">7d</button>
              </div>
              <button className="flex items-center gap-2 bg-primary text-primary-on px-6 py-2.5 rounded-full font-bold text-sm shadow-premium hover:brightness-110 transition-all active:scale-95">
                <span className="material-symbols-outlined text-lg">download</span> Generate Report
              </button>
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            
            <div className="bg-white border border-surface-container p-6 rounded-2xl relative overflow-hidden group hover:shadow-premium hover:border-primary/20 transition-all">
              <div className="relative z-10">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Daily Active Users</p>
                <h3 className="text-4xl font-black font-headline text-surface-on">42,892</h3>
                <div className="mt-4 flex items-center gap-2">
                   <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                     <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                   </span>
                   <span className="text-[10px] text-surface-variant font-bold">vs last period</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-surface-container p-6 rounded-2xl relative overflow-hidden group hover:shadow-premium hover:border-secondary/20 transition-all">
              <div className="relative z-10">
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Completion Rate</p>
                <h3 className="text-4xl font-black font-headline text-surface-on">78.4%</h3>
                <div className="mt-4 flex items-center gap-2">
                   <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                     <span className="material-symbols-outlined text-sm">trending_up</span> 3.1%
                   </span>
                   <span className="text-[10px] text-surface-variant font-bold">vs average</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-surface-container p-6 rounded-2xl relative overflow-hidden group hover:shadow-premium hover:border-tertiary/20 transition-all">
              <div className="relative z-10">
                <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">XP Distributed</p>
                <h3 className="text-4xl font-black font-headline text-surface-on">1.2M</h3>
                <div className="mt-4 flex items-center gap-2">
                   <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                     <span className="material-symbols-outlined text-sm">bolt</span> +150k
                   </span>
                   <span className="text-[10px] text-surface-variant font-bold">today</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-surface-container p-6 rounded-2xl relative overflow-hidden group hover:shadow-premium hover:border-primary/20 transition-all">
               <div className="relative z-10">
                 <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Nodes Generated</p>
                 <h3 className="text-4xl font-black font-headline text-surface-on">842k</h3>
                 <div className="mt-4 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                      <span className="material-symbols-outlined text-sm">auto_awesome</span> +8%
                    </span>
                    <span className="text-[10px] text-surface-variant font-bold">MoM Growth</span>
                 </div>
               </div>
            </div>
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Topic Popularity Index (2/3 width) */}
            <div className="lg:col-span-2 bg-white border border-surface-container rounded-2xl p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                 <div>
                   <h3 className="text-xl font-bold font-headline text-surface-on">Topic Knowledge Index</h3>
                   <p className="text-sm text-surface-variant mt-1">Generation volume across categories</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-surface border border-surface-container hover:bg-surface-bright transition-colors">
                      <span className="material-symbols-outlined text-surface-variant text-lg">public</span>
                    </button>
                 </div>
               </div>

               <div className="space-y-6">
                 {[
                   { name: 'Quantum Computing & AI', pct: 89.4, color: 'bg-primary' },
                   { name: 'Generative Art & Design', pct: 72.1, color: 'bg-secondary' },
                   { name: 'Ancient Civilizations', pct: 64.8, color: 'bg-tertiary' },
                   { name: 'Synthetic Biology', pct: 42.3, color: 'bg-surface-variant' }
                 ].map((stat, i) => (
                   <div key={i} className="group">
                     <div className="flex items-center justify-between mb-2">
                       <span className="text-sm font-bold text-surface-on font-headline">{stat.name}</span>
                       <span className="text-sm font-bold tracking-widest text-surface-variant">{stat.pct}%</span>
                     </div>
                     <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-surface-container/50 shadow-inner">
                       <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.pct}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* System Load Monitor */}
            <div className="bg-white border border-surface-container rounded-2xl p-8 shadow-sm flex flex-col">
               <div className="mb-8">
                 <h3 className="text-xl font-bold font-headline text-surface-on">AI Load Monitor</h3>
                 <p className="text-sm text-surface-variant mt-1">Gemini generation wait latency</p>
               </div>
               
               <div className="flex-1 flex flex-col justify-center items-center text-center">
                 <div className="relative w-48 h-48 mb-6">
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                     <circle className="text-surface border-surface-container" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="8"></circle>
                     <circle className="text-primary" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="198" strokeLinecap="round" strokeWidth="8"></circle>
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                     <span className="text-5xl font-black font-headline text-surface-on tracking-tighter">0.8s</span>
                     <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-2">Optimal</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-surface border border-surface-container p-4 rounded-2xl">
                       <p className="text-[10px] font-bold text-surface-variant uppercase mb-1 tracking-widest">Flash API</p>
                       <p className="text-xl font-black font-headline text-surface-on">124<span className="text-sm text-surface-variant">req/s</span></p>
                    </div>
                    <div className="bg-surface border border-surface-container p-4 rounded-2xl">
                       <p className="text-[10px] font-bold text-surface-variant uppercase mb-1 tracking-widest">Base Latency</p>
                       <p className="text-xl font-black font-headline text-surface-on">42<span className="text-sm text-surface-variant">ms</span></p>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
