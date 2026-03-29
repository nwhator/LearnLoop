"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/types/supabase";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardStats {
  name: string;
  level: number;
  xp: number;
  streak_count: number;
}

interface MissionProgress {
  current_value: number;
  is_completed: boolean;
  missions: {
    title: string;
    target_value: number;
    reward_xp: number;
  };
}

export default function DashboardPage() {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [mission, setMission] = useState<MissionProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetTime, setResetTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch User and Stats directly from users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("name, level, xp, streak_count")
          .eq("id", user.id)
          .single();

        if (userError) throw userError;

        // Fetch the most recent active user mission
        const { data: missionData } = await supabase
          .from("user_missions")
          .select("current_value, is_completed, missions(title, target_value, reward_xp)")
          .eq("user_id", user.id)
          .eq("is_completed", false)
          .limit(1)
          .single();

        setStats(userData as DashboardStats);
        if (missionData) setMission(missionData as any);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();

    const interval = setInterval(() => {
        const now = new Date();
        const next = new Date();
        next.setUTCHours(24, 0, 0, 0);
        const diff = next.getTime() - now.getTime();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setResetTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Create Study Set row
      const insertPayload: Database['public']['Tables']['study_sets']['Insert'][] = [
        {
          creator_id: user.id,
          title: content.slice(0, 40) + "...",
          description: "Synthesized by LearnLoop AI Architecture.",
          category: "General Intelligence",
          is_public: false
        }
      ];
      const { data, error } = await supabase
        .from("study_sets")
        .insert(insertPayload)
        .select();

      if (error) throw error;

      // 2. Simulate AI Processing
      await new Promise(r => setTimeout(r, 2000));
      
      // 3. Navigate to the new set
      if (data && data.length > 0) {
        router.push(`/library?search=${data[0].id}`);
      } else {
        throw new Error("Study set creation failed");
      }
    } catch (e) {
      console.error(e);
      alert("Synthesis sequence interrupted.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col lg:ml-72 min-h-screen">
        <DashboardHeader title="Neural Dashboard" />

        <div className="flex-1 p-8 lg:p-12 mt-20 space-y-12 max-w-7xl mx-auto w-full">
            
            <header className="space-y-2">
                <h2 className="text-4xl font-black font-headline text-surface-on tracking-tight">
                    Greetings, {stats?.name?.split(' ')[0] || 'Scholar'}.
                </h2>
                <p className="text-surface-variant font-medium text-lg">Ready to engage the loop today?</p>
            </header>

            {/* AI Generation Hub */}
            <section className="relative w-full">
                <div className="relative z-10 p-10 bg-white rounded-[2.5rem] shadow-premium border border-surface-container overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                        <ActionButton icon="note_add" label="Note Synthesis" color="text-primary" active />
                        <ActionButton icon="link" label="Web Context" color="text-secondary" />
                        <ActionButton icon="description" label="PDF Ingestion" color="text-tertiary" />
                    </div>
                    
                    <div className="relative">
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-48 resize-none rounded-3xl bg-surface p-6 text-lg font-medium text-surface-on/80 placeholder:text-surface-variant border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                            placeholder="Input your text or research notes here. The LearnLoop AI will decompose and restructure it into a high-performance Mastery Set..."
                        />
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/50 backdrop-blur rounded-full text-[10px] font-black uppercase text-surface-variant border border-surface-container">
                            <span className="material-symbols-outlined text-sm">auto_awesome</span> Neural Engine Active
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button 
                            disabled={isGenerating || !content.trim()}
                            onClick={handleGenerate}
                            className="flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <span className="material-symbols-outlined animate-spin text-2xl">autorenew</span>
                            ) : (
                                <span className="material-symbols-outlined text-2xl">psychology</span>
                            )}
                            {isGenerating ? "Synthesizing..." : "Initiate Synthesis"}
                        </button>
                    </div>
                </div>

                {/* Decorative background gradients */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-secondary/20 transition-all duration-1000" />
            </section>

            {/* Contextual Bento Widgets */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weak Area Insights (Dynamic eventually, but currently based on placeholder mastery logic) */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-surface-container shadow-sm hover:translate-y-[-4px] transition-all cursor-pointer group">
                    <div className="flex items-center gap-5 mb-6">
                        <div className="p-4 bg-error/10 text-error rounded-2xl group-hover:bg-error group-hover:text-white transition-colors duration-500">
                            <span className="material-symbols-outlined text-3xl">trending_down</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black font-headline text-surface-on">Weak Point Detected</h3>
                            <p className="text-surface-variant font-bold text-sm uppercase tracking-widest mt-1">Foundational Logic • Mastery: 38%</p>
                        </div>
                    </div>
                    <p className="text-surface-variant font-medium leading-relaxed mb-8">System analysis suggests immediate revision of **Propositional Calculus**. We detected gaps in your last session.</p>
                    <button className="text-error font-black uppercase tracking-widest text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
                        Initiate Recovery <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>

                {/* Daily Mission Spotlight (Now dynamic) */}
                <div className="bg-gradient-to-br from-tertiary to-orange-700 p-8 rounded-[2.5rem] border border-tertiary/20 shadow-premium group relative overflow-hidden">
                    <div className="relative z-10 text-white">
                        <h3 className="text-2xl font-black font-headline flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span> Current Mission
                        </h3>
                        {mission ? (
                          <>
                            <p className="text-white/80 font-bold text-sm mb-6 uppercase tracking-widest">{mission.missions.title}</p>
                            
                            <div className="space-y-3 mb-6">
                                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(mission.current_value / mission.missions.target_value) * 100}%` }}
                                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                                    />
                                </div>
                                <p className="text-right text-xs font-black uppercase tracking-widest">{mission.current_value} / {mission.missions.target_value} Objectives</p>
                            </div>
                            
                            <button className="bg-white text-tertiary px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                                {mission.current_value >= mission.missions.target_value ? `Claim +${mission.missions.reward_xp} XP` : 'Keep Grinding'}
                            </button>
                          </>
                        ) : (
                          <div className="py-6">
                            <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-4">No active missions found.</p>
                            <Link href="/missions" className="bg-white/20 text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-white/30 transition-all">Explore Operations</Link>
                          </div>
                        )}
                    </div>
                    <span className="absolute -right-10 -bottom-10 material-symbols-outlined text-[200px] text-white/10 group-hover:rotate-12 transition-transform duration-1000" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}

function ActionButton({ icon, label, color, active = false }: { icon: string, label: string, color: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all border ${active ? 'bg-surface border-surface-container shadow-inner' : 'bg-white border-transparent hover:border-surface-container/50 hover:bg-surface'}`}>
      <span className={`material-symbols-outlined text-xl ${color}`}>{icon}</span>
      {label}
    </button>
  );
}
