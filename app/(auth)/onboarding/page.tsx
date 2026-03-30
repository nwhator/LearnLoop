"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingTourPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const skipTour = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased relative overflow-hidden">
      
      {/* Blurred "Fake Dashboard" Background to simulate the tour context */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity filter blur-sm pointer-events-none">
        <header className="w-full bg-white shadow-sm flex justify-between items-center px-6 h-16">
           <span className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</span>
        </header>
        <aside className="h-full w-64 fixed left-0 top-16 pt-8 flex flex-col border-r border-surface-container bg-surface-bright">
           <div className="w-full h-12 bg-surface-container rounded-lg mx-4 mb-4"></div>
           <div className="w-full h-12 bg-surface-container rounded-lg mx-4 mb-4"></div>
        </aside>
        <main className="ml-64 pt-24 px-8 pb-12">
           <div className="w-3/4 h-32 bg-surface-container rounded-lg mb-8"></div>
           <div className="w-full h-64 bg-surface-container rounded-lg"></div>
        </main>
      </div>

      {/* ONBOARDING OVERLAY & STEPPER */}
      <div className="fixed inset-0 z-[100] bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
        
        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-premium overflow-hidden relative transform transition-all">
          <div className="h-2 bg-primary"></div>
          <div className="p-8">
            
            {/* Mascot / Helper Character */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center shrink-0 border-2 border-primary-container">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-xl text-primary">Your Learning Companion</h3>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Step {step} of 3</p>
              </div>
            </div>

            {/* Dynamic Step Content */}
            {step === 1 && (
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Paste Your Knowledge</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                      This is the heart of LearnLoop! Paste your messy lecture notes, articles, or text right here. I'll transform them into professional study sets in seconds.
                    </p>
                  </div>
                </div>
                {/* Decorative Visual Aid */}
                <div className="bg-surface rounded-xl p-4 border border-surface-container flex items-center gap-3 shadow-inner mt-6">
                  <span className="material-symbols-outlined text-primary">content_paste</span>
                  <div className="flex-grow">
                    <div className="h-2 w-3/4 bg-surface-variant/30 rounded-full mb-2"></div>
                    <div className="h-2 w-1/2 bg-surface-variant/30 rounded-full"></div>
                  </div>
                  <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Gamify it!</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                      Keep your streak alive and earn XP for every note you process. Higher streaks unlock premium rewards!
                    </p>
                  </div>
                </div>
                <div className="bg-secondary-container/20 rounded-xl p-4 border border-secondary/20 flex items-center justify-center gap-3 mt-6">
                   <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-secondary text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      <span className="font-bold text-secondary text-sm">3 Day Streak!</span>
                   </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Compete</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                      Check the Leaderboard to see how you rank against other architects. Level up to become a Legend!
                    </p>
                  </div>
                </div>
                <div className="bg-tertiary-container/20 rounded-xl p-4 border border-tertiary/20 flex flex-col items-center justify-center mt-6">
                   <span className="material-symbols-outlined text-tertiary text-4xl mb-2">emoji_events</span>
                   <span className="font-bold text-tertiary text-sm">Rank #1 Global Viewer</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-surface-container pt-6">
              <button onClick={skipTour} className="text-on-surface-variant font-bold text-sm hover:text-on-surface transition-colors">
                Skip Tour
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={handleNext}
                  className="bg-primary text-on-primary px-8 py-3 rounded-full font-headline font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-md shadow-primary/20"
                >
                  {step === 3 ? "Complete" : "Next"}
                  {step !== 3 && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                  {step === 3 && <span className="material-symbols-outlined text-sm">done_all</span>}
                </button>
              </div>
            </div>
            
            {/* Stepper Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-6 bg-primary' : 'w-2 bg-surface-container'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-6 bg-primary' : 'w-2 bg-surface-container'}`}></div>
              <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-6 bg-primary' : 'w-2 bg-surface-container'}`}></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
