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
    <aside className="hidden lg:flex flex-col h-full w-72 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="px-8 mb-10">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-[2rem] border border-surface-container shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="w-16 h-16 rounded-full border-2 border-primary-container bg-surface-container flex justify-center items-center text-primary font-bold text-2xl shadow-inner font-headline group-hover:scale-110 transition-transform">
            {userData?.initials || "U"}
          </div>
          <div className="text-center relative z-10 w-full">
            <h3 className="text-lg font-black font-headline text-surface-on tracking-tight leading-none truncate max-w-full">
              {userData?.name || "Guest User"}
            </h3>
            <div className="mt-3 inline-block px-3 py-1 bg-primary/10 rounded-full">
               <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Level {userData?.level || 1} Scholar</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all group ${isActive ? 'bg-primary text-white shadow-lg' : 'text-surface-variant hover:bg-surface-container hover:text-surface-on'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? 'text-white' : 'text-surface-variant group-hover:text-primary transition-colors'}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-surface-container bg-surface/30">
        <Link 
          href="/settings"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-xs tracking-widest uppercase text-surface-variant hover:bg-surface-container hover:text-surface-on ml-2 transition-all outline-none"
        >
          <span className="material-symbols-outlined text-xl">settings</span> Settings
        </Link>
        <Link 
          href="/support"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-xs tracking-widest uppercase text-surface-variant hover:bg-surface-container hover:text-surface-on ml-2 transition-all outline-none"
        >
          <span className="material-symbols-outlined text-xl">help</span> Support
        </Link>
      </div>
    </aside>
  );
}
