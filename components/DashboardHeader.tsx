"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/lib/store";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchHeaderData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("name, initials, streak_count")
        .eq("id", user.id)
        .single();
      if (data) setUserData(data);
    }
    fetchHeaderData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/library?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-72 w-full lg:w-auto h-20 bg-white/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm flex items-center justify-between px-6 lg:px-8 z-40 transition-all duration-300">
      <div className="flex items-center gap-6 lg:gap-10">
        <button onClick={() => useStore.getState().toggleMobileMenu()} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface">
            <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-2xl font-black font-headline text-on-surface tracking-tighter leading-none hidden md:block">
          {title}
        </h1>
        
        {/* Universal Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-surface-container-low rounded-full px-5 py-2.5 border border-outline-variant/20 w-72 lg:w-80 group focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-sm group-focus-within:text-primary">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, topics..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-bold placeholder:font-medium placeholder:text-on-surface-variant text-on-surface ml-2 outline-none" 
          />
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <HeaderAction 
              icon="notifications" 
              badge="2" 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
              active={isNotificationsOpen}
            />
            {isNotificationsOpen && (
              <div className="absolute top-14 right-0 w-80 bg-white rounded-[2rem] shadow-premium border border-outline-variant/20 p-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between px-4 py-2 border-b border-surface-container mb-4">
                  <h4 className="font-black font-headline text-on-surface tracking-tight">Intelligence Feed</h4>
                  <button onClick={() => setIsNotificationsOpen(false)} className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline">Clear all</button>
                </div>
                <div className="space-y-2">
                  <NotificationItem 
                    icon="bolt" 
                    title="Daily Credits Reset" 
                    desc="Your account has been topped up with 3 fresh generation credits."
                    time="2m ago"
                    color="text-secondary bg-secondary/10"
                  />
                  <NotificationItem 
                    icon="psychology" 
                    title="AI Concept Mapping" 
                    desc="Gemini analyzed your last quiz and found a gap in 'Neural Layers'."
                    time="1h ago"
                    color="text-primary bg-primary/10"
                  />
                  <NotificationItem 
                    icon="rocket_launch" 
                    title="Mission Initialized" 
                    desc="Complete 5 quizzes today to unlock the 'Scholar' badge!"
                    time="3h ago"
                    color="text-tertiary bg-tertiary/10"
                  />
                </div>
                <button className="w-full mt-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">See all history</button>
              </div>
            )}
          </div>
          <HeaderAction icon="local_fire_department" color="text-tertiary" badge={userData?.streak_count?.toString() || "0"} />
          <HeaderAction icon="workspace_premium" color="text-secondary" />
        </div>
        
        <div className="h-10 w-px bg-surface-container mx-2" />
        
        <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-container-low flex justify-center items-center text-primary font-bold shadow-sm font-headline hover:scale-105 active:scale-95 transition-all">
          {userData?.initials || "U"}
        </Link>
      </div>
    </nav>
  );
}

function HeaderAction({ icon, color = "text-on-surface-variant", badge, onClick, active }: { icon: string; color?: string; badge?: string; onClick?: () => void; active?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-10 h-10 rounded-full border border-outline-variant/20 bg-white flex items-center justify-center transition-all active:scale-90 group outline-none ${active ? 'bg-primary/10 border-primary/20 ring-2 ring-primary/10' : 'hover:bg-surface-container-low'}`}
    >
      <span className={`material-symbols-outlined text-xl transition-colors ${active ? 'text-primary' : color} group-hover:text-primary`}>{icon}</span>
      {badge && parseInt(badge) > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{badge}</span>
      )}
    </button>
  );
}

function NotificationItem({ icon, title, desc, time, color }: { icon: string; title: string; desc: string; time: string; color: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-surface-container-lowest transition-all cursor-pointer group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${color}`}>
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <p className="font-black font-headline text-sm text-on-surface tracking-tight leading-none truncate">{title}</p>
          <span className="text-[9px] font-black text-on-surface-variant opacity-40 uppercase tracking-tighter whitespace-nowrap">{time}</span>
        </div>
        <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </div>
  );
}
