"use client";

import Link from "next/link";
import { useState } from "react";

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 w-full z-50 border-b border-surface-container/30 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black font-headline text-primary tracking-tighter">
            LearnLoop
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/dashboard" className="font-headline font-bold text-sm tracking-tight text-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/community" className="font-headline font-bold text-sm tracking-tight text-surface-variant hover:text-primary transition-colors">Community</Link>
            <Link href="/leaderboard" className="font-headline font-bold text-sm tracking-tight text-surface-variant hover:text-primary transition-colors">Leaderboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-surface-variant font-bold font-headline text-sm hover:text-primary transition-colors px-4 py-2">
            Login
          </Link>
          <Link href="/signup" className="bg-primary text-primary-on px-6 py-2.5 rounded-full font-bold font-headline text-sm shadow-md hover:scale-105 transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
