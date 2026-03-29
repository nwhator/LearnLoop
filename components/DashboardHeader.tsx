"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({ title }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchHeaderData() {
      // Fetch dynamic user streak and data
      const { data } = await supabase.from("users").select("name, initials, streak_count").single();
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
    <nav className="fixed top-0 right-0 left-0 lg:left-72 w-full lg:w-auto h-20 bg-white/90 backdrop-blur-xl border-b border-surface-container/50 shadow-sm flex items-center justify-between px-8 z-40 transition-all duration-300">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-black font-headline text-surface-on tracking-tighter leading-none hidden md:block">
          {title}
        </h1>
        
        {/* Universal Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-surface-container rounded-full px-5 py-2.5 border border-surface-container/30 w-72 lg:w-80 group focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all">
          <span className="material-symbols-outlined text-surface-variant text-sm group-focus-within:text-primary">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, topics..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-bold placeholder:font-medium placeholder:text-surface-variant text-surface-on ml-2 outline-none" 
          />
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <HeaderAction icon="notifications" badge="2" />
          <HeaderAction icon="local_fire_department" color="text-secondary" badge={userData?.streak_count?.toString() || "0"} />
          <HeaderAction icon="stars" color="text-tertiary" />
        </div>
        
        <div className="h-10 w-px bg-surface-container mx-2" />
        
        <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface flex justify-center items-center text-primary font-bold shadow-sm font-headline hover:scale-105 active:scale-95 transition-all">
          {userData?.initials || "U"}
        </Link>
      </div>
    </nav>
  );
}

function HeaderAction({ icon, color = "text-surface-variant", badge }: { icon: string, color?: string, badge?: string }) {
  return (
    <button className="relative w-10 h-10 rounded-full border border-surface-container bg-white flex items-center justify-center hover:bg-surface-container transition-all active:scale-90 group outline-none">
      <span className={`material-symbols-outlined text-xl transition-colors ${color} group-hover:text-primary`}>{icon}</span>
      {badge && parseInt(badge) > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{badge}</span>
      )}
    </button>
  );
}
