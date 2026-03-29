"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-surface-container/50">
        <div className="flex justify-between items-center px-6 md:px-12 h-20 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tighter">LearnLoop</Link>
          
          <div className="hidden md:flex items-center gap-8 font-headline font-bold text-sm tracking-tight">
            <Link href="/dashboard" className="text-surface-variant hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/missions" className="text-surface-variant hover:text-primary transition-colors">Missions</Link>
            <Link href="/leaderboard" className="text-surface-variant hover:text-primary transition-colors">Leaderboard</Link>
            <Link href="/subscription" className="text-primary border-b-2 border-primary pb-1">Pricing</Link>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/notifications" className="material-symbols-outlined p-2 text-surface-variant hover:bg-surface-container rounded-full transition-all active:scale-95">notifications</Link>
              <Link href="/missions" className="material-symbols-outlined p-2 text-orange-500 hover:bg-surface-container rounded-full transition-all active:scale-95" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</Link>
            </div>
            <Link href="/dashboard" className="bg-primary text-primary-on px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md hover:brightness-110 active:scale-95 transition-all">
                Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20">
        
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-tertiary/10 text-tertiary text-[11px] font-black tracking-widest uppercase mb-6 shadow-sm border border-tertiary/20">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                Premium Membership
            </span>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-surface-on mb-6 tracking-tight leading-tight">
                Unlock Your Full <br className="hidden md:block"/> <span className="text-primary italic font-serif opacity-90 pr-2">Intellectual Potential</span>
            </h1>
            <p className="text-surface-variant text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Join 50,000+ lifelong learners who have accelerated their growth with AI-powered personalized missions and deep analytics.
            </p>
        </section>

        {/* Pricing Toggle & Cards */}
        <section className="mb-24">
            <div className="flex flex-col items-center">
                
                {/* Pricing Toggle */}
                <div className="bg-white p-1.5 rounded-full flex items-center mb-16 border border-surface-container shadow-sm p-1">
                    <button 
                        onClick={() => setIsYearly(false)}
                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${!isYearly ? 'bg-surface border border-surface-container shadow-sm text-primary' : 'text-surface-variant hover:text-surface-on'}`}
                    >
                        Monthly
                    </button>
                    <button 
                        onClick={() => setIsYearly(true)}
                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isYearly ? 'bg-surface border border-surface-container shadow-sm text-primary' : 'text-surface-variant hover:text-surface-on'}`}
                    >
                        Yearly <span className="text-secondary bg-secondary/10 px-2 rounded-md font-black text-[10px] py-0.5">-25%</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center">
                    
                    {/* Standard Plan */}
                    <div className="bg-white p-10 rounded-[2rem] flex flex-col justify-between border border-surface-container h-[95%] shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="font-headline text-2xl font-black mb-2 text-surface-on">Explorer</h3>
                            <p className="text-surface-variant text-sm mb-8 font-medium">Master the basics of any subject.</p>
                            
                            <div className="flex items-baseline mb-10">
                                <span className="text-5xl font-black text-surface-on">$0</span>
                                <span className="text-surface-variant ml-2 font-bold font-headline">/ month</span>
                            </div>
                            
                            <ul className="space-y-5 mb-10">
                                <li className="flex items-center gap-4 text-sm font-bold text-surface-on">
                                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    3 AI generations per day
                                </li>
                                <li className="flex items-center gap-4 text-sm font-bold text-surface-on">
                                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Basic leaderboard access
                                </li>
                                <li className="flex items-center gap-4 text-sm font-bold text-surface-on">
                                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Standard community support
                                </li>
                                <li className="flex items-center gap-4 text-sm font-bold text-surface-variant opacity-60 line-through">
                                    <span className="material-symbols-outlined text-surface-variant text-xl">block</span>
                                    Ad-free experience
                                </li>
                            </ul>
                        </div>
                        <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 active:scale-95 transition-all outline-none">
                            Current Plan
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-br from-primary to-secondary p-[3px] rounded-[2rem] shadow-premium md:scale-105 relative z-10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-tertiary to-yellow-500 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg whitespace-nowrap border border-white/20">
                            Most Popular
                        </div>
                        
                        <div className="bg-white p-10 rounded-[calc(2rem-3px)] h-full flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            
                            <div className="relative z-10">
                                <h3 className="font-headline text-3xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Polymath Premium</h3>
                                <p className="text-surface-variant text-sm mb-8 font-medium">For the serious intellectual athlete.</p>
                                
                                <div className="flex items-baseline mb-10">
                                    <span className="text-5xl font-black text-surface-on">${isYearly ? '7.49' : '9.99'}</span>
                                    <span className="text-surface-variant ml-2 font-bold font-headline">/ month</span>
                                </div>
                                {isYearly && <p className="text-xs text-secondary font-bold -mt-8 mb-8">Billed annually at $89.88</p>}
                                
                                <ul className="space-y-5 mb-10">
                                    <li className="flex items-center gap-4 text-sm font-black text-surface-on group hover:-translate-y-0.5 transition-transform">
                                        <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        </div>
                                        Unlimited AI generations
                                    </li>
                                    <li className="flex items-center gap-4 text-sm font-black text-surface-on group hover:-translate-y-0.5 transition-transform">
                                        <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                                        </div>
                                        Unlimited daily missions
                                    </li>
                                    <li className="flex items-center gap-4 text-sm font-black text-surface-on group hover:-translate-y-0.5 transition-transform">
                                        <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                                        </div>
                                        Advanced analytics
                                    </li>
                                    <li className="flex items-center gap-4 text-sm font-black text-surface-on group hover:-translate-y-0.5 transition-transform">
                                        <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>block</span>
                                        </div>
                                        Ad-free experience
                                    </li>
                                    <li className="flex items-center gap-4 text-sm font-black text-surface-on group hover:-translate-y-0.5 transition-transform">
                                        <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                                        </div>
                                        Priority concierge support
                                    </li>
                                </ul>
                            </div>
                            
                            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-black text-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-all active:scale-95 relative z-10 outline-none border border-white/20">
                                Go Premium
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Bento Grid */}
        <section className="mb-24">
            <h2 className="font-headline text-3xl font-black text-center mb-12 text-surface-on tracking-tight">The Premium Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Large Feature */}
                <div className="md:col-span-2 bg-surface border border-surface-container p-10 rounded-[2rem] relative overflow-hidden flex flex-col justify-end min-h-[400px] shadow-sm group hover:border-primary/30 transition-colors">
                    <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                    <span className="material-symbols-outlined absolute top-10 right-10 text-[200px] text-primary/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">psychology</span>
                    
                    <div className="relative z-10 w-full md:w-2/3">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
                            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                        </div>
                        <h4 className="text-3xl font-black font-headline mb-4 text-surface-on tracking-tight">Unlimited AI Generations</h4>
                        <p className="text-surface-variant font-medium text-lg leading-relaxed">Our most powerful models are at your fingertips. Ask anything, anytime, and get deep contextual learning paths instantly.</p>
                    </div>
                </div>
                
                {/* Small Feature 1 */}
                <div className="bg-white border border-surface-container p-8 rounded-[2rem] flex flex-col justify-between shadow-sm group hover:border-secondary/30 transition-colors min-h-[400px]">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-inner group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
                    </div>
                    <div className="mt-8">
                        <h4 className="text-2xl font-black font-headline mb-3 text-surface-on">Advanced Analytics</h4>
                        <p className="text-surface-variant font-medium leading-relaxed">Visualize your knowledge retention and competitive standing across 50+ dimensions.</p>
                    </div>
                </div>
                
                {/* Small Feature 2 */}
                <div className="bg-gradient-to-br from-secondary to-purple-800 p-8 rounded-[2rem] text-white flex flex-col justify-between shadow-premium group min-h-[300px]">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:rotate-12 transition-transform">
                        <span className="material-symbols-outlined text-white text-3xl drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                    </div>
                    <div className="mt-8">
                        <h4 className="text-2xl font-black font-headline mb-3 drop-shadow-sm">Exclusive Badges</h4>
                        <p className="text-white/80 font-medium leading-relaxed">Stand out in the community with Premium-only profile frames and achievement icons.</p>
                    </div>
                </div>
                
                {/* Large Feature 2 */}
                <div className="md:col-span-2 bg-white border border-surface-container p-10 rounded-[2rem] flex flex-col md:flex-row items-center gap-10 shadow-sm group hover:shadow-md transition-shadow min-h-[300px]">
                    <div className="flex-1">
                        <h4 className="text-3xl font-black font-headline mb-4 text-surface-on tracking-tight">No Distractions. Just Learning.</h4>
                        <p className="text-surface-variant mb-8 font-medium text-lg leading-relaxed">Enjoy a completely ad-free environment across all platforms. Focus on what matters: your intellectual growth.</p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-base font-bold text-surface-on">
                                <div className="bg-green-100 p-1 rounded-full text-green-600">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                </div>
                                No Banner Ads
                            </li>
                            <li className="flex items-center gap-3 text-base font-bold text-surface-on">
                                <div className="bg-green-100 p-1 rounded-full text-green-600">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                </div>
                                No Video Interruptions
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-5/12 bg-surface rounded-[2rem] p-6 overflow-hidden rotate-3 shadow-inner border border-surface-container group-hover:-rotate-3 transition-transform duration-500">
                        <div className="h-4 w-full bg-surface-container rounded-full mb-3"></div>
                        <div className="h-4 w-3/4 bg-surface-container rounded-full mb-6"></div>
                        <div className="h-32 w-full bg-surface-variant/30 rounded-xl mb-3 flex items-center justify-center text-surface-variant font-bold">Ad Blocked</div>
                        <div className="h-4 w-1/2 bg-surface-container rounded-full"></div>
                    </div>
                </div>

            </div>
        </section>

        {/* Testimonial */}
        <section className="bg-surface border border-surface-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-sm">
            <span className="material-symbols-outlined text-[120px] text-primary/5 absolute top-4 left-8 pointer-events-none">format_quote</span>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-tertiary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-headline font-black text-surface-on mb-10 leading-tight tracking-tight px-4">
                    "LearnLoop Premium transformed my daily commute into a high-octane learning ritual. The AI-generated missions are scarily accurate to my career goals."
                </p>
                
                <div className="flex items-center justify-center gap-5">
                    <div className="w-16 h-16 rounded-full border-4 border-white bg-surface-container flex items-center justify-center text-xl font-bold font-headline text-primary shadow-md">M</div>
                    <div className="text-left">
                        <div className="font-black font-headline text-surface-on text-lg">Marcus Thorne</div>
                        <div className="text-sm font-bold text-tertiary uppercase tracking-widest mt-0.5">Senior Research Analyst & Premium Member</div>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-container w-full pt-16 mt-20 pb-24 md:pb-12">
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
                <div className="text-2xl font-black text-primary mb-4 font-headline tracking-tighter">LearnLoop</div>
                <p className="font-medium text-surface-variant max-w-xs mb-8 leading-relaxed">Elevate your intellect through AI-powered personalized learning journeys.</p>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary hover:text-white text-surface-variant transition-all cursor-pointer border border-surface-container"><span className="material-symbols-outlined text-lg">public</span></div>
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary hover:text-white text-surface-variant transition-all cursor-pointer border border-surface-container"><span className="material-symbols-outlined text-lg">campaign</span></div>
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary hover:text-white text-surface-variant transition-all cursor-pointer border border-surface-container"><span className="material-symbols-outlined text-lg">mail</span></div>
                </div>
            </div>
            
            <div>
                <h5 className="font-black text-surface-on mb-6 uppercase text-xs tracking-widest font-headline">Platform</h5>
                <ul className="space-y-4 font-medium text-sm">
                    <li><Link href="/dashboard" className="text-surface-variant hover:text-primary transition-colors">Dashboard</Link></li>
                    <li><Link href="/missions" className="text-surface-variant hover:text-primary transition-colors">Missions</Link></li>
                    <li><Link href="/leaderboard" className="text-surface-variant hover:text-primary transition-colors">Leaderboard</Link></li>
                </ul>
            </div>
            
            <div>
                <h5 className="font-black text-surface-on mb-6 uppercase text-xs tracking-widest font-headline">Legal & Support</h5>
                <ul className="space-y-4 font-medium text-sm">
                    <li><Link href="/support" className="text-surface-variant hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/support" className="text-surface-variant hover:text-primary transition-colors">Terms of Service</Link></li>
                    <li><Link href="/support" className="text-surface-variant hover:text-primary transition-colors">Help Center</Link></li>
                </ul>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-medium text-xs text-surface-variant">&copy; {new Date().getFullYear()} LearnLoop Systems. Elevate your intellect.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-surface-variant">
                Made with <span className="material-symbols-outlined text-xs text-error" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> by LearnLoop Team
            </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-t border-surface-container/50 flex justify-around items-center h-16 px-4 z-50 rounded-t-[2rem]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold font-headline">Home</span>
        </Link>
        <Link href="/missions" className="flex flex-col items-center gap-1 text-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">rocket_launch</span>
          <span className="text-[10px] font-bold font-headline">Missions</span>
        </Link>
        <Link href="/subscription" className="flex flex-col items-center gap-1 text-primary relative -top-2">
          <span className="material-symbols-outlined bg-primary/10 p-2 rounded-full border border-primary/20">workspace_premium</span>
          <span className="text-[10px] font-bold font-headline mt-0.5">Premium</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold font-headline">Profile</span>
        </Link>
      </nav>

    </div>
  );
}
