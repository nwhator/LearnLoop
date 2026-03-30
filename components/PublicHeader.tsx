"use client";

import Link from "next/link";
import { useState } from "react";

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 w-full z-50 border-b border-surface-container-low shadow-sm">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8 lg:gap-10">
          <Link href="/" className="text-2xl font-black font-headline text-primary tracking-tighter flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">loop</span>
            LearnLoop
          </Link>
          <div className="hidden lg:flex gap-8 items-center">
            <Link href="/dashboard" className="font-headline font-bold text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/missions" className="font-headline font-bold text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors">Missions</Link>
            <Link href="/leaderboard" className="font-headline font-bold text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors">Leaderboard</Link>
            <Link href="/premium" className="font-headline font-bold text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors">Pricing</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:block text-on-surface-variant font-bold text-sm hover:text-primary px-4 transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">
            Get Started
          </Link>
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all"
          >
            <span className="material-symbols-outlined text-on-surface">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-surface-container-low px-6 py-4 bg-surface/95 backdrop-blur-xl space-y-3">
          <Link href="/dashboard" className="block font-headline font-bold text-sm text-on-surface-variant hover:text-primary py-2">Dashboard</Link>
          <Link href="/missions" className="block font-headline font-bold text-sm text-on-surface-variant hover:text-primary py-2">Missions</Link>
          <Link href="/leaderboard" className="block font-headline font-bold text-sm text-on-surface-variant hover:text-primary py-2">Leaderboard</Link>
          <Link href="/premium" className="block font-headline font-bold text-sm text-on-surface-variant hover:text-primary py-2">Pricing</Link>
        </div>
      )}
    </nav>
  );
}
