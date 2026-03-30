"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const level = useStore((state) => state.level);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("Alex Rivers");
  const [email, setEmail] = useState("alex@example.com");

  // Preferences (Local State)
  const [preferences, setPreferences] = useState({
    darkMode: theme === "dark",
    reducedMotion: false,
    emailNotifs: true,
    inAppAlerts: true,
    pushNotifs: false,
    xpPopups: true,
    streakReminders: true,
    publicLeaderboard: false
  });

  const handleSave = () => {
    // TODO: Implement save logic (e.g., update user preferences in Supabase)
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  const handleToggle = (key: string) => {
    if (key === "darkMode") {
      toggleTheme();
    }
    setPreferences(prev => ({ ...prev, [key]: !prev[key as keyof typeof preferences] }));
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16 border-b border-surface-container/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tighter">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors px-3 py-1 rounded-md font-headline font-bold">Dashboard</Link>
            <Link href="/library" className="text-on-surface-variant hover:text-primary transition-colors px-3 py-1 rounded-md font-headline font-bold">Library</Link>
            <Link href="/settings" className="text-primary border-b-2 border-primary px-3 py-1 font-headline font-bold">Settings</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">bolt</span>
            </button>
            <Link href="/subscription" className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95 group">
              <span className="material-symbols-outlined group-hover:text-tertiary">workspace_premium</span>
            </Link>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95 group">
              <span className="material-symbols-outlined group-hover:text-orange-500">local_fire_department</span>
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary border-2 border-primary-container shadow-sm ml-2">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col h-full border-r border-surface-container bg-surface-bright w-64 fixed left-0 top-0 pt-20 z-40">
        <div className="px-6 mb-8 mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-surface-container flex items-center justify-center font-bold text-primary shadow-sm text-xl">A</div>
            <div>
              <h3 className="font-headline text-sm font-bold text-on-surface">Alex Rivers</h3>
              <p className="text-xs text-on-surface-variant font-medium">Level {level} Architect</p>
            </div>
          </div>
          <Link href="/dashboard" className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl hover:brightness-110 shadow-sm transition-all active:scale-95 text-sm flex justify-center">
             Start Daily Quiz
          </Link>
        </div>
        
        <nav className="flex-grow space-y-1 overflow-y-auto px-2">
          <Link href="/dashboard" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/library" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">local_library</span> Library
          </Link>
          <Link href="/leaderboard" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">leaderboard</span> Leaderboard
          </Link>
          <Link href="/missions" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">assignment_turned_in</span> Missions
          </Link>
          <Link href="/profile" className="flex items-center gap-3 text-on-surface-variant px-4 py-3 mx-2 hover:bg-surface-container rounded-full transition-all text-sm font-semibold">
            <span className="material-symbols-outlined">person</span> Profile
          </Link>
        </nav>
        
        <div className="mt-auto border-t border-surface-container pt-4 pb-8 flex flex-col gap-1 px-2">
          <Link href="/history" className="flex items-center gap-3 text-on-surface-variant px-4 py-2 mx-2 hover:bg-surface-container rounded-full transition-all text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">history</span> History
          </Link>
          <Link href="/notifications" className="flex items-center gap-3 text-on-surface-variant px-4 py-2 mx-2 hover:bg-surface-container rounded-full transition-all text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">notifications</span> Notifications
          </Link>
          <Link href="/settings" className="flex items-center gap-3 bg-primary/10 text-primary border border-primary/20 shadow-sm rounded-full px-4 py-3 mx-2 text-xs font-semibold">
            <span className="material-symbols-outlined text-sm">settings</span> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-28 pb-32 px-6 md:px-12 max-w-6xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-4xl font-black font-headline tracking-tight text-on-surface mb-2">Settings & Preferences</h1>
          <p className="text-on-surface-variant text-lg font-medium tracking-wide">Manage your LearnLoop experience and account security.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Account & Security */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Account Info Management */}
                <section className="bg-white rounded-2xl p-8 border border-surface-container shadow-sm">
                    <div className="flex items-center gap-4 mb-8 border-b border-surface-container/50 pb-6">
                        <div className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl shadow-inner">
                            <span className="material-symbols-outlined text-3xl">manage_accounts</span>
                        </div>
                        <h2 className="text-2xl font-bold font-headline text-on-surface">Account Management</h2>
                    </div>
                    
                    <div className="space-y-8">
                        {/* Profile Identity */}
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center p-6 bg-surface rounded-2xl border border-surface-container">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full border-4 border-white bg-surface-container flex justify-center items-center text-primary font-headline font-black text-4xl shadow-md uppercase">
                                  {user?.initials || fullName.charAt(0) || "U"}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                </button>
                            </div>
                            
                            <div className="flex-grow w-full">
                                <h3 className="text-xl font-bold font-headline text-on-surface mb-1">Public Profile</h3>
                                <p className="text-sm text-on-surface-variant mb-4 font-medium">Your avatar and name are visible to other architects.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant pl-1">Full Name</label>
                                        <input 
                                          type="text" 
                                          value={fullName}
                                          onChange={(e) => setFullName(e.target.value)}
                                          className="w-full bg-white border border-surface-container rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all shadow-sm" 
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant pl-1">Scholar Status</label>
                                        <input type="text" disabled value={`Level ${user?.level || 1} Architect`} className="w-full bg-surface-container/30 border border-surface-container rounded-xl px-4 py-3 text-sm font-medium cursor-not-allowed opacity-70" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Info */}
                        <div className="p-6 border border-surface-container rounded-2xl bg-white shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">mail</span>
                            </div>
                            <h4 className="font-bold text-on-surface mt-2">Email Address</h4>
                            <p className="text-sm text-on-surface-variant mt-1">{email}</p>
                            <p className="text-[10px] text-on-surface-variant/60 italic mt-2">To change your email, please contact Support Architecture.</p>
                        </div>
                    </div>
                </section>

                {/* Notification Settings */}
                <section className="bg-white rounded-2xl p-8 border border-surface-container shadow-sm">
                    <div className="flex items-center gap-4 mb-8 border-b border-surface-container/50 pb-6">
                        <div className="p-3 bg-secondary/10 text-secondary border border-secondary/20 rounded-2xl shadow-inner">
                            <span className="material-symbols-outlined text-3xl">notifications_active</span>
                        </div>
                        <h2 className="text-2xl font-bold font-headline text-on-surface">Notification Preferences</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-5 bg-surface border border-surface-container rounded-2xl cursor-pointer hover:border-surface-variant transition-colors" onClick={() => handleToggle('emailNotifs')}>
                            <div className="flex items-center gap-5">
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-surface-container/50">
                                   <span className="material-symbols-outlined text-secondary">alternate_email</span>
                                </div>
                                <div>
                                    <p className="font-bold text-on-surface">Email Notifications</p>
                                    <p className="text-xs text-on-surface-variant mt-0.5">Weekly summaries and achievement reports.</p>
                                </div>
                            </div>
                            <div className={`w-14 h-8 rounded-full relative p-1 transition-colors shadow-inner flex items-center ${preferences.emailNotifs ? 'bg-secondary' : 'bg-surface-container-high'}`}>
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${preferences.emailNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-5 bg-surface border border-surface-container rounded-2xl cursor-pointer hover:border-surface-variant transition-colors" onClick={() => handleToggle('inAppAlerts')}>
                            <div className="flex items-center gap-5">
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-surface-container/50">
                                   <span className="material-symbols-outlined text-secondary">app_registration</span>
                                </div>
                                <div>
                                    <p className="font-bold text-on-surface">In-App Alerts</p>
                                    <p className="text-xs text-on-surface-variant mt-0.5">Real-time feedback during learning sessions.</p>
                                </div>
                            </div>
                            <div className={`w-14 h-8 rounded-full relative p-1 transition-colors shadow-inner flex items-center ${preferences.inAppAlerts ? 'bg-secondary' : 'bg-surface-container-high'}`}>
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${preferences.inAppAlerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-5 bg-surface border border-surface-container rounded-2xl cursor-pointer hover:border-surface-variant transition-colors" onClick={() => handleToggle('pushNotifs')}>
                            <div className="flex items-center gap-5">
                                <div className="p-2 bg-white rounded-xl shadow-sm border border-surface-container/50 opacity-60">
                                   <span className="material-symbols-outlined text-on-surface-variant">phone_iphone</span>
                                </div>
                                <div className="opacity-80">
                                    <p className="font-bold text-on-surface">Push Notifications</p>
                                    <p className="text-xs text-on-surface-variant mt-0.5">Daily reminders and mission updates on mobile.</p>
                                </div>
                            </div>
                            <div className={`w-14 h-8 rounded-full relative p-1 transition-colors shadow-inner flex items-center ${preferences.pushNotifs ? 'bg-secondary' : 'bg-surface-container-high'}`}>
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${preferences.pushNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Right Column: Appearance & Gamification */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Appearance */}
                <section className="bg-white rounded-2xl p-6 border border-surface-container shadow-sm">
                    <h3 className="text-lg font-black font-headline mb-6 flex items-center gap-2 text-on-surface border-b border-surface-container/50 pb-4">
                        <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span> Appearance
                    </h3>
                    
                    <div className="space-y-5">
                        <div className="flex items-center justify-between cursor-pointer group" onClick={() => handleToggle('darkMode')}>
                            <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Dark Mode</span>
                            <div className={`w-12 h-6 rounded-full relative p-1 transition-colors flex items-center shadow-inner ${preferences.darkMode ? 'bg-primary' : 'bg-surface-container-high'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between cursor-pointer group" onClick={() => handleToggle('reducedMotion')}>
                            <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Reduced Motion</span>
                            <div className={`w-12 h-6 rounded-full relative p-1 transition-colors flex items-center shadow-inner ${preferences.reducedMotion ? 'bg-primary' : 'bg-surface-container-high'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.reducedMotion ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        
                        <div className="pt-5 border-t border-surface-container/50">
                            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">Interface Density</p>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2.5 text-xs font-bold bg-primary text-on-primary rounded-xl shadow-sm">Comfortable</button>
                                <button className="flex-1 py-2.5 text-xs font-bold bg-surface hover:bg-surface-container border border-surface-container text-on-surface-variant rounded-xl transition-colors">Compact</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gamification Options */}
                <section className="bg-white rounded-2xl p-6 border border-surface-container shadow-sm border-t-4 border-t-tertiary">
                    <h3 className="text-lg font-black font-headline mb-6 flex items-center gap-2 text-on-surface border-b border-surface-container/50 pb-4">
                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span> Learning Experience
                    </h3>
                    
                    <div className="space-y-6">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <input type="checkbox" checked={preferences.xpPopups} onChange={() => handleToggle('xpPopups')} className="mt-1 w-5 h-5 rounded border-surface-variant text-primary focus:ring-primary accent-primary cursor-pointer" />
                            <div>
                                <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">XP Level-Up Popups</p>
                                <p className="text-[11px] text-on-surface-variant mt-0.5">Show celebratory animations when earning XP.</p>
                            </div>
                        </label>
                        
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <input type="checkbox" checked={preferences.streakReminders} onChange={() => handleToggle('streakReminders')} className="mt-1 w-5 h-5 rounded border-surface-variant text-primary focus:ring-primary accent-primary cursor-pointer" />
                            <div>
                                <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Streak Reminders</p>
                                <p className="text-[11px] text-on-surface-variant mt-0.5">Alert me if my daily streak is at risk.</p>
                            </div>
                        </label>
                        
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <input type="checkbox" checked={preferences.publicLeaderboard} onChange={() => handleToggle('publicLeaderboard')} className="mt-1 w-5 h-5 rounded border-surface-variant text-primary focus:ring-primary accent-primary cursor-pointer" />
                            <div>
                                <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Public Leaderboard</p>
                                <p className="text-[11px] text-on-surface-variant mt-0.5">Show my name on global ranking charts.</p>
                            </div>
                        </label>
                        
                        <div className="p-4 bg-tertiary/10 border border-tertiary/20 rounded-xl mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                                <span className="text-[10px] font-black text-tertiary uppercase tracking-widest">PRO TIP</span>
                            </div>
                            <p className="text-xs text-tertiary/80 leading-relaxed font-semibold">Keeping streak reminders ON increases daily engagement by 40% on average!</p>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-surface rounded-2xl p-6 border border-error/20">
                    <h3 className="text-sm font-black text-error mb-4 uppercase tracking-widest font-headline">Danger Zone</h3>
                    <button className="w-full py-4 px-4 bg-error/5 border border-error/30 text-error text-xs font-bold rounded-xl hover:bg-error/10 hover:border-error/50 transition-colors shadow-sm active:scale-95">
                        Deactivate Account
                    </button>
                </section>

            </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="mt-12 pt-8 border-t border-surface-container flex flex-col-reverse sm:flex-row justify-end gap-4 relative z-10 bg-surface">
            <button 
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 font-bold text-on-surface-variant border border-surface-container hover:bg-surface-bright rounded-full transition-all active:scale-95 text-sm"
            >
                Return to Dashboard
            </button>
            <button 
              disabled={saving}
              onClick={handleSave}
              className={`px-10 py-4 bg-primary text-on-primary font-bold rounded-full shadow-premium hover:shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm tracking-wide flex items-center gap-2 ${saving ? 'opacity-70 pointer-events-none' : ''}`}
            >
                {saving && <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>}
                {saving ? "Saving Changes..." : "Save Preferences"}
            </button>
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-t border-surface-container/50 flex justify-around items-center h-16 px-4 z-50 rounded-t-[2rem]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold font-headline">Home</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">local_library</span>
          <span className="text-[10px] font-bold font-headline">Library</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1 text-primary relative -top-2">
          <span className="material-symbols-outlined bg-primary/10 p-2 rounded-full border border-primary/20">settings</span>
          <span className="text-[10px] font-bold font-headline">Settings</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold font-headline">Profile</span>
        </Link>
      </nav>

    </div>
  );
}
