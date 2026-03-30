"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Flashcard, { FlashcardData } from "@/components/ui/Flashcard";
import { createClient } from "@/lib/supabase/client";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

interface QuizData {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();

  const xp = useStore((state) => state.xp);
  const incrementXP = useStore((state) => state.incrementXP);

  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [summaryNotes, setSummaryNotes] = useState<string[]>([]);
  const [studyTitle, setStudyTitle] = useState("Generated Suite");
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [quizMastery, setQuizMastery] = useState<Set<string>>(new Set());

  // Fetch data dynamically
  useEffect(() => {
    async function fetchCardsAndQuizzes() {
      if (!params.id) return;
      try {
        setLoading(true);
        const supabase = createClient();

        const [fcRes, qzRes, setRes] = await Promise.all([
          supabase.from("flashcards").select("*").eq("study_set_id", params.id as string),
          supabase.from("quizzes").select("*").eq("study_set_id", params.id as string),
          supabase.from("study_sets").select("*").eq("id", params.id as string).single()
        ]);

        if (fcRes.error) throw fcRes.error;
        if (fcRes.data) setFlashcards(fcRes.data);

        if (setRes.data) {
          setStudyTitle(setRes.data.title);
          const rawNotes = setRes.data.summary_notes;
          if (rawNotes && Array.isArray(rawNotes)) {
            setSummaryNotes(rawNotes as string[]);
          } else if (typeof rawNotes === 'string') {
            try { setSummaryNotes(JSON.parse(rawNotes)); } catch (e) { }
          }
        }

        if (qzRes.data) {
          // Normalize JSONb options array
          const rawQuizzes = qzRes.data.map((q: any) => ({
            ...q,
            options: Array.isArray(q.options) ? q.options : JSON.parse(q.options || "[]")
          }));
          setQuizzes(rawQuizzes);
        }

      } catch (err) {
        console.error("Failed to load study material:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCardsAndQuizzes();
  }, [params.id]);

  const handleApplyXP = async (amount: number) => {
    incrementXP(amount); // Update visual Zustand state instantly
    try {
      const supabase = createClient();
      await supabase.rpc('increment_user_xp', { xp_amount: amount });
    } catch (err) {
      console.error("Failed to commit XP to database", err);
    }
  };

  const handleMastered = (id: string) => {
    if (!masteredIds.has(id)) {
      setMasteredIds((prev) => new Set(prev).add(id));
      handleApplyXP(50);
    }
  };

  const handleQuizSelect = (option: string) => {
    if (quizStatus === "correct") return; // Prevent changing after correct

    setSelectedOption(option);
    const activeQuiz = quizzes[currentQuizIndex];
    if (!activeQuiz) return;

    if (option === activeQuiz.correct_answer) {
      setQuizStatus("correct");
      if (!quizMastery.has(activeQuiz.id)) {
        setQuizMastery(prev => new Set(prev).add(activeQuiz.id));
        handleApplyXP(100);
      }
    } else {
      setQuizStatus("incorrect");
      
      // Fire background AI Diagnostic
      (async () => {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          fetch('/api/diagnose', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
              study_set_id: params.id as string,
              question_text: activeQuiz.question,
              user_answer: option,
              correct_answer: activeQuiz.correct_answer
            })
          }).catch(err => console.error("Silent diagnostic error", err));
        }
      })();
    }
  };

  const nextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizStatus("idle");
    }
  };

  const progressPercent = flashcards.length > 0
    ? (masteredIds.size / flashcards.length) * 100
    : 0;

  const activeQuiz = quizzes[currentQuizIndex];

  return (
    <div className="flex bg-surface text-surface-on min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col lg:ml-72 min-h-screen pt-20">
        <DashboardHeader title="Results & Mastery" />

        <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full">

          {/* Header Info */}
          <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">Target Focus</span>
              <h1 className="text-4xl font-extrabold font-headline tracking-tight text-surface-on mt-1">{studyTitle}</h1>
            </div>
            <div className="flex gap-4">
              <div className="bg-tertiary-container/20 px-6 py-3 rounded-xl flex items-center gap-3 shadow-sm border border-tertiary/20">
                <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <div>
                  <p className="text-[10px] font-bold text-tertiary/60 uppercase tracking-tighter leading-none">Global XP</p>
                  <p className="text-xl font-extrabold text-tertiary leading-none">{xp} XP</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Panel Layout */}
          <div className="grid grid-cols-12 gap-8 items-start">

            {/* Left Panel: Structured Notes */}
            <section className="col-span-12 xl:col-span-3 space-y-6">
              <div className="bg-white border border-surface-container p-6 rounded-2xl md:sticky md:top-28 shadow-sm">
                <h2 className="font-headline font-bold text-lg mb-6 flex items-center gap-2 text-surface-on">
                  <span className="material-symbols-outlined text-primary">description</span> Extraction Map
                </h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar">
                  {summaryNotes.length === 0 ? (
                    <div className="text-center p-6 text-on-surface-variant text-sm font-bold">No structured notes extracted for this set.</div>
                  ) : (
                    summaryNotes.map((note, index) => (
                      <div key={index} className="group border border-surface-container/50 rounded-xl bg-surface">
                        <details className="cursor-pointer" open={index === 0}>
                          <summary className="flex justify-between items-center p-3 font-bold text-primary transition-colors">
                            <span>Key Concept {index + 1}</span>
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                          </summary>
                          <div className="px-4 pb-3 pt-1 text-sm text-on-surface-variant border-t border-surface-container/50 space-y-2">
                            <p>{note}</p>
                          </div>
                        </details>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Center Panel: Quiz Section */}
            <section className="col-span-12 xl:col-span-5 space-y-8">
              <div className="bg-white border border-surface-container rounded-2xl p-8 shadow-premium min-h-[500px]">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-on-surface-variant animate-pulse font-bold">
                    Loading Quizzes...
                  </div>
                ) : activeQuiz ? (
                  <>
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary shadow-inner">
                          <span className="font-bold">Q{currentQuizIndex + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-headline font-bold text-xl text-surface-on">Assessment Quiz</h3>
                          <p className="text-sm text-on-surface-variant">Progress: {currentQuizIndex + 1} of {quizzes.length}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-surface rounded-full text-xs font-bold text-on-surface-variant border border-surface-container text-center hidden sm:block">AI Validation</span>
                    </div>

                    <div className="mb-10">
                      <p className="text-lg font-medium leading-relaxed text-surface-on">
                        {activeQuiz.question}
                      </p>
                    </div>

                    <div className="space-y-4 flex flex-col items-stretch">
                      {activeQuiz.options.map((opt, i) => {
                        const isSelected = selectedOption === opt;
                        const isCorrectOpt = activeQuiz.correct_answer === opt;

                        let btnClasses = "border-surface-container hover:border-surface-variant hover:bg-surface text-on-surface-variant";
                        let icon = null;

                        if (quizStatus !== "idle") {
                          if (isCorrectOpt) {
                            btnClasses = "border-primary bg-primary/5 text-primary font-bold shadow-sm ring-1 ring-primary/20";
                            icon = <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>;
                          } else if (isSelected) {
                            btnClasses = "border-error/50 bg-error/5 text-error";
                            icon = <span className="material-symbols-outlined text-error">cancel</span>;
                          }
                        } else if (isSelected) {
                          btnClasses = "border-tertiary bg-tertiary/5 text-tertiary";
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleQuizSelect(opt)}
                            className={`w-full text-left p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${btnClasses}`}
                          >
                            <span className="font-medium">{opt}</span>
                            {icon}
                          </button>
                        );
                      })}
                    </div>

                    {quizStatus === "correct" && (
                      <div className="mt-10 p-6 bg-primary/10 border border-primary/20 rounded-2xl shadow-inner flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm mb-1 flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span> Brilliant!
                          </h4>
                          <p className="text-sm text-primary/80">+100 XP awarded to your profile.</p>
                        </div>

                        {currentQuizIndex < quizzes.length - 1 ? (
                          <button onClick={nextQuiz} className="bg-primary text-primary-on px-6 py-3 rounded-full font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
                            Next Question <span className="material-symbols-outlined">arrow_forward</span>
                          </button>
                        ) : (
                          <span className="bg-white text-primary px-4 py-2 rounded-full text-xs font-bold uppercase">Quiz Completed!</span>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center font-bold text-on-surface-variant my-10">No quizzes available for this set.</p>
                )}
              </div>
            </section>

            {/* Right Panel: Flashcards & Progress */}
            <section className="col-span-12 xl:col-span-4 space-y-6">

              <div className="bg-white p-6 rounded-2xl border border-surface-container shadow-sm flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-bold text-primary">Generated Flashcards</h3>
                  <span className="text-xs font-bold text-on-surface-variant bg-surface px-2 py-1 border border-surface-container rounded">{flashcards.length - masteredIds.size} Left</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-4 pr-1">
                  {loading && <p className="text-center font-bold text-on-surface-variant my-10 animate-pulse">Loading AI Data...</p>}
                  {!loading && flashcards.length === 0 && <p className="text-center font-bold text-on-surface-variant my-10">No flashcards found for this study set.</p>}
                  {!loading && flashcards.map((card) => (
                    <div key={card.id} className="relative shadow-sm rounded-xl overflow-hidden border border-surface-container group">
                      {masteredIds.has(card.id) && (
                        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                          <div className="bg-secondary text-on-secondary px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <span className="material-symbols-outlined text-sm font-bold">done_all</span>
                            <span className="text-xs font-bold font-headline">+50 XP</span>
                          </div>
                        </div>
                      )}
                      <Flashcard card={card} onMastered={handleMastered} />
                    </div>
                  ))}
                </div>

                {masteredIds.size === flashcards.length && flashcards.length > 0 && (
                  <div className="mt-4 text-center">
                    <button onClick={() => router.push('/dashboard')} className="text-primary font-bold text-sm hover:underline active:scale-95 transition-transform flex items-center justify-center gap-2 mx-auto">
                      Return to Dashboard <span className="material-symbols-outlined text-sm">home</span>
                    </button>
                  </div>
                )}
              </div>

              {/* XP Progress Summary Card */}
              <div className="bg-white border border-surface-container p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-surface-container flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-secondary text-3xl">trending_up</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-on-surface-variant leading-none uppercase tracking-tighter mb-1">Set Mastery</p>
                    <p className="text-xl font-bold font-headline text-surface-on">{Math.round(progressPercent)}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-on-surface-variant font-medium">Session Goal</span>
                  <span className="font-bold text-secondary">{masteredIds.size}/{flashcards.length} Mastered</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden shadow-inner flex">
                  <div className="h-full bg-secondary transition-all duration-700 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>

    </div>
  );
}
