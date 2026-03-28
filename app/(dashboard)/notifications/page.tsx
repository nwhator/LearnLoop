"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function NotificationsPage() {
  const level = useStore((state) => state.level);
  const xp = useStore((state) => state.xp);

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16 border-b border-surface-container/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-surface-variant font-medium hover:text-primary transition-colors px-3 py-1 rounded-md font-headline font-bold">Explore</Link>
            <Link href="/library" className="text-surface-variant font-medium hover:text-primary transition-colors px-3 py-1 rounded-md font-headline font-bold">Courses</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-container rounded-full px-4 py-1.5 shadow-inner">
            <span className="material-symbols-outlined text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="ml-1 font-bold text-surface-on">{xp} XP</span>
          </div>
          <button className="material-symbols-outlined p-2 text-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95 group">
            <span className="group-hover:text-tertiary">workspace_premium</span>
          </button>
          <button className="material-symbols-outlined p-2 text-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95 group">
             <span className="group-hover:text-orange-500">local_fire_department</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container bg-surface flex justify-center items-center text-primary font-bold shadow-sm">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 pt-20 flex-col border-r border-surface-container bg-surface-bright hidden md:flex z-40 pb-6">
        <div className="px-6 mb-8 mt-2">
          <div className="flex flex-col items-center gap-3 p-4 bg-surface rounded-2xl border border-surface-container shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-surface-container shadow-sm flex justify-center items-center text-primary font-bold text-xl">A</div>
            <div className="text-center">
              <p className="font-headline text-sm font-bold text-surface-on">Alex Rivers</p>
              <p className="text-[10px] uppercase tracking-widest text-surface-variant font-bold mt-1">Level {level} Architect</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-grow space-y-1 overflow-y-auto px-2">
            <Link href="/dashboard" className="flex items-center gap-3 text-surface-variant px-4 py-3.5 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
                <span className="material-symbols-outlined">dashboard</span> Dashboard
            </Link>
            <Link href="/library" className="flex items-center gap-3 text-surface-variant px-4 py-3.5 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
                <span className="material-symbols-outlined">local_library</span> Library
            </Link>
            <Link href="/leaderboard" className="flex items-center gap-3 text-surface-variant px-4 py-3.5 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
                <span className="material-symbols-outlined">leaderboard</span> Leaderboard
            </Link>
            <Link href="/missions" className="flex items-center gap-3 text-surface-variant px-4 py-3.5 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
                <span className="material-symbols-outlined">assignment_turned_in</span> Missions
            </Link>
            <Link href="/notifications" className="flex items-center gap-3 bg-primary/10 text-primary border border-primary/20 shadow-sm rounded-full px-4 py-3.5 mx-2 text-sm font-bold mt-1">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span> Notifications
            </Link>
        </nav>
        
        <div className="px-4 mt-auto space-y-2 border-t border-surface-container pt-4">
            <button className="w-full bg-primary text-primary-on font-bold py-3.5 rounded-full shadow-md hover:brightness-110 transition-all active:scale-95 text-sm">
                Start Daily Quiz
            </button>
            <Link href="/settings" className="flex items-center justify-center gap-2 text-surface-variant py-2.5 rounded-full hover:bg-surface-container transition-all text-xs font-semibold">
                <span className="material-symbols-outlined text-[1rem]">settings</span> Settings & Preferences
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-28 px-6 pb-12 min-h-screen">
        <div className="max-w-4xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black font-headline tracking-tight text-surface-on mb-2">Inbox</h1>
                    <p className="text-surface-variant font-medium text-lg">Stay updated with your learning journey and social circle.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-surface-container text-primary font-bold rounded-full hover:bg-surface-bright transition-all active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined text-xl">done_all</span>
                    Mark all as read
                </button>
            </div>

            {/* Categories / Tabs */}
            <div className="flex gap-2 p-1.5 bg-surface-container border border-surface-container-high rounded-[1rem] mb-8 w-fit shadow-inner overflow-x-auto no-scrollbar max-w-full">
                <button className="px-6 py-2.5 bg-white text-primary font-bold rounded-xl shadow-sm tracking-wide text-sm whitespace-nowrap">All</button>
                <button className="px-6 py-2.5 text-surface-variant font-semibold hover:text-surface-on transition-all tracking-wide text-sm whitespace-nowrap">Social</button>
                <button className="px-6 py-2.5 text-surface-variant font-semibold hover:text-surface-on transition-all tracking-wide text-sm whitespace-nowrap">Achievements</button>
                <button className="px-6 py-2.5 text-surface-variant font-semibold hover:text-surface-on transition-all tracking-wide text-sm whitespace-nowrap">System</button>
            </div>

            {/* Notification List */}
            <div className="space-y-4">
                
                {/* Social Category Notification */}
                <div className="group relative bg-white border border-surface-container p-6 rounded-2xl hover:shadow-md hover:border-primary/20 transition-all duration-300">
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                            <span className="material-symbols-outlined text-2xl">group</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-surface-on font-headline">New Friend Challenge!</h3>
                                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md uppercase tracking-wider">Just Now</span>
                            </div>
                            <p className="text-surface-variant mb-5 font-medium">Sarah Jenkins challenged you to a 'Python Basics' duel. The winner gets 500 XP!</p>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-6 py-2.5 bg-primary text-primary-on text-sm font-bold rounded-full hover:brightness-110 shadow-sm active:scale-95 transition-all">Accept Challenge</button>
                                <button className="px-6 py-2.5 bg-surface text-surface-variant border border-surface-container text-sm font-bold rounded-full hover:bg-surface-bright hover:shadow-inner transition-all">Decline</button>
                            </div>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse shadow-[0_0_8px_rgba(0,93,167,0.6)]"></div>
                    </div>
                </div>

                {/* Achievements Category Notification */}
                <div className="group relative bg-white border border-surface-container p-6 rounded-2xl hover:shadow-md hover:border-tertiary/20 transition-all duration-300 border-l-[6px] border-l-tertiary">
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 shadow-inner">
                            <span className="material-symbols-outlined text-3xl drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-surface-on font-headline">Badge Unlocked: Night Owl</h3>
                                <span className="text-[11px] font-bold text-surface-variant uppercase tracking-wider">3h ago</span>
                            </div>
                            <p className="text-surface-variant font-medium">You've completed 5 lessons after 10 PM. You're part of the elite 5%!</p>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-tertiary mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(111,89,0,0.6)]"></div>
                    </div>
                </div>

                {/* Leaderboard Shift Notification */}
                <div className="group relative bg-white border border-surface-container p-6 rounded-2xl hover:shadow-md hover:border-secondary/20 transition-all duration-300">
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-surface-on font-headline">Leaderboard Shift</h3>
                                <span className="text-[11px] font-bold text-surface-variant uppercase tracking-wider">5h ago</span>
                            </div>
                            <p className="text-surface-variant font-medium">Oh no! Marcus D. just overtook you in the Diamond League. Get 200 XP to reclaim your spot!</p>
                        </div>
                    </div>
                </div>

                {/* Streak Achievement Notification */}
                <div className="group relative bg-white border border-surface-container p-6 rounded-2xl hover:shadow-md hover:border-orange-500/20 transition-all duration-300">
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 border border-orange-200 shadow-inner">
                            <span className="material-symbols-outlined text-2xl drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-surface-on font-headline">15-Day Streak!</h3>
                                <span className="text-[11px] font-bold text-surface-variant uppercase tracking-wider">1d ago</span>
                            </div>
                            <p className="text-surface-variant font-medium">Incredible consistency, Alex! Keep it going to reach your monthly goal.</p>
                        </div>
                    </div>
                </div>

                {/* System Category Notification */}
                <div className="group relative bg-white border border-surface-container p-6 rounded-2xl hover:shadow-md transition-all duration-300 opacity-80 hover:opacity-100">
                    <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface flex items-center justify-center text-surface-on border border-surface-container shadow-sm">
                            <span className="material-symbols-outlined text-xl">rocket_launch</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-surface-on font-headline">New Feature: Study Groups</h3>
                                <span className="text-[11px] font-bold text-surface-variant uppercase tracking-wider">Yesterday</span>
                            </div>
                            <p className="text-surface-variant font-medium">You can now create private study groups with your classmates and share resources in real-time.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Empty State / Load More */}
            <div className="mt-12 text-center pb-8 border-t border-surface-container/50 pt-8">
                <button className="text-primary font-bold hover:bg-primary/5 px-6 py-3 rounded-full transition-all text-sm">
                    Load older notifications...
                </button>
            </div>

        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-xl flex justify-around items-center h-16 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-t border-surface-container/50 rounded-t-[2rem]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold font-headline">Home</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center gap-1 text-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">local_library</span>
          <span className="text-[10px] font-bold font-headline">Library</span>
        </Link>
        <Link href="/notifications" className="flex flex-col items-center gap-1 text-primary relative -top-3">
          <span className="material-symbols-outlined bg-primary/10 border border-primary/20 p-2.5 rounded-full shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
          <span className="text-[10px] font-bold font-headline mt-0.5">Inbox</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold font-headline">Profile</span>
        </Link>
      </nav>

    </div>
  );
}
