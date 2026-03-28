"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Flashcard, { FlashcardData } from "@/components/ui/Flashcard";

const MOCK_FLASHCARDS: FlashcardData[] = [
  { id: "1", front: "What is a Perceptron?", back: "The simplest type of artificial neural network, a linear classifier." },
  { id: "2", front: "What is ReLU?", back: "Rectified Linear Unit. Returns 0 for negative input, and x for positive input." },
  { id: "3", front: "What is Backpropagation?", back: "The process of calculating gradients by applying the chain rule." },
];

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  
  const level = useStore((state) => state.level);
  const xp = useStore((state) => state.xp);
  const incrementXP = useStore((state) => state.incrementXP);

  const [flashcards, setFlashcards] = useState<FlashcardData[]>(MOCK_FLASHCARDS);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  // Simulating fetching data
  useEffect(() => {
    console.log(`Loading learning set with ID: ${params.id}`);
  }, [params.id]);

  const handleMastered = (id: string) => {
    if (!masteredIds.has(id)) {
      setMasteredIds((prev) => new Set(prev).add(id));
      incrementXP(50);
    }
  };

  const progressPercent = flashcards.length > 0 
    ? (masteredIds.size / flashcards.length) * 100 
    : 0;

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Dashboard</Link>
            <Link href="/library" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Library</Link>
            <Link href={`/results/${params.id}`} className="text-primary font-bold border-b-2 border-primary font-headline px-3 py-1">Results</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">bolt</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">workspace_premium</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">local_fire_department</button>
          </div>
          <div className="h-10 w-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/10 flex items-center justify-center font-bold text-surface-variant">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-full w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container z-40">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <span className="text-surface-on font-bold text-lg font-headline">Alex Chen</span>
          <span className="text-surface-variant text-xs font-semibold uppercase tracking-wider">Level {level} Architect</span>
          <button className="mt-6 w-full bg-primary text-primary-on font-bold py-3 px-4 rounded-full shadow-md active:translate-x-1 transition-all duration-150 text-sm flex items-center justify-center gap-2 hover:brightness-110">
             Start Daily Quiz
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/dashboard" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/library" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">local_library</span> Library
          </Link>
          <Link href="/leaderboard" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">leaderboard</span> Leaderboard
          </Link>
          <Link href={`/results/${params.id}`} className="bg-primary/10 text-primary rounded-full px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm">
             <span className="material-symbols-outlined">analytics</span> Results
          </Link>
          <Link href="/profile" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">person</span> Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Info */}
          <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">Course Module 04</span>
              <h1 className="text-4xl font-extrabold font-headline tracking-tight text-surface-on mt-1">Foundations of Neural Networks</h1>
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
                  <span className="material-symbols-outlined text-primary">description</span> Structured Notes
                </h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar">
                  
                  <div className="group border border-surface-container/50 rounded-xl bg-surface">
                    <details className="cursor-pointer" open>
                      <summary className="flex justify-between items-center p-3 font-bold text-primary transition-colors">
                        <span>The Perceptron</span>
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-surface-variant border-t border-surface-container/50 space-y-2">
                        <p>The simplest type of artificial neural network, a linear classifier.</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Input weights</li>
                          <li>Summation function</li>
                          <li>Activation function</li>
                        </ul>
                      </div>
                    </details>
                  </div>
                  
                  <div className="group border border-surface-container/50 rounded-xl bg-surface">
                    <details className="cursor-pointer">
                      <summary className="flex justify-between items-center p-3 font-bold text-surface-on transition-colors">
                        <span>Activation Functions</span>
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-surface-variant border-t border-surface-container/50 space-y-2">
                        <p>Non-linear transformations applied to the output of a neuron.</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Sigmoid (0 to 1)</li>
                          <li>ReLU (Rectified Linear Unit)</li>
                          <li>Tanh (-1 to 1)</li>
                        </ul>
                      </div>
                    </details>
                  </div>

                  <div className="p-4 bg-error-container/10 border border-error/20 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-error">
                      <span className="material-symbols-outlined text-lg">warning</span>
                      <span className="font-bold text-sm">Weak Area</span>
                    </div>
                    <p className="text-xs text-surface-variant">You missed 2 questions regarding the chain rule in gradient descent. Review this section.</p>
                  </div>

                </div>
              </div>
            </section>

            {/* Center Panel: Quiz Section */}
            <section className="col-span-12 xl:col-span-5 space-y-8">
              <div className="bg-white border border-surface-container rounded-2xl p-8 shadow-premium">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary shadow-inner">
                      <span className="font-bold">Q4</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-xl text-surface-on">Assessment Quiz</h3>
                      <p className="text-sm text-surface-variant">Progress: 4 of 10</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-surface rounded-full text-xs font-bold text-surface-variant border border-surface-container text-center hidden sm:block">Topic: Gradients</span>
                </div>
                
                <div className="mb-10">
                  <p className="text-lg font-medium leading-relaxed text-surface-on">
                    Which mathematical principle is primarily used to calculate the gradients during the backpropagation process in deep learning models?
                  </p>
                </div>
                
                <div className="space-y-4 flex flex-col items-stretch">
                  <button className="w-full text-left p-5 rounded-2xl border-2 border-error/50 bg-error/5 flex justify-between items-center transition-all">
                    <span className="font-medium text-error">Linear Regression Formula</span>
                    <span className="material-symbols-outlined text-error">cancel</span>
                  </button>
                  <button className="w-full text-left p-5 rounded-2xl border-2 border-primary bg-primary/5 flex justify-between items-center transition-all shadow-sm">
                    <span className="font-medium text-primary font-bold">The Chain Rule</span>
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </button>
                  <button className="w-full text-left p-5 rounded-2xl border-2 border-surface-container hover:border-surface-variant hover:bg-surface transition-all">
                    <span className="font-medium text-surface-variant">Fourier Transformation</span>
                  </button>
                  <button className="w-full text-left p-5 rounded-2xl border-2 border-surface-container hover:border-surface-variant hover:bg-surface transition-all">
                    <span className="font-medium text-surface-variant">Bayesian Probability</span>
                  </button>
                </div>
                
                <div className="mt-10 p-6 bg-surface border border-surface-container rounded-2xl shadow-inner">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-surface-on">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span> Instant Feedback
                  </h4>
                  <p className="text-sm text-surface-variant">
                    <strong className="text-surface-on">The Chain Rule</strong> is the core mechanism. It allows the network to distribute the error from the output layer back through each weight in the preceding layers.
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button className="bg-primary text-primary-on px-8 py-4 rounded-full font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
                    Next Question <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Right Panel: Flashcards & Progress */}
            <section className="col-span-12 xl:col-span-4 space-y-6">
              
              {/* Refined Mastered Cards List since we have no 3D flip library standardly injected without the Flashcard component logic, we will use our existing component */}
              <div className="bg-white p-6 rounded-2xl border border-surface-container shadow-sm flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-bold text-primary">Generated Flashcards</h3>
                  <span className="text-xs font-bold text-surface-variant bg-surface px-2 py-1 border border-surface-container rounded">{flashcards.length - masteredIds.size} Left</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-4 pr-1">
                  {flashcards.map((card) => (
                    <div key={card.id} className="relative shadow-sm rounded-xl overflow-hidden border border-surface-container group">
                      {masteredIds.has(card.id) && (
                        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                           <div className="bg-secondary text-secondary-on px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
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
                    <button onClick={() => router.push('/dashboard')} className="text-primary font-bold text-sm hover:underline active:scale-95 transition-transform">
                       Finish Session
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
                    <p className="text-xs font-bold text-surface-variant leading-none uppercase tracking-tighter mb-1">Set Mastery</p>
                    <p className="text-xl font-bold font-headline text-surface-on">{Math.round(progressPercent)}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-surface-variant font-medium">Session Goal</span>
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
