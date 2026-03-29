"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Check for Admin Role in public.admin_roles
        const { data: roleData, error: roleError } = await supabase
          .from("admin_roles")
          .select("role")
          .eq("user_id", authData.user.id)
          .single();

        if (roleError || !roleData) {
          // If not an admin, sign them back out immediately
          await supabase.auth.signOut();
          throw new Error("Access Denied: Your identity does not possess administrative clearances.");
        }

        // 3. Success -> Proceed to Command Center
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Authorization sequence failed.");
      // Auto-clear error after 5s
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-surface-on min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-primary-on relative overflow-hidden">
      
      {/* Subtle Background Elements for Intellectual Playground Aesthetic */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 left-1/4 w-48 h-48 bg-tertiary/5 rounded-full blur-2xl"></div>
      </div>

      {/* Main Login Container */}
      <main className="relative z-10 w-full max-w-md">
        
        {/* Brand Identity Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-5 shadow-premium shadow-primary/20">
            <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          <h1 className="text-3xl font-black font-headline tracking-tight text-surface-on mb-2">LearnLoop Admin</h1>
          <p className="text-surface-variant font-medium text-sm tracking-wide">Secure Portal Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 border border-surface-container shadow-sm">
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <span className="material-symbols-outlined text-primary">shield_person</span>
              <span className="text-sm font-bold text-primary">High-Security Administrative Session</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Admin ID/Email */}
            <div className="space-y-2">
              <label htmlFor="admin-id" className="text-xs font-black uppercase tracking-widest text-surface-variant ml-1 font-headline">Admin Identity</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-surface-variant group-focus-within:text-primary transition-colors z-10">badge</span>
                <input 
                  id="admin-id" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.app" 
                  className="w-full pl-12 pr-4 py-4 bg-surface border border-surface-container rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition-all text-sm font-semibold text-surface-on outline-none placeholder:font-medium placeholder:text-surface-variant"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-surface-variant font-headline">Access Key</label>
                <Link href="/forgot-password" title="Recover Access" className="text-[10px] font-black text-primary hover:brightness-110 uppercase tracking-wider">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-surface-variant group-focus-within:text-primary transition-colors z-10">key</span>
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-surface border border-surface-container rounded-xl focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition-all text-sm font-semibold text-surface-on outline-none placeholder:font-medium placeholder:text-surface-variant tracking-wider"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-variant hover:text-surface-on transition-colors z-10 outline-none"
                >
                  <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-error text-xl">gpp_maybe</span>
                    <p className="text-error text-[10px] font-black uppercase leading-tight tracking-wider">{error}</p>
                </div>
            )}

            {/* CTA Button */}
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-primary text-white font-black py-4 rounded-full shadow-md shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group outline-none disabled:opacity-50"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-xl">autorenew</span>
              ) : (
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              )}
              {loading ? "Authenticating..." : "Secure Login"}
            </button>
          </form>
        </div>

        {/* Secondary Actions & Status */}
        <footer className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <Link href="#" className="flex items-center gap-2 text-xs font-bold text-surface-variant hover:text-primary transition-colors group">
              <span className="material-symbols-outlined text-base group-hover:animate-pulse">monitor_heart</span>
              System Status
            </Link>
            <div className="w-1.5 h-1.5 rounded-full bg-surface-container-high"></div>
            <Link href="#" className="flex items-center gap-2 text-xs font-bold text-surface-variant hover:text-error transition-colors group">
              <span className="material-symbols-outlined text-base group-hover:animate-bounce">emergency_home</span>
              Emergency Support
            </Link>
          </div>
          
          <div className="flex items-center gap-2 bg-surface border border-surface-container px-4 py-2 rounded-full shadow-inner">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(111,89,0,0.6)]"></div>
            <span className="text-[10px] font-black text-surface-on uppercase tracking-widest font-headline">Global Auth Node 04: Active</span>
          </div>
        </footer>
      </main>

      {/* Floating Security Tag */}
      <div className="fixed bottom-8 right-8 hidden lg:flex items-center gap-4 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-premium border border-surface-container z-20">
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
          <span className="material-symbols-outlined">encrypted</span>
        </div>
        <div>
          <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1 font-headline">End-to-End Encryption</p>
          <p className="text-xs font-bold text-surface-on">AES-256 Session Layer Active</p>
        </div>
      </div>

    </div>
  );
}
