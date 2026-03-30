"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";

interface HistoryData {
  level: number;
  xp: number;
  name: string;
}

export default function HistoryProgressPage() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data: user, error } = await supabase
          .from("users")
          .select("level, xp, name")
          .single();

        if (error) throw error;
        setData(user);
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <DashboardHeader title="Academic History" />

        <div className="p-8 lg:p-12 mt-20 max-w-7xl mx-auto w-full space-y-12">
          
          <header className="mb-12">
            <h1 className="text-5xl font-black font-headline text-on-surface tracking-tighter mb-4">The Scholar's Path</h1>
            <p className="text-xl text-on-surface-variant font-medium opacity-80">Chronicle of your evolution through the arena of knowledge.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Progression Chart Section */}
            <section className="md:col-span-8 bg-white border border-surface-container rounded-[3rem] p-10 shadow-premium group">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight">Experience Trajectory</h2>
                  <p className="text-sm text-on-surface-variant font-black uppercase tracking-widest opacity-60">Neural Growth Index</p>
                </div>
                <div className="bg-primary-container/20 px-6 py-2 rounded-full border border-primary/10 shadow-inner">
                  <span className="font-black text-sm text-primary">VITALITY: {(data?.xp || 0).toLocaleString()} XP</span>
                </div>
              </div>
              
              <div className="h-72 flex items-end justify-between gap-3 relative px-4">
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none pb-2">
                  <div className="border-b-2 border-surface-container-highest w-full h-full"></div>
                  <div className="border-b-2 border-surface-container-highest w-full h-full"></div>
                  <div className="border-b-2 border-surface-container-highest w-full h-full"></div>
                </div>
                
                {/* Simulated Data Points */}
                {[40, 55, 45, 70, 85, 60, 50, 90, 98, 42, 68, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-surface-container rounded-t-2xl relative group overflow-hidden" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 w-full bg-primary h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className={`absolute bottom-0 w-full bg-gradient-to-t from-primary/20 to-transparent transition-all duration-700 ${i === 8 ? 'h-full border-t-4 border-primary' : 'h-0'}`}></div>
                    </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6 text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-50 px-2">
                <span>Phase Start</span>
                <span>Active Cycle</span>
                <span>Convergence</span>
              </div>
            </section>

            {/* Vital Metrics Column */}
            <section className="md:col-span-4 space-y-8">
              <div className="bg-gradient-to-br from-secondary to-secondary-dim text-white rounded-[2.5rem] p-8 shadow-premium relative overflow-hidden group">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-4xl mb-6 shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                  <h3 className="text-4xl font-black font-headline mb-1 tracking-tighter">Elite Streak</h3>
                  <p className="text-sm font-black uppercase tracking-widest opacity-80">14 Active Cycles</p>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[160px]">local_fire_department</span>
                </div>
              </div>

              <div className="bg-white border border-surface-container rounded-[2.5rem] p-10 shadow-sm">
                <h3 className="font-black font-headline text-xl mb-8 text-on-surface tracking-tight">Core Indices</h3>
                <div className="space-y-6">
                  {['Quizzes Resolved: 142', 'Accuracy Factor: 92%', 'Focus Duration: 48h'].map((stat) => (
                      <div key={stat} className="p-5 bg-surface rounded-2xl border border-surface-container flex items-center justify-between group hover:border-primary/30 transition-colors">
                        <span className="text-xs font-black uppercase tracking-widest text-on-surface opacity-70 group-hover:opacity-100">{stat.split(':')[0]}</span>
                        <span className="font-black text-primary font-headline tracking-tighter">{stat.split(':')[1]}</span>
                      </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recent Timeline Section */}
            <section className="md:col-span-12 lg:col-span-12 bg-white border border-surface-container rounded-[3rem] p-10 lg:p-14 shadow-sm">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-black font-headline text-on-surface tracking-tight">Timeline of Excellence</h2>
                <div className="flex gap-4">
                  <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline bg-primary/5 px-4 py-2 rounded-full border border-primary/10 transition-colors">Export Logs</button>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Structural Analytics Final', type: 'Advanced Exam', result: '95%', xp: '+250', icon: 'architecture' },
                  { title: 'Sustainable Systems', type: 'Neural Read', result: '85%', xp: '+120', icon: 'menu_book' },
                  { title: 'The Great Synthesis', type: 'Global Challenge', result: 'Rank #4', xp: '+500', icon: 'emoji_events' }
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-8 p-6 rounded-3xl hover:bg-surface border border-transparent hover:border-surface-container transition-all group">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-surface shadow-inner border border-surface-container flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-black font-headline text-xl text-on-surface tracking-tight">{act.title}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{act.type}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-black font-headline text-on-surface bg-surface-container px-4 py-1 rounded-full">{act.result}</span>
                        <span className="text-sm font-black text-primary tracking-widest">{act.xp} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
