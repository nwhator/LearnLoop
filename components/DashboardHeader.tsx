"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function fetchHeaderData() {
      // In a real app, this would use auth.uid()
      const { data } = await supabase.from("users").select("name, initials, streak_count").single();
      if (data) setUserData(data);
    }
    fetchHeaderData();
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-72 w-full lg:w-auto h-24 bg-background/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-10 z-[45] transition-all duration-300">
      <div className="flex items-center gap-14">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tighter leading-none hidden md:block">
          {title}
        </h1>
        
        {/* Universal Search */}
        <div className="hidden sm:flex items-center liquid-glass rounded-full px-6 py-3 border border-white/5 w-72 lg:w-96 group focus-within:ring-2 focus-within:ring-white/10 transition-all shadow-inner">
          <span className="material-symbols-outlined text-muted-foreground text-sm group-focus-within:text-foreground">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Arena..." 
            className="bg-transparent border-none focus:ring-0 text-xs w-full font-black tracking-widest uppercase placeholder:font-black placeholder:text-muted-foreground/30 text-foreground ml-3 outline-none" 
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <HeaderAction icon="notifications" badge="2" />
          <HeaderAction icon="bolt" color="text-foreground" badge={userData?.streak_count?.toString() || "0"} />
          <HeaderAction icon="workspace_premium" color="text-foreground" />
        </div>
        
        <div className="h-12 w-px bg-white/10 mx-2" />
        
        <Link href="/profile" className="w-12 h-12 rounded-full border-2 border-white/10 liquid-glass flex justify-center items-center text-foreground font-black text-xs shadow-2xl font-headline hover:scale-110 active:scale-95 transition-all">
          {userData?.initials || "U"}
        </Link>
      </div>
    </nav>
  );
}

function HeaderAction({ icon, color = "text-muted-foreground", badge }: { icon: string, color?: string, badge?: string }) {
  return (
    <button className="relative w-12 h-12 rounded-full border border-white/5 liquid-glass flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 group outline-none overflow-visible">
      <span className={`material-symbols-outlined text-xl transition-colors ${color} group-hover:text-foreground`}>{icon}</span>
      {badge && parseInt(badge) > 0 && (
        <span className="absolute -top-1 -right-1 bg-foreground text-background text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-background shadow-xl scale-110">{badge}</span>
      )}
    </button>
  );
}
