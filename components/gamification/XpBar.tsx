"use client";

import { motion } from "framer-motion";
import { useStore } from "@/lib/store";

export function XpBar() {
  const xp = useStore((state) => state.xp);
  const level = useStore((state) => state.level);

  // Example scaling: 1000 XP per level.
  const nextLevelXp = level * 1000;
  const currentLevelStartXp = (level - 1) * 1000;
  
  // Calculate percentage within the current level
  const progressPercent = Math.max(0, Math.min(100, ((xp - currentLevelStartXp) / 1000) * 100));

  return (
    <div className="w-full glass-panel bg-tertiary-container/30 border border-tertiary-container p-4 rounded-2xl relative overflow-hidden group">
      <div className="flex justify-between items-center mb-2 relative z-10">
        <span className="text-xs font-bold text-tertiary uppercase tracking-wide">
          Level {level} Explorer
        </span>
        <span className="material-symbols-outlined text-tertiary font-bold text-sm">
          local_fire_department
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden relative z-10">
        <motion.div
          layout
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-tertiary origin-left rounded-full"
        />
      </div>

      <div className="flex justify-end mt-1 relative z-10">
        <span className="text-[10px] font-bold text-on-surface-variant">
          {xp} / {nextLevelXp} XP Base
        </span>
      </div>

      {/* Animated Level Up Glow (Triggered internally if needed) */}
      <div className="absolute -inset-4 bg-tertiary opacity-0 group-hover:opacity-10 transition-opacity blur-xl rounded-full" />
    </div>
  );
}
