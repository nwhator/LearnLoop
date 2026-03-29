"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      if (data.session) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Credential verification failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-surface-on flex flex-col min-h-screen">
      {/* Auth Layout Wrapper: Split Screen Aesthetic */}
      <main className="flex-1 flex flex-col md:flex-row">
        
        {/* Branding & Visual Side (Hidden on Mobile for focus) */}
        <section className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-[120px] opacity-20 -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full blur-[100px] opacity-10 -ml-40 -mb-40" />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 bg-primary-on rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="text-2xl font-black font-headline text-primary-on tracking-tighter">LearnLoop</span>
            </Link>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-headline text-primary-on leading-tight tracking-tight max-w-lg">
              Level up your <span className="text-primary-container">intellect.</span>
            </h1>
            <p className="mt-6 text-xl text-primary-on/80 font-medium max-w-md">
              Join over 50,000 learners mastering skills through gamified missions and expert-led pathways.
            </p>
          </div>
          
          <div className="relative z-10 mt-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-sm shadow-glass">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVjBzceqz5HGvbi223Fxv8tXOfAOY4tal8vbWSgBOOgmjiDa9wmU0l2UQQ77-kWGvLHgtjjbIY9jWjVGejSsCZdeMsC8O7-cqgXfua9MKeKPhRSEU_jmLm-Zy9GHzhDQVkJRKJs7cs3mjOGUbOGymp_CGHJ0vvPPdUej2zgwwwAeYxANa3kW9MOIWX4mLjsHSToSDWGn4-DBNjqazLaov8L5Fosc3_JXaOqgJvHVmTF5Bu3VbAgLz-Fu6gXOLikTCxr65sYin_OfA" 
                  alt="User Profile" 
                  className="w-12 h-12 rounded-full border-2 border-primary-container object-cover" 
                />
                <div>
                  <p className="text-primary-on font-bold font-headline">Sarah Chen</p>
                  <p className="text-primary-on/60 text-sm">Product Designer</p>
                </div>
              </div>
              <p className="text-primary-on/90 italic text-sm leading-relaxed">
                "The Mission-based learning keeps me coming back every day. It's the first platform that actually makes upskilling feel like a game."
              </p>
            </div>
          </div>
        </section>

        {/* Form Side */}
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-16 bg-surface">
          <div className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2 mb-12 justify-center mt-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-on text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <span className="text-xl font-black font-headline text-primary tracking-tighter uppercase">LearnLoop</span>
              </Link>
            </div>
            
            {/* Auth Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold font-headline text-surface-on tracking-tight mb-2">Welcome Back</h2>
              <p className="text-surface-variant font-medium">Don't have an account? <Link href="/register" className="text-primary hover:underline underline-offset-4 font-bold">Sign up here</Link></p>
            </div>
            
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-surface-container hover:bg-surface-bright shadow-sm hover:shadow transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-semibold text-surface-on">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-surface-container hover:bg-surface-bright shadow-sm hover:shadow transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.47-1.2.02-2.13-.39-3.13-.39s-1.95.42-3.04.39c-1.14-.03-2.26-.54-3.27-1.53C2.33 18.2 1.4 15.2 1.4 12.3c0-2.4 1-4.2 2.6-5.1 1.1-.7 2.4-1.1 3.7-1.1 1.2 0 2.2.4 3 .8.7.4 1.5.8 2.3.8.7 0 1.6-.4 2.5-.9 1.1-.6 2.4-.9 3.6-.9 1.1 0 2.2.3 3.2.9.8.5 1.4 1.2 1.9 2-2.3 1-3.4 3.1-3.4 5.2 0 2.4 1.3 4.3 3.3 5.3-.5 1.1-1.2 2.1-2 3zM14.2 2.1c0 1.2-.5 2.5-1.3 3.3-.9 1-2.1 1.6-3.3 1.5-.1-1.3.5-2.6 1.3-3.4.9-1.1 2.2-1.7 3.3-1.4z" />
                </svg>
                <span className="text-sm font-semibold text-surface-on">Apple</span>
              </button>
            </div>
            
            {/* Separator */}
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-surface-container"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-surface-variant uppercase tracking-widest">Or login with email</span>
              <div className="flex-grow border-t border-surface-container"></div>
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-surface-variant uppercase tracking-wider mb-2 ml-1" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="hello@example.com" 
                  className="w-full px-5 py-4 rounded-2xl bg-surface border border-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-surface-on placeholder:text-surface-variant/70 font-medium shadow-inner" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                   <label className="block text-xs font-bold text-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
                   <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
                </div>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••" 
                  className="w-full px-5 py-4 rounded-2xl bg-surface border border-surface-container focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-surface-on placeholder:text-surface-variant/70 font-medium shadow-inner" 
                />
              </div>

              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-error text-xl">error</span>
                  <p className="text-error text-xs font-bold leading-none">{error}</p>
                </div>
              )}
              
              <div className="pt-4 mt-8 relative">
                {/* Gamified Hint Badge */}
                <div className="absolute -right-4 -top-4 flex items-center gap-1.5 bg-secondary-container text-secondary-on px-3 py-1.5 rounded-full shadow-sm animate-bounce z-10 border border-secondary-container/50">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="text-[10px] font-black uppercase tracking-tighter">Enter the Arena</span>
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-primary text-primary-on py-4 px-8 rounded-full font-bold text-lg shadow-premium hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-3"
                >
                  {loading && <span className="material-symbols-outlined animate-spin text-xl">autorenew</span>}
                  {loading ? "Verifying..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Social Proof / Gamified Hint */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-surface-container shadow-sm">
                <div className="flex -space-x-2">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuASUs2oIouP2fTHUZBZHfGrER-0zSIcTp5tJVvW1r5ALetiTo1bd-q7FE1hdlYZEXllMyLpZAYScEDPj2jAp6Z2knMGmVkQA_ghzyAl0IzVVEY6h-QPucKd-eViZOfktujfsnIZBNHwmIBLOYROib2Xlmw-VmG9s7W29kNYWZGgEgtZi0EtFSRVmpQkr5cGtYWXNiTsnpVrD9FfFsqOSDUhBGhF-nmURYcBKrYVhd1CHjxOdZhQazGyfnkr50tyShOrulFZkkabgcs" alt="User" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmw0MQSqkAFAP2Xu06br-zFGZrGjbxcWoxqo7WeLigCmoK_KtRo16qswRerEyZVkzxPRWyxsy7jtS0Os4YHHNA0jt5JwHM9iTMscChr87QxFbHzJiW_cc_nefptbr-UH2zIIKn_TsdI6R1-VKrsuhIgrmvznU3AFDs-N3dq7-7Ev-r9_XuZDgimmUMVkQimKjiP-_2mEOYCa_VOlqOR-L7pKwCGw5oq3nHnbQN1rCeh8uUWt4x6TIgTkbk_8_x7A7cDForQsu0iKk" alt="User" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-container flex items-center justify-center">
                    <span className="text-[8px] font-bold text-surface-variant">+</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-surface-variant">Join 124 others online now</span>
              </div>
            </div>

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-surface-variant leading-relaxed">
              By joining LearnLoop, you agree to our <Link href="/terms" className="font-bold text-surface-on hover:text-primary underline decoration-surface-variant/50">Terms of Service</Link> and <Link href="/privacy" className="font-bold text-surface-on hover:text-primary underline decoration-surface-variant/50">Privacy Policy</Link>.
            </p>
          </div>
        </section>
      </main>

      {/* Simple Footer for Auth Pages */}
      <footer className="bg-surface py-8 border-t border-surface-container shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-surface-variant">&copy; {new Date().getFullYear()} LearnLoop Systems. Elevate your intellect.</p>
          <div className="flex gap-6">
            <Link href="/help" className="text-xs font-bold text-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Help Center</Link>
            <Link href="/privacy" className="text-xs font-bold text-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Privacy</Link>
            <Link href="/careers" className="text-xs font-bold text-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Careers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
