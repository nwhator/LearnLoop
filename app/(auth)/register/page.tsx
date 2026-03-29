"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen selection:bg-primary/10 selection:text-primary">
      {/* Auth Layout Wrapper */}
      <main className="flex-1 flex flex-col md:flex-row min-h-screen">
        
        {/* Branding & Visual Side (Legacy LearnLoop Split Aesthetic) */}
        <section className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] opacity-20 -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] opacity-10 -ml-40 -mb-40" />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity w-fit group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-2xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="text-3xl font-black font-headline text-white tracking-tighter">LearnLoop</span>
            </Link>
            
            <h1 className="text-5xl lg:text-7xl font-black font-headline text-white leading-[0.95] tracking-tighter max-w-lg mb-8">
              Join the <br /> <span className="italic font-normal opacity-90 text-surface-lowest">Intellectual</span> <br /> Playground.
            </h1>
            <p className="text-xl text-white/80 font-medium max-w-md leading-relaxed">
              Master any topic through gamified missions, AI-personalized pathways, and a global community of scholars.
            </p>
          </div>
          
          <div className="relative z-10 mt-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 max-w-sm shadow-premium">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVjBzceqz5HGvbi223Fxv8tXOfAOY4tal8vbWSgBOOgmjiDa9wmU0l2UQQ77-kWGvLHgtjjbIY9jWjVGejSsCZdeMsC8O7-cqgXfua9MKeKPhRSEU_jmLm-Zy9GHzhDQVkJRKJs7cs3mjOGUbOGymp_CGHJ0vvPPdUej2zgwwwAeYxANa3kW9MOIWX4mLjsHSToSDWGn4-DBNjqazLaov8L5Fosc3_JXaOqgJvHVmTF5Bu3VbAgLz-Fu6gXOLikTCxr65sYin_OfA" 
                  alt="Sarah Chen" 
                  className="w-14 h-14 rounded-full border-4 border-white/20 object-cover" 
                />
                <div>
                  <p className="text-white font-black font-headline text-lg tracking-tight">Sarah Chen</p>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest leading-none">Senior Scholar</p>
                </div>
              </div>
              <p className="text-white/90 italic text-sm leading-relaxed font-medium">
                "The Mission-based learning keeps me coming back every day. It's the first platform that actually makes upskilling feel like a game."
              </p>
            </div>
          </div>
        </section>

        {/* Form Side */}
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-20 bg-surface relative overflow-hidden">
          {/* Abstract background for form side */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -z-10" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-3 mb-12 justify-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <span className="text-2xl font-black font-headline text-primary tracking-tighter">LearnLoop</span>
              </Link>
            </div>
            
            {/* Auth Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-black font-headline text-on-surface tracking-tighter leading-none mb-3">Create Account</h2>
              <p className="text-on-surface-variant font-medium">Already have an account? <Link href="/login" className="text-primary hover:underline underline-offset-4 font-black">Login here</Link></p>
            </div>
            
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <button className="group flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white border border-surface-container hover:bg-surface-lowest shadow-sm hover:shadow-premium transition-all">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-black text-on-surface">Google</span>
              </button>
              <button className="group flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white border border-surface-container hover:bg-surface-lowest shadow-sm hover:shadow-premium transition-all">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.96.95-2.04 1.44-3.23 1.47-1.2.02-2.13-.39-3.13-.39s-1.95.42-3.04.39c-1.14-.03-2.26-.54-3.27-1.53C2.33 18.2 1.4 15.2 1.4 12.3c0-2.4 1-4.2 2.6-5.1 1.1-.7 2.4-1.1 3.7-1.1 1.2 0 2.2.4 3 .8.7.4 1.5.8 2.3.8.7 0 1.6-.4 2.5-.9 1.1-.6 2.4-.9 3.6-.9 1.1 0 2.2.3 3.2.9.8.5 1.4 1.2 1.9 2-2.3 1-3.4 3.1-3.4 5.2 0 2.4 1.3 4.3 3.3 5.3-.5 1.1-1.2 2.1-2 3zM14.2 2.1c0 1.2-.5 2.5-1.3 3.3-.9 1-2.1 1.6-3.3 1.5-.1-1.3.5-2.6 1.3-3.4.9-1.1 2.2-1.7 3.3-1.4z" />
                </svg>
                <span className="text-sm font-black text-on-surface">Apple</span>
              </button>
            </div>
            
            {/* Separator */}
            <div className="relative flex items-center mb-10">
              <div className="flex-grow border-t border-surface-container"></div>
              <span className="flex-shrink mx-6 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.25em]">Or sign up with email</span>
              <div className="flex-grow border-t border-surface-container"></div>
            </div>
            
            {/* Registration Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2.5 ml-1" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Sarah Chen" 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-surface-container focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all underline-offset-0 outline-none text-on-surface placeholder:text-on-surface-variant/40 font-bold shadow-sm" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2.5 ml-1" htmlFor="email">Email address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="sarah@learnloop.app" 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-surface-container focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all underline-offset-0 outline-none text-on-surface placeholder:text-on-surface-variant/40 font-bold shadow-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2.5 ml-1" htmlFor="password">Create Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="w-full px-6 py-4 rounded-2xl bg-white border border-surface-container focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all underline-offset-0 outline-none text-on-surface placeholder:text-on-surface-variant/40 font-bold shadow-sm" 
                />
              </div>
              
              <div className="pt-6 relative">
                {/* Gamified Hint Badge */}
                <div className="absolute -right-4 -top-6 flex items-center gap-2 bg-secondary-container text-secondary-on px-4 py-2 rounded-full shadow-lg animate-bounce z-10 border border-secondary/20">
                  <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="text-[10px] font-black uppercase tracking-tighter">Level 1 Awaits</span>
                </div>
                <button type="button" className="w-full bg-primary text-white py-5 px-8 rounded-full font-black text-lg shadow-premium hover:scale-[1.02] active:scale-[0.98] transition-all">
                   Join the Loop
                </button>
              </div>
            </form>

            {/* Social Proof */}
            <div className="mt-14 flex justify-center">
              <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-surface-container shadow-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface-container flex items-center justify-center font-black text-[8px]">{i}</div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Join 12k+ other scholars</span>
              </div>
            </div>

            {/* Footer Terms */}
            <p className="mt-10 text-center text-xs text-on-surface-variant leading-relaxed font-medium">
              By joining LearnLoop, you agree to our <Link href="/terms" className="font-black text-on-surface hover:text-primary underline decoration-primary/20">Terms of Service</Link> and <Link href="/privacy" className="font-black text-on-surface hover:text-primary underline decoration-primary/20">Privacy Policy</Link>.
            </p>
          </motion.div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-surface py-10 border-t border-surface-container mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} LearnLoop Systems. Elevate your intellect.</p>
          <div className="flex gap-10">
            <Link href="/help" className="text-xs font-black text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-[0.2em]">Help Center</Link>
            <Link href="/privacy" className="text-xs font-black text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-[0.2em]">Privacy</Link>
            <Link href="/careers" className="text-xs font-black text-on-surface-variant/60 hover:text-primary transition-colors uppercase tracking-[0.2em]">Careers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
