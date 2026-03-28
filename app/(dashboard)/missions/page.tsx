"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

// Mocking Mission data structure mapped from Supabase public.user_missions
const DAILY_MISSIONS = [
  { id: "1", type: "daily_quiz", title: "Complete 3 Quizzes", reward: 150, current: 1, target: 3 },
  { id: "2", type: "streak_3", title: "Maintain a 3-Day Streak", reward: 500, current: 2, target: 3 },
  { id: "3", type: "perfect_score", title: "Master 10 Flashcards", reward: 300, current: 10, target: 10 },
];

export default function MissionsPage() {
  const incrementXP = useStore((state) => state.incrementXP);
  // Simulated State for claiming missions
  const [claimedMissions, setClaimedMissions] = useState<Set<string>>(new Set());

  const handleClaimReward = (id: string, rewardValue: number) => {
    if (!claimedMissions.has(id)) {
      setClaimedMissions(new Set(claimedMissions).add(id));
      incrementXP(rewardValue);
    }
  };

  return (
    <div className="flex-1 p-8 lg:px-16 lg:py-12 bg-surface min-h-screen">
      <header className="flex flex-col mb-12">
        <h1 className="text-4xl font-extrabold font-headline text-surface-on tracking-tight flex items-center gap-3">
           <span className="material-symbols-outlined text-tertiary-fixed text-4xl">local_activity</span>
           Daily Missions
        </h1>
        <p className="text-surface-variant max-w-2xl text-lg mt-2 font-medium">
          Complete daily challenges to earn bonus XP and limited-edition badges. Rewards expire in 8 hours!
        </p>
      </header>

      {/* Hero Mission Card / Active Challenge Spotlight */}
      <section className="mb-12">
        <div className="relative w-full overflow-hidden bg-primary-container rounded-[2rem] p-8 md:p-12 shadow-premium">
           {/* Background Overlay Graphic */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-on/10 to-transparent blur-3xl rounded-full" />
           <div className="absolute top-0 right-0 w-64 h-full flex items-center justify-center opacity-20 pointer-events-none transform translate-x-12">
              <span className="material-symbols-outlined text-[200px] text-primary-on" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
           </div>

           <div className="relative z-10">
              <span className="bg-primary/20 text-primary-on border border-primary-on/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-sm">
                Event Mission
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold font-headline text-primary-on tracking-tight mb-4 max-w-lg leading-tight">
                Quantum Week Creator Challenge
              </h2>
              <p className="text-primary-on/80 max-w-md font-medium mb-8">
                Generate 5 new study sets using the Next-Gen Gemini API to earn the legendary Quantum Brain badge.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="bg-white text-primary font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">
                    Start Generating
                 </button>
                 <div className="flex items-center gap-2 text-primary-on/90 bg-primary/20 px-6 py-3 rounded-full font-bold backdrop-blur-md border border-primary/30">
                    <span className="material-symbols-outlined">schedule</span> Ends in 2 Days
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Grid of Daily Tasks */}
      <section>
        <h3 className="text-2xl font-extrabold font-headline text-surface-on mb-6">Today's Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {DAILY_MISSIONS.map((mission) => {
             const isComplete = mission.current >= mission.target;
             const isClaimed = claimedMissions.has(mission.id);
             const progressPercentage = Math.min((mission.current / mission.target) * 100, 100);

             return (
               <motion.div 
                 key={mission.id}
                 whileHover={{ y: -4 }}
                 className={`relative glass-panel rounded-3xl p-6 border shadow-glass transition-colors 
                   ${isClaimed ? 'bg-surface-container/50 border-surface-container grayscale opacity-70' : 'bg-white border-surface-container/30 hover:border-tertiary/20'}
                 `}
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isComplete && !isClaimed ? 'bg-tertiary-container/50' : 'bg-surface-container'}`}>
                        <span className={`material-symbols-outlined text-2xl font-bold ${isComplete && !isClaimed ? 'text-tertiary' : 'text-surface-variant'}`}>
                          {mission.type.includes('quiz') ? 'quiz' : mission.type.includes('streak') ? 'local_fire_department' : 'stars'}
                        </span>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm
                       ${isComplete && !isClaimed ? 'bg-tertiary text-tertiary-on shadow-tertiary/20' : 'bg-surface-container text-surface-variant'}
                     `}>
                       +{mission.reward} XP
                     </span>
                  </div>

                  <h4 className="text-xl font-headline font-bold text-surface-on mb-2">{mission.title}</h4>
                  
                  {/* Progress Tracker */}
                  <div className="mb-6">
                     <div className="flex justify-between text-xs font-bold text-surface-variant mb-2">
                       <span>Progress</span>
                       <span>{mission.current} / {mission.target}</span>
                     </div>
                     <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${isComplete ? 'bg-tertiary' : 'bg-primary'}`}
                        />
                     </div>
                  </div>

                  {/* Call to Action */}
                  <div className="w-full flex">
                    {isClaimed ? (
                      <button disabled className="w-full py-3 rounded-xl bg-surface-container text-surface-variant font-bold flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">done_all</span> Claimed
                      </button>
                    ) : isComplete ? (
                      <button 
                         onClick={() => handleClaimReward(mission.id, mission.reward)}
                         className="w-full py-3 rounded-xl bg-tertiary text-tertiary-on font-bold shadow-lg hover:shadow-tertiary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                         <span className="material-symbols-outlined text-lg">redeem</span> Claim Reward
                      </button>
                    ) : (
                      <button className="w-full py-3 rounded-xl bg-primary-container/20 text-primary font-bold hover:bg-primary-container/30 active:scale-95 transition-all">
                        Go to Task
                      </button>
                    )}
                  </div>
               </motion.div>
             );
           })}
        </div>
      </section>
    </div>
  );
}
