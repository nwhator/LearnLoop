"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

interface LeaderboardEntry {
  user_id: string;
  rank: number;
  xp: number;
  users?: {
    name: string;
    initials: string;
    level: number;
  };
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data, error } = await supabase
          .from("leaderboard")
          .select("*, users(name, initials, level)")
          .order("rank", { ascending: true });

        if (error) throw error;
        setLeaderboard(data as any || []);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <DashboardHeader title="Elite Ranks" />

        <div className="p-8 lg:p-12 mt-20 space-y-12 max-w-7xl mx-auto w-full">
            
            <header className="space-y-4">
                <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-black rounded-full mb-2 tracking-[0.2em] uppercase">Global Rankings</span>
                <h2 className="text-5xl font-black font-headline text-on-surface tracking-tighter">The Hall of Fame</h2>
                <p className="text-on-surface-variant font-medium text-lg max-w-2xl leading-relaxed">Recognizing the most dedicated learners on the platform. Can you climb to the top?</p>
            </header>

            {/* Main Leaderboard Table */}
            <section className="bg-white rounded-[3rem] overflow-hidden border border-surface-container shadow-premium relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-surface/50 border-b border-surface-container text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                                <th className="px-10 py-6">Rank</th>
                                <th className="px-10 py-6">Learner</th>
                                <th className="px-10 py-6">Level</th>
                                <th className="px-10 py-6 text-right">XP Mastery</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="h-24 bg-white"></td>
                                    </tr>
                                ))
                            ) : leaderboard.map((entry) => (
                                <tr key={entry.user_id} className={`hover:bg-surface/30 transition-all duration-300 group ${entry.rank === 1 ? 'bg-tertiary/5' : ''}`}>
                                    <td className="px-10 py-8">
                                        <div className={`text-2xl font-black font-headline ${entry.rank === 1 ? 'text-tertiary' : entry.rank === 2 ? 'text-primary' : 'text-on-surface-variant'}`}>
                                            #{entry.rank}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl font-headline border border-primary/20 shadow-sm transition-transform group-hover:scale-110">
                                                {entry.users?.initials || entry.users?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-black font-headline text-on-surface text-lg tracking-tight">{entry.users?.name || 'Anonymous User'}</p>
                                                <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mt-0.5">Verified Scholar</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="bg-secondary/10 text-secondary border border-secondary/20 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-inner">
                                            Lvl {entry.users?.level || 1}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-xl font-black font-headline text-on-surface tracking-tight">
                                                {entry.xp.toLocaleString()} <span className="text-xs text-primary ml-1 opacity-70">XP</span>
                                            </span>
                                            <div className="w-20 h-1 bg-surface-container rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
