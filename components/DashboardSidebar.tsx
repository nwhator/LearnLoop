"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useStore } from "@/lib/store";

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
  const { isMobileMenuOpen, toggleMobileMenu } = useStore();

  useEffect(() => {
    async function fetchSidebarData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("name, initials, level")
        .eq("id", user.id)
        .single();
      
      const fallbackName = user.user_metadata?.full_name || user.email?.split('@')[0] || "Guest Scholar";
      const fallbackInitials = fallbackName.charAt(0).toUpperCase();

      if (data && data.name) {
          setUserData(data);
      } else {
          setUserData({ name: fallbackName, initials: data?.initials || fallbackInitials, level: data?.level || 1 });
      }
    }
    fetchSidebarData();
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-surface-on/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggleMobileMenu}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 bg-surface-container-lowest border-r border-outline-variant/20 z-50 flex flex-col h-full w-72 pt-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button Mobile */}
        <button onClick={toggleMobileMenu} className="lg:hidden absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">close</span>
        </button>
      <div className="px-8 mb-10 mt-10">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-[2rem] border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="w-16 h-16 rounded-full border-2 border-primary-container bg-surface-container-low flex justify-center items-center text-primary font-bold text-2xl shadow-inner font-headline group-hover:scale-110 transition-transform">
            {userData?.initials || "U"}
          </div>
          <div className="text-center relative z-10 w-full">
            <h3 className="text-lg font-black font-headline text-on-surface tracking-tight leading-none truncate max-w-full">
              {userData?.name || "Guest User"}
            </h3>
            <div className="mt-3 inline-block px-3 py-1 bg-primary/10 rounded-full">
               <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Level {userData?.level || 1} Scholar</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all group ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? 'text-on-primary' : 'text-on-surface-variant group-hover:text-primary transition-colors'}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-outline-variant/20 bg-white">
        <Link 
          href="/settings"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-xs tracking-widest uppercase text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all outline-none"
        >
          <span className="material-symbols-outlined text-xl">settings</span> Settings
        </Link>
        <Link 
          href="/support"
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-xs tracking-widest uppercase text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all outline-none"
        >
          <span className="material-symbols-outlined text-xl">help</span> Support
        </Link>
      </div>
    </aside>
   </>
  );
}
