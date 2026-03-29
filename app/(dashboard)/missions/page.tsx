"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

interface Mission {
  id: string;
  title: string;
  description: string;
  reward_xp: number;
  type: "daily" | "weekly" | "achievement";
  target_value: number;
}

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMissions() {
      try {
        const { data, error } = await supabase
          .from("missions")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMissions(data || []);
      } catch (err) {
        console.error("Missions fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMissions();
  }, []);

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <DashboardHeader title="Elite Missions" />

        <div className="p-8 lg:p-12 mt-20 space-y-12 max-w-7xl mx-auto w-full">
            
            <header className="space-y-4">
                <h2 className="text-5xl font-black font-headline text-surface-on tracking-tighter">Daily Operations</h2>
                <p className="text-surface-variant font-medium text-lg max-w-2xl leading-relaxed">Complete synchronized challenges to earn bonus XP and exclusive badges. Operations reset in <span className="text-error font-black">08:42:15</span>.</p>
            </header>

            {/* Event Spotlight */}
            <section className="relative w-full overflow-hidden bg-primary-container rounded-[3rem] p-12 shadow-premium group">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-on/10 to-transparent blur-[120px] rounded-full" />
                <div className="absolute top-0 right-0 w-80 h-full flex items-center justify-center opacity-10 pointer-events-none transform translate-x-12 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-[2000ms]">
                    <span className="material-symbols-outlined text-[250px] text-primary-on" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>

                <div className="relative z-10 space-y-8">
                    <span className="bg-primary/20 text-primary-on border border-primary-on/30 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-sm">
                        Global Event Operation
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-headline text-primary-on tracking-tighter mb-4 max-w-2xl leading-none">
                        The Neural <br /><span className="italic font-serif opacity-70">Architecture</span> Challenge
                    </h2>
                    <p className="text-primary-on/80 max-w-lg font-medium text-lg leading-relaxed">
                        Generate 5 high-accuracy study sets in under 24 hours to earn the restricted <span className="text-white font-black underline underline-offset-4 decoration-white/30 truncate">Synaptic Master</span> badge.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <button className="bg-white text-primary font-black px-12 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest border-2 border-white">
                            Initialize Mission
                        </button>
                    </div>
                </div>
            </section>

            {/* List of active tasks */}
            <section className="space-y-10">
                <h3 className="text-2xl font-black font-headline text-surface-on tracking-tight">Active Assignments</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse"></div>
                        ))
                    ) : missions.length > 0 ? missions.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                    )) : (
                        <div className="col-span-full py-20 bg-white border border-surface-container rounded-[2.5rem] flex flex-col items-center justify-center text-surface-variant font-bold">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-30">check_circle</span>
                            <p className="text-xl font-headline font-black">All Objectives Complete.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}

function MissionCard({ mission, onClaim, onInit }: { mission: Mission, onClaim: () => void, onInit: () => void }) {
  const iconMap: any = { daily: "bolt", weekly: "rocket_launch", achievement: "stars" };
  const colorMap: any = {
    daily: "text-primary bg-primary/10 border-primary/20",
    weekly: "text-secondary bg-secondary/10 border-secondary/20",
    achievement: "text-tertiary bg-tertiary/10 border-tertiary/20",
  };

  const isCompleted = mission.is_completed || (mission.current_value || 0) >= mission.target_value;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-surface-container shadow-sm hover:translate-y-[-4px] transition-all hover:shadow-xl group relative overflow-hidden flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colorMap[mission.type]}`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{iconMap[mission.type]}</span>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner border border-surface-container/50 ${mission.is_claimed ? 'bg-surface text-surface-variant opacity-50' : 'bg-primary/10 text-primary'}`}>
                {mission.is_claimed ? 'Awarded' : `+${mission.reward_xp} XP`}
            </div>
        </div>

        <h4 className="text-2xl font-black font-headline text-surface-on mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-1">{mission.title}</h4>
        <p className="text-surface-variant text-sm font-medium leading-relaxed mb-10 italic opacity-80 line-clamp-2">"{mission.description}"</p>
        
        <div className="mt-auto space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-surface-variant">
                    <span>Progress</span>
                    <span className="text-surface-on">{mission.current_value || 0} / {mission.target_value}</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden shadow-inner border border-surface-container/30">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(((mission.current_value || 0) / mission.target_value) * 100, 100)}%` }}
                      className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-tertiary shadow-[0_0_10px_rgba(var(--tertiary),0.4)]' : 'bg-primary'}`}
                    />
                </div>
            </div>

            {mission.is_claimed ? (
              <div className="w-full py-4 rounded-2xl bg-surface text-surface-variant text-[10px] font-black uppercase tracking-widest text-center border border-dashed border-surface-container">
                Mission Finalized
              </div>
            ) : isCompleted ? (
              <button onClick={onClaim} className="w-full py-4 rounded-2xl bg-tertiary text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-tertiary/20 transition-all">
                  Claim Reward
              </button>
            ) : (
              <button 
                onClick={onInit} 
                className="w-full py-4 rounded-2xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all border border-primary/10"
                disabled={!!mission.user_mission_id}
              >
                  {mission.user_mission_id ? "Operation Active" : "Initialize Task"}
              </button>
            )}
        </div>
    </div>
  );
}
