"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function ProfilePage() {
  const level = useStore((state) => state.level);
  const xp = useStore((state) => state.xp);
  const streak = useStore((state) => state.streak);
  
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex justify-between items-center px-6 md:px-12 h-20 border-b border-surface-container/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tighter">LearnLoop</Link>
          <div className="hidden md:flex gap-6 items-center font-headline font-bold">
            <Link href="/dashboard" className="text-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/leaderboard" className="text-surface-variant hover:text-primary transition-colors">Leaderboard</Link>
            <Link href="/missions" className="text-surface-variant hover:text-primary transition-colors">Missions</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-surface-container-high shadow-inner">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="font-bold text-sm text-surface-on">{xp} XP</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/subscription" className="p-2 hover:bg-surface-container-highest rounded-full transition-all active:scale-95 group">
              <span className="material-symbols-outlined text-tertiary group-hover:drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </Link>
            <Link href="/missions" className="p-2 hover:bg-surface-container-highest rounded-full transition-all active:scale-95 flex items-center gap-1 group">
              <span className="material-symbols-outlined text-orange-500 group-hover:drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <span className="font-bold text-sm text-surface-on hidden sm:block">{streak}</span>
            </Link>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary border-2 border-primary/20 shadow-sm ml-2">
               A
            </div>
          </div>
        </div>
      </nav>

      {/* SideNavBar Shell */}
      <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-[18rem] bg-surface-bright hidden lg:flex flex-col gap-2 pt-8 z-40 border-r border-surface-container pb-6">
        <div className="px-8 mb-6">
          <div className="flex flex-col">
            <span className="font-headline text-sm font-bold text-secondary">Level {level} Explorer</span>
            <span className="text-xs text-surface-variant mt-0.5 font-medium">{1000 - (xp % 1000)} XP to Level {level+1}</span>
            <div className="w-full h-1.5 bg-surface-container rounded-full mt-3 overflow-hidden shadow-inner flex">
              <div className="h-full bg-gradient-to-r from-secondary to-secondary/60 rounded-full" style={{ width: `${(xp % 1000) / 10}%` }}></div>
            </div>
          </div>
          <Link href="/dashboard" className="mt-4 inline-block text-[11px] font-bold text-primary hover:underline uppercase tracking-wider">View All Badges</Link>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto px-4 mt-2">
          <Link href="/dashboard" className="text-surface-variant px-6 py-3.5 flex items-center gap-3 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/leaderboard" className="text-surface-variant px-6 py-3.5 flex items-center gap-3 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">leaderboard</span> Leaderboard
          </Link>
          <Link href="/missions" className="text-surface-variant px-6 py-3.5 flex items-center gap-3 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">stars</span> Daily Missions
          </Link>
          <Link href="/history" className="text-surface-variant px-6 py-3.5 flex items-center gap-3 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">analytics</span> Results
          </Link>
          <Link href="/profile" className="bg-secondary/10 text-secondary border border-secondary/20 shadow-sm px-6 py-3.5 rounded-full flex items-center gap-3 text-sm font-semibold mt-1">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span> Profile
          </Link>
        </nav>
        
        <div className="pb-4 px-4 flex flex-col gap-1 border-t border-surface-container pt-4">
          <Link href="/settings" className="text-surface-variant px-6 py-3 flex items-center gap-3 hover:bg-surface-container rounded-full transition-all text-sm font-semibold group">
            <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">settings</span> Settings
          </Link>
          <Link href="/support" className="text-surface-variant px-6 py-3 flex items-center gap-3 hover:bg-surface-container rounded-full transition-all text-sm font-semibold group">
            <span className="material-symbols-outlined group-hover:-rotate-12 transition-transform">help</span> Support
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-[18rem] pt-32 pb-16 px-6 lg:px-12 max-w-[1600px] min-h-screen">
        <div className="grid grid-cols-12 gap-8">
            
            {/* Bento Column Left: Profile Identity */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                
                {/* Profile Header Card */}
                <section className="bg-white p-8 rounded-[2rem] shadow-premium flex flex-col items-center text-center border border-surface-container relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>
                    <div className="relative mb-6 z-10 mt-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-white shadow-md">
                            <div className="w-full h-full bg-surface-container rounded-full flex justify-center items-center text-primary text-5xl font-bold font-headline">A</div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                            <span className="text-xs font-bold font-headline">{level}</span>
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-black font-headline text-surface-on mb-1 z-10">Alex Rivers</h1>
                    <p className="text-surface-variant text-sm mb-8 z-10 font-medium tracking-wide">Product Designer & Lifelong Learner</p>
                    
                    <div className="flex w-full gap-4 z-10">
                        <div className="flex-1 bg-surface border border-surface-container p-5 rounded-2xl shadow-inner group-hover:border-secondary/30 transition-colors">
                            <span className="block text-secondary font-black text-2xl leading-none mb-1 font-headline">{streak}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-surface-variant">Day Streak</span>
                        </div>
                        <div className="flex-1 bg-surface border border-surface-container p-5 rounded-2xl shadow-inner group-hover:border-primary/30 transition-colors">
                            <span className="block text-primary font-black text-2xl leading-none mb-1 font-headline">{xp}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-surface-variant">Total XP</span>
                        </div>
                    </div>
                </section>

                {/* Gamified Badge Showcase */}
                <section className="bg-white p-8 rounded-[2rem] border border-surface-container shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-headline font-bold text-lg text-surface-on">Completed Badges</h3>
                        <Link href="/dashboard" className="text-primary text-xs font-bold hover:underline bg-primary/5 px-2 py-1 rounded-md">View All</Link>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-16 h-16 bg-tertiary/10 border border-tertiary/20 shadow-inner rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-md group-hover:bg-tertiary/20">
                                <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            </div>
                            <span className="text-[10px] font-bold text-center text-surface-on uppercase tracking-wider">Early Bird</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-16 h-16 bg-secondary/10 border border-secondary/20 shadow-inner rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-md group-hover:bg-secondary/20">
                                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                            </div>
                            <span className="text-[10px] font-bold text-center text-surface-on uppercase tracking-wider">Historian</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-16 h-16 bg-primary/10 border border-primary/20 shadow-inner rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-md group-hover:bg-primary/20">
                                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </div>
                            <span className="text-[10px] font-bold text-center text-surface-on uppercase tracking-wider">Verified</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 opacity-40 grayscale group cursor-not-allowed">
                            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-surface-variant text-3xl">lock</span>
                            </div>
                            <span className="text-[10px] font-bold text-center text-surface-variant uppercase tracking-wider mt-1">Locked</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 opacity-40 grayscale group cursor-not-allowed">
                            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-surface-variant text-3xl">lock</span>
                            </div>
                            <span className="text-[10px] font-bold text-center text-surface-variant uppercase tracking-wider mt-1">Locked</span>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2 opacity-40 grayscale group cursor-not-allowed">
                            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-surface-variant text-3xl">lock</span>
                            </div>
                            <span className="text-[10px] font-bold text-center text-surface-variant uppercase tracking-wider mt-1">Locked</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Bento Column Right: Settings & Details */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                
                {/* Preferences / Settings Section */}
                <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-surface-container shadow-sm flex flex-col h-full">
                    <h2 className="font-headline font-black text-2xl mb-8 text-surface-on tracking-tight">Account Settings</h2>
                    
                    <div className="space-y-10 flex-1">
                        
                        {/* Settings Group: Appearance */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-surface-variant border-b border-surface-container/50 pb-3 pl-1">Appearance</h4>
                            <div className="flex items-center justify-between p-4 hover:bg-surface rounded-2xl transition-colors border border-transparent hover:border-surface-container group cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-surface-on group-hover:text-primary transition-colors">dark_mode</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-surface-on">Dark Mode</p>
                                        <p className="text-sm text-surface-variant mt-0.5">Adjust the application visual theme</p>
                                    </div>
                                </div>
                                <div className={`w-14 h-8 rounded-full relative p-1 transition-colors shadow-inner flex items-center ${darkMode ? 'bg-primary' : 'bg-surface-container'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Settings Group: Communications */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-surface-variant border-b border-surface-container/50 pb-3 pl-1">Communications</h4>
                            
                            <div className="flex items-center justify-between p-4 hover:bg-surface rounded-2xl transition-colors border border-transparent hover:border-surface-container group cursor-pointer" onClick={() => setPushNotifs(!pushNotifs)}>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-surface-on group-hover:text-primary transition-colors">notifications_active</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-surface-on">Push Notifications</p>
                                        <p className="text-sm text-surface-variant mt-0.5">Stay updated on daily mission alerts</p>
                                    </div>
                                </div>
                                <div className={`w-14 h-8 rounded-full relative p-1 transition-colors shadow-inner flex items-center ${pushNotifs ? 'bg-primary' : 'bg-surface-container'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${pushNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 hover:bg-surface rounded-2xl transition-colors border border-transparent hover:border-surface-container group cursor-pointer" onClick={() => setEmailDigest(!emailDigest)}>
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <span className="material-symbols-outlined text-surface-on group-hover:text-primary transition-colors">mail</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-surface-on">Email Digest</p>
                                        <p className="text-sm text-surface-variant mt-0.5">Weekly summary of your learning progress</p>
                                    </div>
                                </div>
                                <div className={`w-14 h-8 rounded-full relative p-1 transition-colors shadow-inner flex items-center ${emailDigest ? 'bg-primary' : 'bg-surface-container'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${emailDigest ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Settings Group: Subscription */}
                        <div className="flex flex-col gap-5">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-surface-variant border-b border-surface-container/50 pb-3 pl-1">Plan & Billing</h4>
                            <div className="bg-gradient-to-br from-primary to-primary-dim p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center text-primary-on shadow-premium border border-primary-container/30 relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:opacity-100 opacity-50 transition-opacity"></div>
                                <div className="flex items-center gap-6 relative z-10 mb-6 md:mb-0">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                                        <span className="material-symbols-outlined text-white text-3xl drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-xl font-headline tracking-wide">LearnLoop Plus</p>
                                        <p className="text-sm font-medium mt-1 text-primary-on/80">Next billing on June 12, 2026</p>
                                    </div>
                                </div>
                                <Link href="/subscription" className="w-full md:w-auto text-center bg-white text-primary px-8 py-3.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm z-10">
                                    Manage Plan
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 pt-8 flex flex-col sm:flex-row gap-4 border-t border-surface-container">
                        <Link href="/login" className="flex-1 bg-surface border border-surface-container text-surface-on px-6 py-4 rounded-full font-bold text-center hover:bg-surface-bright active:scale-95 transition-all shadow-sm">
                            End Session
                        </Link>
                        <button className="flex-1 bg-error/10 border border-error/20 text-error px-6 py-4 rounded-full font-bold text-center hover:bg-error/20 active:scale-95 transition-all shadow-sm group flex justify-center items-center gap-2">
                             Delete Account
                        </button>
                    </div>
                </section>
                
            </div>
        </div>
      </main>

      {/* Bottom Navigation Bar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50 rounded-t-[2.5rem]">
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Dash</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">local_library</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Library</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center bg-primary-container text-primary rounded-2xl px-5 py-2 relative -top-3 shadow-sm border border-primary/10">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Profile</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Leader</span>
        </Link>
        <Link href="/missions" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
          <span className="material-symbols-outlined">stars</span>
          <span className="font-headline text-[10px] font-semibold mt-1">Missions</span>
        </Link>
      </nav>

    </div>
  );
}
