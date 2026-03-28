"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const NAVIGATION_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Library", href: "/library", icon: "local_library" },
  { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard" },
  { label: "Missions", href: "/missions", icon: "rocket_launch" },
  { label: "Community", href: "/community", icon: "groups" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function fetchSidebarData() {
      // Fetch user profile data and their level/stats directly from users table
      const { data } = await supabase
        .from("users")
        .select("name, initials, level")
        .single();
      
      if (data) setUserData(data);
    }
    fetchSidebarData();
  }, []);

  return (
    <aside className="hidden lg:flex flex-col h-full w-72 fixed left-0 top-0 pt-20 bg-background border-r border-border/50 z-40 shadow-premium">
      <div className="px-8 mt-12 mb-10">
        <div className="flex flex-col items-center gap-6 p-8 liquid-glass rounded-[2rem] border border-white/5 shadow-2xl group overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
          <div className="w-20 h-20 rounded-full border-4 border-white/10 p-1 bg-background/50 shadow-inner">
            <div className="w-full h-full bg-white/5 rounded-full flex justify-center items-center text-foreground font-black text-3xl shadow-lg font-headline group-hover:scale-110 transition-transform">
              {userData?.initials || "U"}
            </div>
          </div>
          <div className="text-center relative z-10 w-full space-y-2">
            <h3 className="text-xl font-black font-headline text-foreground tracking-tight leading-none truncate max-w-full">
              {userData?.name || "Guest User"}
            </h3>
            <div className="inline-block px-4 py-1.5 liquid-glass rounded-full border border-white/10">
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Level {userData?.level || 1} Elite</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pt-4">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-8 py-4 rounded-full font-black text-xs tracking-[0.1em] uppercase transition-all group border border-transparent ${isActive ? 'bg-foreground text-background shadow-2xl ring-4 ring-white/5' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground hover:border-white/5'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? 'text-background' : 'text-muted-foreground group-hover:text-foreground transition-colors'}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border/50 bg-background/30 backdrop-blur-xl">
        <Link 
          href="/settings"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all outline-none"
        >
          <span className="material-symbols-outlined text-xl">settings</span> Settings
        </Link>
        <Link 
          href="/support"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all outline-none"
        >
          <span className="material-symbols-outlined text-xl">help</span> Support
        </Link>
      </div>
    </aside>
  );
}
