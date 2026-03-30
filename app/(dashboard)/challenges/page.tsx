"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function ChallengesPage() {
  const level = useStore((state) => state.level);
  
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-on-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Dashboard</Link>
            <Link href="/library" className="text-on-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Library</Link>
            <Link href="/history" className="text-on-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">History</Link>
            <Link href="/challenges" className="text-primary font-bold border-b-2 border-primary font-headline px-3 py-1">Challenges</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">bolt</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">workspace_premium</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">local_fire_department</button>
          </div>
          <div className="h-10 w-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/10 flex items-center justify-center font-bold text-on-surface-variant">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-full w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container z-40">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <span className="text-on-surface font-bold text-lg font-headline">Alex Chen</span>
          <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Level {level} Architect</span>
          <button className="mt-6 w-full bg-primary text-on-primary font-bold py-3 px-4 rounded-full shadow-md active:translate-x-1 transition-all duration-150 text-sm flex items-center justify-center gap-2 hover:brightness-110">
             Start Daily Quiz
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/dashboard" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/library" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">local_library</span> Library
          </Link>
          <Link href="/leaderboard" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">leaderboard</span> Leaderboard
          </Link>
          <Link href="/challenges" className="bg-primary/10 text-primary rounded-full px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm">
             <span className="material-symbols-outlined">swords</span> Challenges
          </Link>
          <Link href="/missions" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">assignment_turned_in</span> Missions
          </Link>
          <Link href="/profile" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">person</span> Profile
          </Link>
        </nav>
      </aside>

      {/* Main Canvas */}
      <main className="pt-24 pb-12 px-6 lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary text-[10px] font-bold rounded-full mb-3 tracking-widest hidden md:inline-block">SOCIAL ARENA</span>
              <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Challenge Your Network</h1>
              <p className="text-on-surface-variant mt-2 font-medium">Ignite friendly competition and climb the global ranks.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-surface text-primary font-bold rounded-full hover:bg-surface-container border border-surface-container transition-colors active:scale-95 shadow-sm">
                <span className="material-symbols-outlined">group_add</span> Find Friends
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-full shadow-md active:scale-95 transition-transform hover:brightness-110">
                <span className="material-symbols-outlined">rocket_launch</span> Global Duel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. Invite a Friend Section */}
              <section className="bg-white border border-surface-container rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-secondary">person_search</span> Invite a Rival
                  </h2>
                </div>
                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
                  <input type="text" placeholder="Search by username or email..." className="w-full bg-surface border border-surface-container rounded-full py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-medium placeholder-surface-variant outline-none" />
                </div>
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 no-scrollbar">
                  {[
                    { name: 'Sarah Jenkins', lvl: 'Lvl 24 • 8.2k XP', dot: 'bg-green-500' },
                    { name: 'Marcus Thorne', lvl: 'Lvl 18 • 5.1k XP', dot: 'bg-surface-variant' }
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-surface-bright transition-colors group cursor-pointer border border-surface-container hover:border-primary/30">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface-variant">{user.name.charAt(0)}</div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 ${user.dot} border-2 border-white rounded-full`}></div>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface">{user.name}</p>
                          <p className="text-[10px] text-on-surface-variant font-medium">{user.lvl}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter hidden group-hover:block">Select</span>
                        <div className="w-6 h-6 rounded-full border-2 border-surface-variant group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                          <span className="material-symbols-outlined text-xs text-transparent group-hover:text-primary">check</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Selected Item */}
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface-variant">E</div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">Elena Rodriguez</p>
                        <p className="text-[10px] text-on-surface-variant font-medium">Lvl 31 • 12.4k XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Selected</span>
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-xs text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Choose Topic Section */}
              <section className="bg-white border border-surface-container rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold font-headline mb-6 flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-tertiary">category</span> Select the Battleground
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 rounded-xl bg-surface border border-surface-container hover:border-secondary/50 transition-all flex flex-col items-center gap-3 group hover:shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl text-secondary">terminal</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">Cloud Arch</span>
                  </button>
                  <button className="p-4 rounded-xl bg-secondary/5 border-2 border-secondary transition-all flex flex-col items-center gap-3 group shadow-[0_0_15px_rgba(200,80,240,0.1)]">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-2xl text-secondary">psychology</span>
                    </div>
                    <span className="text-xs font-bold text-secondary">AI Ethics</span>
                  </button>
                  <button className="p-4 rounded-xl bg-surface border border-surface-container hover:border-secondary/50 transition-all flex flex-col items-center gap-3 group hover:shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl text-secondary">palette</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">UX Theory</span>
                  </button>
                  <button className="p-4 rounded-xl bg-surface border border-surface-container hover:border-secondary/50 transition-all flex flex-col items-center gap-3 group hover:shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl text-secondary">data_object</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">JS Patterns</span>
                  </button>
                  <button className="p-4 rounded-xl bg-surface border border-surface-container hover:border-secondary/50 transition-all flex flex-col items-center gap-3 group hover:shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl text-secondary">history_edu</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">History</span>
                  </button>
                  <button className="p-4 rounded-xl bg-surface border border-surface-container hover:border-secondary/50 transition-all flex flex-col items-center gap-3 group hover:shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl text-on-surface-variant">more_horiz</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">Browse</span>
                  </button>
                </div>
              </section>

            </div>

            <div className="lg:col-span-5 space-y-8">
              
              {/* 3. Current Active Challenges */}
              <section className="bg-white border border-surface-container rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-surface-container">
                  <h2 className="text-lg font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>potted_plant</span> Active Duels
                  </h2>
                </div>
                <div className="divide-y divide-surface-container">
                  <div className="p-6 flex items-center gap-4 hover:bg-surface transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">science</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-sm text-on-surface">Quantum Physics 101</p>
                        <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-0.5 rounded uppercase tracking-wider">2h left</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] text-on-surface-variant font-medium">vs Sofia Davis</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
                  
                  <div className="p-6 flex items-center gap-4 hover:bg-surface transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary">architecture</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-sm text-on-surface">System Design Elite</p>
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded uppercase tracking-wider">18h left</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] text-on-surface-variant font-medium">vs Liam White</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
                </div>
                <div className="p-4 bg-surface text-center border-t border-surface-container">
                  <button className="text-xs font-bold text-primary hover:underline">View All Active</button>
                </div>
              </section>

              {/* 4. Mini Leaderboard */}
              <section className="bg-gradient-to-br from-secondary to-[#570278] rounded-2xl p-6 text-white shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl mix-blend-overlay pointer-events-none"></div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div>
                    <h2 className="text-xl font-bold font-headline leading-tight">Lightning Sprint</h2>
                    <p className="text-xs text-white/80 mt-1">24H Global Flash Challenge</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-white">timer</span>
                  </div>
                </div>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold w-4 opacity-70">1</span>
                      <div className="w-8 h-8 rounded-full border border-white/20 bg-white/20 flex items-center justify-center text-[10px] font-bold">K</div>
                      <p className="text-sm font-bold">Kendra M.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">2,450 XP</p>
                      <div className="flex items-center justify-end text-[10px] gap-1 text-green-300 mt-0.5 font-medium">
                        <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30 scale-105 shadow-xl mx-1 z-20 relative">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold w-4 text-white">2</span>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">A</div>
                      <p className="text-sm font-bold text-white">You (Alex)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">2,310 XP</p>
                      <div className="flex items-center justify-end text-[10px] gap-1 text-white/80 mt-0.5 font-medium">
                        <span className="material-symbols-outlined text-[12px]">history</span> -140 pts
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 opacity-80">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold w-4 opacity-70">3</span>
                      <div className="w-8 h-8 rounded-full border border-white/20 bg-white/20 flex items-center justify-center text-[10px] font-bold">D</div>
                      <p className="text-sm font-bold">David J.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">2,280 XP</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 py-4 bg-white text-secondary font-bold text-sm rounded-xl hover:brightness-95 transition-all active:scale-95 shadow-md relative z-10 box-border border border-transparent">
                  Boost Your Score (+50 XP)
                </button>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed right-6 bottom-24 md:bottom-8 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-premium active:scale-90 transition-transform z-40 group hover:brightness-110">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">swords</span>
      </button>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-white/95 backdrop-blur-lg border-t border-surface-container shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-[2rem]">
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Dash</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">local_library</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Library</span>
        </Link>
        <Link href="/challenges" className="flex flex-col items-center justify-center bg-primary-container text-primary rounded-2xl px-5 py-2 relative -top-3 shadow-sm border border-primary/10">
          <span className="material-symbols-outlined">swords</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Social</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Leader</span>
        </Link>
        <Link href="/missions" className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Missions</span>
        </Link>
      </nav>

    </div>
  );
}
