"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";

interface StudySet {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  creator_id: string | null;
  created_at: string | null;
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
        const { data: setsData } = await supabase
          .from("study_sets")
          .select("*")
          .eq("is_public", true)
          .limit(6);
          
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

  const filteredSets = studySets.filter((s: StudySet) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <DashboardHeader title="Community Plaza" />

        <div className="p-8 lg:p-12 mt-20 space-y-12 max-w-7xl mx-auto w-full">
            
            {/* Hero Section */}
            <header className="relative overflow-hidden rounded-[3rem] bg-primary px-8 md:px-16 py-16 text-white shadow-premium">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-xl space-y-6">
                        <h1 className="text-5xl font-black font-headline tracking-tighter leading-tight mb-6">The Global Intellectual Hub.</h1>
                        <p className="text-xl opacity-90 font-medium leading-relaxed">Discover study sets, join challenges, and expand your horizons with the community.</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Study Sets Feed */}
                <section className="lg:col-span-8 space-y-10">
                    <h2 className="text-3xl font-black font-headline tracking-tighter text-on-surface flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-2xl border border-primary/20" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                        Shared Mastery Sets
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading ? (
                          Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse"></div>
                          ))
                        ) : filteredSets.length > 0 ? filteredSets.map((set) => (
                            <div key={set.id} className="group bg-white rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-surface-container flex flex-col h-full shadow-sm">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em]">{set.category || 'General'}</div>
                                </div>
                                <h3 className="text-2xl font-black font-headline mb-3 text-on-surface leading-tight group-hover:text-primary transition-colors">{set.title}</h3>
                                <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-8 line-clamp-2 italic opacity-80">"{set.description}"</p>
                                
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-container">
                                    <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Added {set.created_at ? new Date(set.created_at).toLocaleDateString() : 'N/A'}</span>
                                    <Link href={`/sets/${set.id}`} className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group/btn">
                                        View Set <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        )) : (
                          <div className="col-span-full py-20 bg-white border border-dashed border-surface-container rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">search_off</span>
                              <p className="text-lg font-black font-headline text-on-surface">No sets discovered in this sector.</p>
                          </div>
                        )}
                    </div>
                </section>

                {/* Sidebar: Leaderboard */}
                <aside className="lg:col-span-4 space-y-10">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-surface-container hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 material-symbols-outlined text-[120px] text-tertiary/5 rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</div>
                        <h2 className="text-2xl font-black font-headline tracking-tighter flex items-center gap-3 text-on-surface mb-8 relative z-10">
                            Hall of Fame
                        </h2>
                        
                        <div className="space-y-4 relative z-10">
                            {loading ? (
                              Array(3).fill(0).map((_, i) => <div key={i} className="h-20 bg-surface rounded-3xl animate-pulse shadow-inner"></div>)
                            ) : topUsers.map((rankUser) => (
                                <div key={rankUser.user_id} className={`flex items-center gap-5 p-4 rounded-3xl transition-all border ${rankUser.rank === 1 ? 'bg-tertiary/5 border-tertiary/20' : 'bg-surface border-transparent hover:border-surface-container hover:bg-white'}`}>
                                    <div className={`text-xl font-black w-6 text-center ${rankUser.rank === 1 ? 'text-tertiary' : 'text-on-surface-variant'}`}>{rankUser.rank}</div>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg font-headline shadow-inner bg-primary/20 text-primary`}>
                                      {rankUser.users?.initials || rankUser.users?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-black font-headline text-on-surface tracking-tight truncate max-w-[120px]">{rankUser.users?.name || 'Anonymous'}</p>
                                        <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mt-0.5">{rankUser.xp.toLocaleString()} XP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
      </main>
    </div>
  );
}
