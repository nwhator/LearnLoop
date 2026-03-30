"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
  const [file, setFile] = useState<File | null>(null);
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
        const supabase = createClient();
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
    if (!content.trim() && !file) return;
    setIsGenerating(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Process AI Generation using Gemini
      const formData = new FormData();
      if (content.trim()) formData.append('source_text', content);
      if (file) formData.append('file', file);

      const apiRes = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!apiRes.ok) {
        const errJson = await apiRes.json();
        throw new Error(errJson.error || 'API request failed');
      }
      
      const aiData = await apiRes.json();

      // 2. Create Study Set row
      const extractTitle = file ? file.name.slice(0, 40) : content.slice(0, 40) + "...";
      const { data: studySetData, error: studySetError } = await supabase
        .from("study_sets")
        .insert([{
          creator_id: user.id,
          title: extractTitle,
          description: "Synthesized by LearnLoop AI.",
          category: "General Intelligence",
          is_public: false
        }])
        .select();

      if (studySetError) throw studySetError;
      const studySetId = studySetData[0].id;

      // 3. Pipe Flashcards into Database
      if (aiData.flashcards && aiData.flashcards.length > 0) {
        const fcPayload = aiData.flashcards.map((f: any) => ({
          study_set_id: studySetId,
          front: f.front,
          back: f.back
        }));
        const { error: fcErr } = await supabase.from("flashcards").insert(fcPayload);
        if (fcErr) console.error("Flashcards insert error:", fcErr);
      }

      // 4. Pipe Quizzes into Database
      if (aiData.quizzes && aiData.quizzes.length > 0) {
        const qzPayload = aiData.quizzes.map((q: any) => ({
          study_set_id: studySetId,
          question: q.question,
          options: q.options,
          correct_answer: q.correctAnswer || q.correct_answer
        }));
        const { error: qzErr } = await supabase.from("quizzes").insert(qzPayload);
        if (qzErr) console.error("Quizzes insert error:", qzErr);
      }
      
      // 5. Navigate to the new set
      router.push(`/results/${studySetId}`);
      
    } catch (e: any) {
      console.error(e);
      alert("Something went wrong generating your content: " + e.message);
    } finally {
      setIsGenerating(false);
      setFile(null);
    }
  };

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col lg:ml-72 min-h-screen">
        <DashboardHeader title="Dashboard" />

        <div className="flex-1 p-6 lg:p-12 mt-20 space-y-12 max-w-7xl mx-auto w-full">
            
            <header className="space-y-2">
                <h2 className="text-4xl font-black font-headline text-on-surface tracking-tight">
                    What do you want to learn today?
                </h2>
                <p className="text-on-surface-variant font-medium text-lg max-w-2xl">Transform your notes, recordings, or links into an interactive gamified learning adventure instantly.</p>
            </header>

            {/* AI Generation Hub */}
            <section className="relative w-full">
                <div className="relative z-10 bg-surface-container-lowest rounded-[2rem] shadow-premium p-8 overflow-hidden">
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                        <ActionButton icon="note_add" label="Paste Notes" color="text-primary" active={!file} />
                        <ActionButton icon="link" label="Paste Link" color="text-secondary" />
                        <label className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${file ? 'bg-tertiary-container text-on-tertiary-container ring-2 ring-tertiary/20' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
                          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]) }} />
                          <span className="material-symbols-outlined text-tertiary">upload_file</span>
                          {file ? file.name.slice(0, 15) + '...' : 'Upload PDF'}
                        </label>
                        <ActionButton icon="mic" label="Record Audio" color="text-error" />
                    </div>
                    
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-48 resize-none rounded-xl bg-surface-container-low p-6 text-lg font-medium text-on-surface placeholder:text-outline border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none mb-8"
                        placeholder="Drop your content here or describe what you want to learn about..."
                    />

                    <div className="flex justify-center">
                        <button 
                            disabled={isGenerating || (!content.trim() && !file)}
                            onClick={handleGenerate}
                            className="flex items-center gap-3 bg-primary text-on-primary px-12 py-5 rounded-full font-headline font-bold text-lg shadow-lg hover:shadow-primary/25 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <span className="material-symbols-outlined animate-spin text-2xl">autorenew</span>
                            ) : (
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            )}
                            {isGenerating ? "Generating..." : "Generate Learning Set"}
                        </button>
                    </div>
                </div>

                {/* Floating Gamification Badge */}
                <div className="absolute -top-12 -right-8 glass-panel border border-white p-4 rounded-2xl shadow-xl hidden lg:block">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <svg className="w-16 h-16 transform -rotate-90">
                                <circle className="text-surface-container-high" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
                                <circle className="text-secondary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175" strokeDashoffset="40" strokeWidth="6"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-on-surface">{stats?.streak_count || 0}</div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Active Streak</p>
                            <div className="flex gap-1 mt-1">
                                {[1,2,3,4].map(i => (
                                    <span key={i} className={`w-2 h-2 rounded-full ${i <= (stats?.streak_count || 0) ? 'bg-tertiary' : 'bg-surface-container-high'}`}></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pick up where you left off */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold font-headline text-on-surface">Pick up where you left off</h2>
                    <Link href="/library" className="text-primary font-bold hover:underline">View Library</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Weak Area */}
                    <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] hover:shadow-premium transition-all cursor-pointer border border-error-container/10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-error-container/10 rounded-2xl">
                                <span className="material-symbols-outlined text-error">trending_down</span>
                            </div>
                            <span className="px-3 py-1 bg-error-container/20 text-on-error-container text-xs font-bold rounded-full">Review Needed</span>
                        </div>
                        <h3 className="font-headline font-bold text-xl mb-2">Molecular Biology 101</h3>
                        <p className="text-on-surface-variant text-sm mb-6">You&apos;re struggling with the &apos;Protein Synthesis&apos; section. 4 new flashcards ready.</p>
                        <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                            <div className="h-full bg-error rounded-full w-[35%]"></div>
                        </div>
                    </div>
                    {/* Card 2: Suggestion */}
                    <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] hover:shadow-premium transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-secondary-container rounded-2xl">
                                <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                            </div>
                            <span className="px-3 py-1 bg-secondary-container/50 text-on-secondary-container text-xs font-bold rounded-full">Suggested</span>
                        </div>
                        <h3 className="font-headline font-bold text-xl mb-2">Intro to Quantum Computing</h3>
                        <p className="text-on-surface-variant text-sm mb-6">Based on your interest in Physics. Explore the foundations of Qubits.</p>
                        <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                            <div className="h-full bg-secondary rounded-full w-0"></div>
                        </div>
                    </div>
                    {/* Card 3: Recent Activity */}
                    <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] hover:shadow-premium transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-primary-container/20 rounded-2xl">
                                <span className="material-symbols-outlined text-primary">history</span>
                            </div>
                            <span className="px-3 py-1 bg-primary-container/30 text-on-primary-container text-xs font-bold rounded-full">In Progress</span>
                        </div>
                        <h3 className="font-headline font-bold text-xl mb-2">Macroeconomics 2024</h3>
                        <p className="text-on-surface-variant text-sm mb-6">85% complete. Finish the quiz to unlock the &apos;Economist&apos; badge!</p>
                        <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                            <div className="h-full bg-primary rounded-full w-[85%]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Highlights */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-headline font-extrabold mb-4">Daily Mission</h2>
                        {mission ? (
                            <>
                                <p className="text-on-surface-variant mb-6 max-w-md">{mission.missions.title}. {mission.current_value}/{mission.missions.target_value} objectives completed.</p>
                                <div className="space-y-3 mb-6">
                                    <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim transition-all" style={{ width: `${(mission.current_value / mission.missions.target_value) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-bold">
                                        {mission.current_value >= mission.missions.target_value ? `Claim +${mission.missions.reward_xp} XP` : 'Start Now'}
                                    </button>
                                    <button className="text-secondary font-bold px-8 py-3 rounded-full hover:bg-secondary/5">Details</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-on-surface-variant mb-6 max-w-md">Complete 3 quiz sets and earn the &quot;Early Bird&quot; limited edition badge. Ends in {resetTime || '...'}</p>
                                <div className="flex gap-4">
                                    <Link href="/missions" className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-bold">Start Now</Link>
                                    <Link href="/missions" className="text-secondary font-bold px-8 py-3 rounded-full hover:bg-secondary/5">Details</Link>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                        <span className="material-symbols-outlined text-[200px] text-secondary/30 absolute -right-10 -bottom-10" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                    </div>
                </div>
                <div className="md:col-span-4 bg-tertiary-container rounded-[2rem] p-8 flex flex-col justify-between">
                    <div>
                        <span className="material-symbols-outlined text-on-tertiary-container text-4xl mb-4">emoji_events</span>
                        <h3 className="text-2xl font-headline font-extrabold text-on-tertiary-container">Weekly Leaderboard</h3>
                    </div>
                    <div>
                        <p className="text-on-tertiary-container font-medium mb-4">You are in the Top 5% this week. Keep going!</p>
                        <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-tertiary-container bg-surface-container-lowest flex items-center justify-center text-xs font-bold">{i}</div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-tertiary-container bg-surface-container-lowest flex items-center justify-center text-xs font-bold">+12</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}

function ActionButton({ icon, label, color, active = false }: { icon: string; label: string; color: string; active?: boolean }) {
  return (
    <button className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${active ? 'bg-surface-container-low hover:bg-surface-container-high' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
      {label}
    </button>
  );
}
