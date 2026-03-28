"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface StudySet {
  id: string;
  title: string;
  description: string;
  category: string;
  creator_id: string;
  created_at: string;
  is_public: boolean;
}

interface LeaderboardUser {
  user_id: string;
  rank: number;
  xp: number;
  users?: {
    name: string;
    initials: string;
  };
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [studySets, setStudySets] = useState<StudySet[]>([]);
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch public study sets
        const { data: setsData } = await supabase
          .from("study_sets")
          .select("*")
          .eq("is_public", true)
          .limit(6);
          
        // Fetch leaderboard with user names (joining)
        const { data: leaderData } = await supabase
          .from("leaderboard")
          .select("*, users(name, initials)")
          .order("rank", { ascending: true })
          .limit(5);

        setStudySets(setsData || []);
        setTopUsers(leaderData as any || []);
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredSets = studySets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-surface text-surface-on min-h-screen antialiased">
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-surface-container shadow-sm h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tighter">LearnLoop</Link>
            <div className="hidden md:flex gap-8 items-center font-headline font-bold text-sm tracking-wide">
              <Link href="/dashboard" className="text-surface-variant hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/community" className="text-primary border-b-2 border-primary pb-1">Community</Link>
              <Link href="/support" className="text-surface-variant hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="w-10 h-10 rounded-full border border-surface-container bg-white flex items-center justify-center text-surface-variant hover:text-primary transition-colors shadow-sm outline-none">
              <span className="material-symbols-outlined text-lg">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface flex justify-center items-center text-primary font-bold shadow-sm font-headline">A</div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <header className="relative overflow-hidden rounded-[3rem] bg-primary px-8 md:px-16 py-16 text-white shadow-premium">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tighter leading-none mb-6">The Intellectual Hub.</h1>
                    <p className="text-xl opacity-90 font-medium leading-relaxed max-w-xl">Find the best study materials, join challenges, and learn with AI.</p>
                </div>
                
                <div className="w-full lg:w-auto">
                    <div className="bg-white rounded-[2rem] p-3 flex flex-col sm:flex-row items-center shadow-2xl min-w-[300px] lg:min-w-[500px] border border-white/20 backdrop-blur-md">
                        <div className="flex items-center flex-grow w-full px-4 mb-3 sm:mb-0">
                            <span className="material-symbols-outlined text-surface-variant mr-3">search</span>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Quantum physics, History, or Biology..." 
                                className="bg-transparent border-none focus:ring-0 w-full text-surface-on font-bold py-3 outline-none placeholder:text-surface-variant" 
                            />
                        </div>
                        <button className="w-full sm:w-auto bg-secondary text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all outline-none">Explore</button>
                    </div>
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Study Sets Feed */}
            <section className="lg:col-span-8 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <h2 className="text-3xl font-black font-headline tracking-tighter text-surface-on flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-2xl border border-primary/20" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                        Popular Study Sets
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {loading ? (
                      Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse"></div>
                      ))
                    ) : filteredSets.length > 0 ? filteredSets.map((set) => (
                        <div key={set.id} className="group bg-white rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-surface-container flex flex-col h-full">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em]">{set.category || 'General'}</div>
                            </div>
                            <h3 className="text-2xl font-black font-headline mb-3 text-surface-on leading-tight group-hover:text-primary transition-colors">{set.title}</h3>
                            <p className="text-surface-variant text-sm font-medium leading-relaxed mb-8 line-clamp-2">{set.description}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-container">
                                <span className="text-[10px] text-surface-variant font-black uppercase tracking-widest">Added {new Date(set.created_at).toLocaleDateString()}</span>
                                <Link href={`/sets/${set.id}`} className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group/btn">
                                    View Set <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    )) : (
                      <div className="col-span-full py-16 text-center text-surface-variant font-bold">No sets found matching your search.</div>
                    )}
                </div>
            </section>

            {/* Sidebar: Leaderboard */}
            <aside className="lg:col-span-4 space-y-10">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-surface-container hover:shadow-md transition-shadow">
                    <h2 className="text-2xl font-black font-headline tracking-tighter flex items-center gap-3 text-surface-on mb-8">
                        <span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-2.5 rounded-2xl border border-tertiary/20" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
                        Hall of Fame
                    </h2>
                    
                    <div className="space-y-4">
                        {loading ? (
                          Array(3).fill(0).map((_, i) => <div key={i} className="h-20 bg-surface rounded-3xl animate-pulse"></div>)
                        ) : topUsers.map((rankUser) => (
                            <div key={rankUser.user_id} className={`flex items-center gap-5 p-4 rounded-3xl transition-all border ${rankUser.rank === 1 ? 'bg-tertiary/5 border-tertiary/20' : 'bg-surface border-transparent hover:border-surface-container hover:bg-white'}`}>
                                <div className={`text-xl font-black w-6 text-center ${rankUser.rank === 1 ? 'text-tertiary' : 'text-surface-variant'}`}>{rankUser.rank}</div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg font-headline shadow-inner bg-primary/20 text-primary`}>
                                  {rankUser.users?.initials || rankUser.users?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-black font-headline text-surface-on tracking-tight">{rankUser.users?.name || 'Anonymous'}</p>
                                    <p className="text-[10px] text-surface-variant font-black uppercase tracking-widest mt-0.5">{rankUser.xp.toLocaleString()} XP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
      </main>
    </div>
  );
}
