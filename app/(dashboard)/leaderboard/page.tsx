"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

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

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredLeaderboard = leaderboard.filter(entry => 
    entry.users?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16 border-b border-surface-container/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center bg-surface-container/50 rounded-full px-4 py-1.5 border border-surface-container/30">
            <span className="material-symbols-outlined text-surface-variant text-sm">search</span>
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search competitors..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 font-medium placeholder:text-surface-variant outline-none" 
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container bg-surface flex justify-center items-center text-primary font-bold shadow-sm">
             A
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 pt-28 px-6 pb-12 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-xl">
                    <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-black rounded-full mb-4 tracking-[0.2em] uppercase">GLOBAL RANKS</span>
                    <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-surface-on mb-4">Elite Hall of Fame</h1>
                    <p className="text-surface-variant font-medium text-lg leading-relaxed">The top learners shaping the future of LearnLoop.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Main Leaderboard Table */}
                <div className="lg:col-span-12">
                   <div className="bg-white rounded-[2rem] overflow-hidden border border-surface-container shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-surface/50 border-b border-surface-container">
                          <tr className="text-[10px] font-black uppercase tracking-widest text-surface-variant">
                            <th className="px-8 py-5">Rank</th>
                            <th className="px-8 py-5">Learner</th>
                            <th className="px-8 py-5">Level</th>
                            <th className="px-8 py-5 text-right">XP Points</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container">
                          {loading ? (
                            Array(5).fill(0).map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                <td colSpan={4} className="h-20 bg-white"></td>
                              </tr>
                            ))
                          ) : filteredLeaderboard.map((entry) => (
                            <tr key={entry.user_id} className="hover:bg-surface/30 transition-colors group">
                              <td className="px-8 py-6">
                                <span className={`text-xl font-black ${entry.rank === 1 ? 'text-tertiary' : entry.rank === 2 ? 'text-primary' : 'text-surface-variant'}`}>
                                  #{entry.rank}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-headline border border-primary/20">
                                    {entry.users?.initials || entry.users?.name?.charAt(0) || 'U'}
                                  </div>
                                  <span className="font-black font-headline text-surface-on">{entry.users?.name || 'Anonymous User'}</span>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                                  Lvl {entry.users?.level || 1}
                                </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <span className="text-lg font-black font-headline text-surface-on">
                                  {entry.xp.toLocaleString()} <span className="text-[10px] text-surface-variant uppercase ml-1">XP</span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
}
