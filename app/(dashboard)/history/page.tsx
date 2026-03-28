"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function HistoryProgressPage() {
  const level = useStore((state) => state.level);
  const xp = useStore((state) => state.xp);

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Dashboard</Link>
            <Link href="/library" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Library</Link>
            <Link href="/history" className="text-primary font-bold border-b-2 border-primary font-headline px-3 py-1">History</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">bolt</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">workspace_premium</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">local_fire_department</button>
          </div>
          <div className="h-10 w-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/10 flex items-center justify-center font-bold text-surface-variant">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-full w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container z-40">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <span className="text-surface-on font-bold text-lg font-headline">Alex Chen</span>
          <span className="text-surface-variant text-xs font-semibold uppercase tracking-wider">Level {level} Architect</span>
          <button className="mt-6 w-full bg-primary text-primary-on font-bold py-3 px-4 rounded-full shadow-md active:translate-x-1 transition-all duration-150 text-sm flex items-center justify-center gap-2 hover:brightness-110">
             Start Daily Quiz
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/dashboard" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/library" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">local_library</span> Library
          </Link>
          <Link href="/leaderboard" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">leaderboard</span> Leaderboard
          </Link>
          <Link href="/missions" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">assignment_turned_in</span> Missions
          </Link>
          <Link href="/history" className="bg-primary/10 text-primary rounded-full px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm">
             <span className="material-symbols-outlined">history</span> History
          </Link>
          <Link href="/profile" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">person</span> Profile
          </Link>
        </nav>
        <div className="p-4 mt-auto border-t border-surface-container flex flex-col gap-1">
          <Link href="/notifications" className="text-surface-variant px-4 py-2 flex items-center gap-3 text-xs font-bold hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-lg">notifications</span> Notifications
          </Link>
          <Link href="/settings" className="text-surface-variant px-4 py-2 flex items-center gap-3 text-xs font-bold hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-lg">settings</span> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold font-headline text-surface-on tracking-tight mb-2">Academic Journey</h1>
            <p className="text-surface-variant text-lg">Review your progress, milestones, and daily learning habits.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* XP Over Time Chart Mockup */}
            <section className="md:col-span-8 bg-white border border-surface-container rounded-2xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-headline text-surface-on">Experience Points (XP)</h2>
                  <p className="text-sm text-surface-variant">Last 30 days performance</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary-container text-primary-on rounded-full text-xs font-bold shadow-sm">Total: {xp} XP</span>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 relative">
                {/* Simulated Chart Grid Lines */}
                <div className="absolute inset-0 border-b border-surface-container flex flex-col justify-between py-2 opacity-50 pointer-events-none">
                  <div className="border-b border-surface-container h-full"></div>
                  <div className="border-b border-surface-container h-full"></div>
                  <div className="border-b border-surface-container h-full"></div>
                </div>
                <div className="flex-1 bg-primary/20 rounded-t-lg relative group h-[40%]"><div className="absolute bottom-0 w-full bg-primary h-1 rounded-t-full"></div></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[55%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[45%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[70%]"></div>
                <div className="flex-1 bg-primary/40 rounded-t-lg h-[85%] border-t-2 border-primary"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[60%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[50%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[90%]"></div>
                <div className="flex-1 bg-primary/60 rounded-t-lg h-[95%] border-t-2 border-primary"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[40%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[65%]"></div>
                <div className="flex-1 bg-primary/20 rounded-t-lg h-[75%]"></div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-surface-variant font-medium">
                <span>1st Nov</span>
                <span>15th Nov</span>
                <span>Today</span>
              </div>
            </section>

            {/* Performance Stats Card */}
            <section className="md:col-span-4 space-y-8">
              <div className="bg-primary text-primary-on rounded-2xl p-6 shadow-premium relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                  <h3 className="text-3xl font-black font-headline mb-1">14 Days</h3>
                  <p className="text-sm opacity-90 font-medium">Current Learning Streak</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 scale-150">
                  <span className="material-symbols-outlined text-[120px]">local_fire_department</span>
                </div>
              </div>

              <div className="bg-white border border-surface-container rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold font-headline mb-4 text-surface-on">Core Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-surface-container/50">
                    <span className="text-sm font-semibold text-surface-on">Quizzes Taken</span>
                    <span className="font-bold text-primary font-headline">142</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-surface-container/50">
                    <span className="text-sm font-semibold text-surface-on">Average Accuracy</span>
                    <span className="font-bold text-secondary font-headline">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-surface-container/50">
                    <span className="text-sm font-semibold text-surface-on">Study Hours</span>
                    <span className="font-bold text-tertiary font-headline">48.5h</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Activity List */}
            <section className="md:col-span-12 lg:col-span-7 bg-white border border-surface-container rounded-2xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-headline text-surface-on">Recent Activity</h2>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
              </div>
              <div className="space-y-6">
                {[
                  { title: 'Structural Design Advanced Quiz', time: '2h ago', desc: 'Score: 95/100 • +250 XP earned', icon: 'architecture', color: 'bg-secondary-container text-secondary-on' },
                  { title: 'Module 4: Sustainable Materials', time: 'Yesterday', desc: 'Read for 45 minutes • 85% completion', icon: 'menu_book', color: 'bg-primary-container text-primary-on' },
                  { title: 'Weekly Challenge: History of Form', time: '2 days ago', desc: 'Ranked 4th on Leaderboard • +500 XP bonus', icon: 'emoji_events', color: 'bg-tertiary-container text-tertiary-on' }
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface transition-colors border border-transparent hover:border-surface-container">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${act.color}`}>
                      <span className="material-symbols-outlined">{act.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold font-headline">{act.title}</h4>
                        <span className="text-xs text-surface-variant font-medium whitespace-nowrap ml-4">{act.time}</span>
                      </div>
                      <p className="text-sm text-surface-variant mt-1">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Completed Missions & Badges */}
            <section className="md:col-span-12 lg:col-span-5 bg-white border border-surface-container rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-headline text-surface-on mb-8">Achievements</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="aspect-square bg-surface border border-surface-container rounded-2xl p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-bright hover:border-tertiary/30 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-tertiary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-surface-variant">Early Bird</span>
                  <p className="text-[10px] mt-1 text-surface-on/70">5 sessions before 7 AM</p>
                </div>
                <div className="aspect-square bg-surface border border-surface-container rounded-2xl p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-surface-bright hover:border-secondary/30 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-surface-variant">Fast Learner</span>
                  <p className="text-[10px] mt-1 text-surface-on/70">Completed 10 modules</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-surface-variant">Current Missions</h4>
                <div className="p-4 border border-surface-container rounded-xl bg-surface">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold">Vocabulary Master</span>
                    <span className="text-xs font-bold text-primary tracking-widest">8/10</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="p-4 border border-surface-container rounded-xl bg-surface opacity-60 grayscale">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold">Social Butterfly</span>
                    <span className="text-xs font-bold text-primary tracking-widest">1/5</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      
      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-white/95 backdrop-blur-lg border-t border-surface-container shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-[2rem]">
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Dash</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">local_library</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Library</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center justify-center bg-primary-container text-primary rounded-2xl px-5 py-2 relative -top-3 shadow-sm border border-primary/10">
          <span className="material-symbols-outlined">history</span>
          <span className="font-headline text-[10px] font-semibold mt-1">History</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Leader</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Profile</span>
        </Link>
      </nav>

    </div>
  );
}
