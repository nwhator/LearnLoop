import { create } from 'zustand';

interface GamificationState {
  xp: number;
  currentStreak: number;
  level: number;
  incrementXP: (amount: number) => void;
  resetStreak: () => void;
  incrementStreak: () => void;
  setLevel: (level: number) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useStore = create<GamificationState>()((set) => ({
  xp: 0,
  currentStreak: 0,
  level: 1,
  
  incrementXP: (amount) => set((state) => {
    const newXp = state.xp + amount;
    // Basic level curve: Every 1000 XP is a new level
    const newLevel = Math.floor(newXp / 1000) + 1;
    return { xp: newXp, level: newLevel };
  }),
  
  resetStreak: () => set({ currentStreak: 0 }),
  incrementStreak: () => set((state) => ({ currentStreak: state.currentStreak + 1 })),
  setLevel: (level) => set({ level }),
  
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
