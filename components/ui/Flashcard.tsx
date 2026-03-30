"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardProps {
  card: FlashcardData;
  onMastered?: (id: string) => void;
}

export default function Flashcard({ card, onMastered }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="relative w-full h-80 preserve-3d cursor-pointer perspective-[1000px] mb-8" onClick={handleFlip}>
      <motion.div
        className="w-full h-full preserve-3d relative transition-all duration-700 ease-in-out"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-surface-bright rounded-3xl shadow-premium border border-surface-container/50 flex flex-col items-center justify-center p-8 text-center">
          <span className="absolute top-6 left-6 text-sm font-bold text-on-surface-variant uppercase tracking-wider">Question</span>
          <p className="text-2xl font-headline font-semibold text-on-surface">{card.front}</p>
          <span className="absolute bottom-6 flex items-center gap-2 text-on-surface-variant text-sm font-medium">
            <span className="material-symbols-outlined text-lg">touch_app</span> Tap to reveal
          </span>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-8 flex flex-col shadow-premium"
          style={{ transform: "rotateY(180deg)", background: "linear-gradient(135deg, var(--colors-primary-container), var(--colors-secondary-container))" }}
        >
           <span className="absolute top-6 left-6 text-sm font-bold text-on-primary uppercase tracking-wider opacity-80">Answer</span>
           <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-xl font-body font-medium text-on-primary text-center mb-8">{card.back}</p>
           </div>
           
           {/* Gamification Action */}
           <div className="flex gap-4 justify-center" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={(e) => { e.stopPropagation(); onMastered?.(card.id); }}
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                 <span className="material-symbols-outlined">check_circle</span> Mastered
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                className="bg-white/20 text-on-primary backdrop-blur-md px-6 py-2 rounded-full font-bold shadow-glass flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                 <span className="material-symbols-outlined">replay</span> Review again
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
