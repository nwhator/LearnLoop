"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";

interface UserProfile {
    name: string;
    email: string;
    level: number;
    xp: number;
    streak_count: number;
    initials?: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (error) throw error;
        
        const fallbackName = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || "Scholar";
        
        setUser({
            ...data,
            name: data.name || fallbackName,
            email: authUser.email || data.email
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <DashboardHeader title="Elite Settings" />

        <div className="p-8 lg:p-12 mt-20 max-w-7xl mx-auto w-full grid grid-cols-12 gap-10">
            
            {/* Left Bento: Identity */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
                <section className="bg-white p-10 rounded-[3rem] shadow-premium flex flex-col items-center text-center border border-surface-container relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>
                    <div className="relative mb-8 z-10 mt-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-white shadow-xl">
                            <div className="w-full h-full bg-surface-container rounded-full flex justify-center items-center text-primary text-5xl font-black font-headline tracking-tighter shadow-inner">
                                {user?.initials || user?.name?.charAt(0) || "U"}
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <span className="text-xs font-black font-headline tracking-widest">{user?.level || 1}</span>
                        </div>
                    </div>
                    
                    <h1 className="text-3xl font-black font-headline text-on-surface mb-1 z-10 tracking-tight">{user?.name}</h1>
                    <p className="text-on-surface-variant text-sm mb-10 z-10 font-black uppercase tracking-[0.2em] opacity-60">Elite Scholar</p>
                    
                    <div className="flex w-full gap-4 z-10">
                        <div className="flex-1 bg-surface border border-surface-container p-6 rounded-3xl shadow-inner group-hover:border-secondary transition-colors">
                            <span className="block text-secondary font-black text-3xl leading-none mb-1 font-headline tracking-tighter">{user?.streak_count || 0}</span>
                            <span className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant opacity-70">Streak</span>
                        </div>
                        <div className="flex-1 bg-surface border border-surface-container p-6 rounded-3xl shadow-inner group-hover:border-primary transition-colors">
                            <span className="block text-primary font-black text-3xl leading-none mb-1 font-headline tracking-tighter">{(user?.xp || 0).toLocaleString()}</span>
                            <span className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant opacity-70">Total XP</span>
                        </div>
                    </div>
                </section>

                {/* Badge Showcase (Static for now as per schema) */}
                <section className="bg-white p-10 rounded-[3rem] border border-surface-container shadow-sm">
                    <h3 className="font-headline font-black text-xl text-on-surface mb-8 tracking-tight">Achievements</h3>
                    <div className="grid grid-cols-3 gap-8">
                        {['Early Bird', 'Historian', 'Scholar'].map((badge) => (
                            <div key={badge} className="flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="w-16 h-16 bg-surface border border-surface-container/50 shadow-inner rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:bg-primary/5">
                                    <span className="material-symbols-outlined text-primary/30 group-hover:text-primary transition-colors text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                </div>
                                <span className="text-[9px] font-black text-center text-on-surface uppercase tracking-[0.2em]">{badge}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Bento: Settings */}
            <div className="col-span-12 lg:col-span-8 space-y-10">
                <section className="bg-white p-10 lg:p-14 rounded-[3rem] border border-surface-container shadow-sm">
                    <h2 className="font-headline font-black text-4xl mb-12 text-on-surface tracking-tighter">Identity & Preferences</h2>
                    
                    <div className="space-y-12">
                        {/* Comms */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant border-b border-surface-container pb-4">Communications</h4>
                            
                            <div className="flex items-center justify-between p-6 hover:bg-surface rounded-3xl transition-all border border-transparent hover:border-surface-container group cursor-pointer" onClick={() => setPushNotifs(!pushNotifs)}>
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${pushNotifs ? 'bg-secondary text-white shadow-lg' : 'bg-surface-container text-on-surface shadow-inner'}`}>
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                    </div>
                                    <div>
                                        <p className="font-black font-headline text-lg text-on-surface tracking-tight">Neuro-Alerts</p>
                                        <p className="text-sm text-on-surface-variant font-medium opacity-60">Instant mission protocols and platform updates</p>
                                    </div>
                                </div>
                                <div className={`w-16 h-8 rounded-full relative p-1 transition-all shadow-inner flex items-center ${pushNotifs ? 'bg-secondary' : 'bg-surface-container'}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-premium transition-transform duration-500 ease-in-out ${pushNotifs ? 'translate-x-8' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Subscription */}
                        <div className="space-y-6 pt-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant border-b border-surface-container pb-4">Evolution Support</h4>
                            <div className="bg-gradient-to-br from-surface to-white p-10 rounded-[2.5rem] border-2 border-primary/20 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group shadow-lg">
                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-black text-2xl font-headline tracking-tighter text-on-surface">Scholar Plus</p>
                                        <p className="text-sm font-bold text-on-surface-variant opacity-60">Unlock restricted AI study models</p>
                                    </div>
                                </div>
                                <Link href="/premium" className="bg-primary text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all">
                                    Upgrade Identity
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-6">
                    <button 
                      onClick={async () => {
                        const { error } = await supabase.auth.signOut();
                        if (error) console.error("Logout error:", error);
                        router.push("/login");
                      }} 
                      className="flex-1 bg-white border border-surface-container text-on-surface py-6 rounded-full font-black text-xs uppercase tracking-widest text-center shadow-sm hover:bg-surface active:scale-95 transition-all"
                    >
                        Logout
                    </button>
                    <button className="flex-1 bg-error/5 border border-error/20 text-error py-6 rounded-full font-black text-xs uppercase tracking-widest text-center shadow-sm hover:bg-error hover:text-white active:scale-95 transition-all">
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
