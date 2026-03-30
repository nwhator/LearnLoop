"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";

// The full-screen overlay component used while generating
function GeneratingOverlay({ onCancel }: { onCancel: () => void }) {
  const [level, setLevel] = useState(1);
  
  useEffect(() => {
    // Optionally fetch level from localstorage or keep it static for the overlay
    setLevel(1);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-surface text-on-surface flex flex-col">
      {/* TopNavBar */}
      <nav className="w-full bg-white/80 backdrop-blur-xl shadow-sm flex items-center px-6 h-16 shrink-0 z-50 relative">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tight">LearnLoop</Link>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-lg bg-white border border-surface-container rounded-3xl p-10 flex flex-col items-center text-center shadow-premium relative z-10">
            <div className="w-full aspect-square relative mb-8 flex items-center justify-center max-h-[200px]">
                <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse transition-transform duration-500"></div>
                <div className="relative">
                    <span className="material-symbols-outlined text-primary text-7xl animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-on-surface mb-3 font-headline">Cooking New Content</h3>
            <p className="text-on-surface-variant text-base leading-relaxed mb-10">
                Our AI architectures are currently drafting your personalized notes, quizzes, and flashcards. This usually takes less than a minute.
            </p>
            
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-sm shadow-inner">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                    Processing Neural Weights
                </div>
            </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      </main>
    </div>
  );
}

interface DashboardStats {
  name: string;
  level: number;
  xp: number;
  streak_count: number;
  daily_credits: number;
  subscription_tier: string;
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
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [mission, setMission] = useState<MissionProgress | null>(null);
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [recentSet, setRecentSet] = useState<any>(null);
  const [suggestedSet, setSuggestedSet] = useState<any>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
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

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("name, level, xp, streak_count, daily_credits, subscription_tier")
          .eq("id", user.id)
          .single();

        if (userError) throw userError;

        const { data: missionData } = await supabase
          .from("user_missions")
          .select("current_value, is_completed, missions(title, target_value, reward_xp)")
          .eq("user_id", user.id)
          .eq("is_completed", false)
          .limit(1)
          .single();

        // Fetch the latest AI Diagnostic
        const { data: diagData } = await supabase
          .from("user_diagnostics")
          .select("ai_feedback, question_text, study_sets(title)")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        // Fetch the most recent study set (In Progress)
        const { data: recentData } = await supabase
          .from("study_sets")
          .select("id, title, description, updated_at")
          .eq("creator_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        // Fetch a suggested set (different subject or older set)
        const { data: suggestionData } = await supabase
          .from("study_sets")
          .select("id, title, category")
          .eq("creator_id", user.id)
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();

        // Fetch user's leaderboard rank
        const { data: rankData } = await supabase
          .from("leaderboard")
          .select("rank")
          .eq("user_id", user.id)
          .maybeSingle();

        const { count } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true });

        const fallbackName = user.user_metadata?.full_name || user.email?.split('@')[0] || "Scholar";

        setStats({
            ...(userData as any),
            name: userData?.name || fallbackName
        } as DashboardStats);

        if (missionData) setMission(missionData as any);
        if (diagData) setDiagnostic(diagData);
        if (recentData) setRecentSet(recentData);
        if (rankData) setUserRank(rankData.rank);
        if (count) setTotalUsers(count);
        
        if (suggestionData && (!recentData || suggestionData.id !== recentData.id)) {
            setSuggestedSet(suggestionData);
        } else {
             setSuggestedSet({ title: "Expand your mind", category: "New Discovery" });
        }
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

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const formData = new FormData();
      if (content.trim()) formData.append('source_text', content);
      if (file) formData.append('file', file);

      const apiRes = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData,
      });

      if (!apiRes.ok) {
        const errJson = await apiRes.json();
        if (apiRes.status === 403) {
           alert("You have exhausted your daily limit! Upgrade to Premium.");
           router.push("/premium");
           return;
        }
        const err = new Error(errJson.error || 'API request failed');
        (err as any).details = errJson.details;
        throw err;
      }

      const aiData = await apiRes.json();

      let extractTitle = "Generated Study Set";
      if (file) {
          extractTitle = file.name.slice(0, 40);
      } else if (isLinkMode) {
          extractTitle = "Website Extraction";
      } else if (content) {
          extractTitle = content.slice(0, 40) + "...";
      }

      const { data: studySetData, error: studySetError } = await supabase
        .from("study_sets")
        .insert([{
          creator_id: user.id,
          title: extractTitle,
          description: "Created dynamically by LearnLoop AI.",
          category: "General Intelligence",
          summary_notes: aiData.summary_notes || [],
          is_public: false
        }])
        .select();

      if (studySetError) throw studySetError;
      const studySetId = studySetData[0].id;

      if (aiData.flashcards && aiData.flashcards.length > 0) {
        const fcPayload = aiData.flashcards.map((f: any) => ({
          study_set_id: studySetId,
          front: f.front,
          back: f.back
        }));
        await supabase.from("flashcards").insert(fcPayload);
      }

      if (aiData.quizzes && aiData.quizzes.length > 0) {
        const qzPayload = aiData.quizzes.map((q: any) => ({
          study_set_id: studySetId,
          question: q.question,
          options: q.options,
          correct_answer: q.correctAnswer || q.correct_answer
        }));
        await supabase.from("quizzes").insert(qzPayload);
      }

      // Automatically push user to the newly generated studio dashboard results
      router.push(`/results/${studySetId}`);

    } catch (e: any) {
      console.error(e);
      // Try to parse more detailed error if provided
      const errorMessage = e.details ? `${e.message} (${e.details})` : e.message;
      alert("Something went wrong generating your content: " + errorMessage);
      setIsGenerating(false);
      setFile(null);
    }
  };

  if (isGenerating) {
      return <GeneratingOverlay onCancel={() => setIsGenerating(false)} />;
  }

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col lg:ml-72 min-h-screen pt-20">
        <DashboardHeader title="Dashboard" />

        <div className="flex-1 p-6 lg:p-12 space-y-12 max-w-7xl mx-auto w-full">

          <header className="space-y-2">
            <h2 className="text-4xl font-black font-headline text-on-surface tracking-tight">
              Welcome back, {stats?.name ? stats.name.split(' ')[0] : 'Scholar'}!
            </h2>
            <p className="text-primary font-bold text-lg mt-2 font-headline tracking-tighter">What do you want to learn today?</p>
            <p className="text-on-surface-variant font-medium text-lg max-w-2xl mt-1">Transform your notes, recordings, or links into an interactive gamified learning adventure instantly.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* AI Generation Hub */}
            <div className="lg:col-span-8 relative z-10 bg-surface-container-lowest rounded-[3rem] shadow-premium p-8 lg:p-10 border border-surface-container/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
              
              <div className="flex justify-between items-center mb-8 border-b border-surface-container pb-6">
                  <div className="text-sm font-bold text-on-surface-variant">
                    {stats?.subscription_tier === 'scholar_plus' ? (
                       <span className="flex items-center gap-2 text-primary font-black"><span className="material-symbols-outlined text-sm">workspace_premium</span> Unlimited Generation</span>
                    ) : (
                       <span className="flex items-center gap-2">Daily Limits: <span className="text-secondary font-black">{stats?.daily_credits || 0} / 3</span></span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                    Gemini 1.5 Flash Active
                  </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setIsLinkMode(false)} className={`flex items-center justify-center gap-3 py-3 px-6 rounded-2xl text-sm font-black cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all ${!isLinkMode && !file ? 'bg-primary-container text-on-primary-container ring-2 ring-primary/40 shadow-primary/20' : 'bg-surface-container-low hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20'}`}>
                  <span className="material-symbols-outlined text-xl">note_add</span>
                  Paste Notes
                </button>
                <button onClick={() => { setIsLinkMode(true); setFile(null); }} className={`flex items-center justify-center gap-3 py-3 px-6 rounded-2xl text-sm font-black cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all ${isLinkMode && !file ? 'bg-secondary-container text-on-secondary-container ring-2 ring-secondary/40 shadow-secondary/20' : 'bg-surface-container-low hover:bg-secondary/10 hover:text-secondary border border-transparent hover:border-secondary/20'}`}>
                  <span className="material-symbols-outlined text-xl">link</span>
                  Paste Link
                </button>
                <label className={`flex items-center justify-center gap-3 py-3 px-6 rounded-2xl text-sm font-black cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all ${file && file.type.startsWith('application/pdf') ? 'bg-tertiary-container text-on-tertiary-container ring-2 ring-tertiary/40 shadow-tertiary/20' : 'bg-surface-container-low hover:bg-tertiary/10 hover:text-tertiary border border-transparent hover:border-tertiary/20'}`}>
                  <input type="file" accept="application/pdf" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]) }} />
                  <span className="material-symbols-outlined text-xl">upload_file</span>
                  {file && file.type.startsWith('application/pdf') ? file.name.slice(0, 15) + '...' : 'Upload PDF'}
                </label>
              </div>

              {isLinkMode ? (
                  <input
                    type="url"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full rounded-2xl bg-surface-container-low p-6 text-base lg:text-lg font-bold text-on-surface placeholder:text-outline border border-surface-container focus:ring-2 focus:ring-secondary/20 transition-all outline-none mb-8"
                    placeholder="Paste an article or webpage URL here... (e.g. https://en.wikipedia.org/wiki/Neural_network)"
                  />
              ) : (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-32 lg:h-48 resize-none rounded-2xl bg-surface-container-low p-6 text-base lg:text-lg font-bold text-on-surface placeholder:text-outline border border-surface-container focus:ring-2 focus:ring-primary/20 transition-all outline-none mb-8"
                    placeholder={file ? `Attached Document: ${file.name}. You can add supplementary text instructions here...` : "Drop your content here or describe what you want to learn about..."}
                  />
              )}

              <div className="flex justify-center">
                <button
                  disabled={!content.trim() && !file}
                  onClick={handleGenerate}
                  className="flex items-center gap-3 bg-primary text-on-primary px-12 py-5 rounded-full font-headline font-black text-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:brightness-110 hover:-translate-y-1 active:scale-95 active:brightness-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:brightness-100"
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  Initialize Quest
                </button>
              </div>
            </div>

            {/* Streak & Level Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest p-8 rounded-[3rem] border border-surface-container/10 shadow-premium relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle className="text-surface-container-high" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                      <circle className="text-tertiary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * ((stats?.streak_count || 0) % 7) / 7)} strokeWidth="8" strokeLinecap="round"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black font-headline text-on-surface">{stats?.streak_count || 0}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 leading-none">Days</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black font-headline text-on-surface mb-2">Active Streak</h3>
                  <p className="text-on-surface-variant text-sm font-medium mb-6">You&apos;re crushing it! Don&apos;t let the flame go out.</p>
                  
                  <div className="flex justify-center gap-2">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < (stats?.streak_count || 0) % 7 ? 'bg-tertiary scale-110 shadow-lg shadow-tertiary/20' : 'bg-surface-container-high opacity-50'}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 p-8 rounded-[3rem] border border-secondary/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-70 mb-1">Current Level</p>
                  <p className="text-3xl font-black font-headline text-on-surface">Lv. {stats?.level || 1}</p>
                </div>
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-secondary/20">
                  <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pick up where you left off */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-headline text-on-surface">Pick up where you left off</h2>
              <Link href="/library" className="text-primary font-bold hover:underline">View Library</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Weak Area / Dynamic Diagnostic */}
              <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] hover:shadow-premium transition-all cursor-pointer border border-error-container/10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-error-container/10 rounded-2xl">
                    <span className="material-symbols-outlined text-error">trending_down</span>
                  </div>
                  <span className="px-3 py-1 bg-error-container/20 text-on-error-container text-xs font-bold rounded-full">AI Review</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-2">{diagnostic ? (diagnostic.study_sets?.title || "Academic Insight") : "Concept Clarity"}</h3>
                <p className="text-on-surface-variant text-sm mb-6">
                  {diagnostic ? diagnostic.ai_feedback : "Your recent quiz performance is flawless. No specific conceptual gaps detected yet."}
                </p>
                <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                  <div className={`h-full bg-error rounded-full ${diagnostic ? 'w-[75%]' : 'w-0'}`}></div>
                </div>
              </div>
              {/* Card 2: Suggestion */}
              <div 
                onClick={() => suggestedSet?.id && router.push(`/results/${suggestedSet.id}`)}
                className="bg-surface-container-lowest p-6 rounded-[1.5rem] hover:shadow-premium transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-secondary-container rounded-2xl group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  </div>
                  <span className="px-3 py-1 bg-secondary-container/50 text-on-secondary-container text-xs font-bold rounded-full">Suggested</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-2">{suggestedSet?.title || "Ready to explore?"}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{suggestedSet?.category ? `Explore more in ${suggestedSet.category}.` : "Upload your first source to see AI-powered study suggestions here."}</p>
                <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                  <div className={`h-full bg-secondary rounded-full ${suggestedSet?.id ? 'w-[20%]' : 'w-0'}`}></div>
                </div>
              </div>
              {/* Card 3: Recent Activity (In Progress) */}
              <div 
                onClick={() => recentSet?.id && router.push(`/results/${recentSet.id}`)}
                className="bg-surface-container-lowest p-6 rounded-[1.5rem] hover:shadow-premium transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary-container/20 rounded-2xl group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined">history</span>
                  </div>
                  <span className="px-3 py-1 bg-primary-container/30 text-on-primary-container text-xs font-bold rounded-full">In Progress</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-2">{recentSet?.title || "No recent activity"}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{recentSet ? "Resume where you left off. Continue mastering this set." : "Your learning journey begins once you generate your first set."}</p>
                <div className="w-full h-1.5 bg-surface-container-low rounded-full">
                  <div className={`h-full bg-primary rounded-full ${recentSet ? 'w-[45%]' : 'w-0'}`}></div>
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
            <div 
              onClick={() => router.push('/leaderboard')}
              className="md:col-span-4 bg-tertiary-container rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-premium transition-all cursor-pointer group"
            >
              <div>
                <span className="material-symbols-outlined text-on-tertiary-container text-4xl mb-4 group-hover:scale-110 transition-transform">emoji_events</span>
                <h3 className="text-2xl font-headline font-extrabold text-on-tertiary-container">Weekly Leaderboard</h3>
              </div>
              <div>
                <p className="text-on-tertiary-container font-medium mb-4">
                  {userRank ? `You are ranked #${userRank} out of ${totalUsers} scholars.` : `Start studying to climb the hall of fame!`}
                </p>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-tertiary-container bg-surface-container-lowest flex items-center justify-center text-xs font-black">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  {totalUsers > 3 && (
                    <div className="w-10 h-10 rounded-full border-2 border-tertiary-container bg-surface-container-lowest flex items-center justify-center text-[10px] font-black">+{totalUsers - 3}</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
