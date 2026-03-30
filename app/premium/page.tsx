"use client";

import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PremiumPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-surface text-on-surface">
                <span className="text-lg font-bold">Loading...</span>
            </div>
        );
    }

    return (
        <div className="bg-surface text-on-surface min-h-screen flex flex-col antialiased">
            <PublicHeader />

            <main className="flex-1">
                {/* Hero Section */}
                {user && (
                    <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center">
                        <h2 className="text-2xl font-black mb-2 text-primary">Welcome, {user.email}!</h2>
                        <p className="text-primary font-bold">You are logged in. (Subscription status coming soon.)</p>
                    </div>
                )}
        <section className="pt-24 pb-32 px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
                <span className="inline-flex items-center gap-2 bg-tertiary-container text-on-tertiary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-tertiary-container/30">
                   <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span> 
                   LearnLoop Pro Access
                </span>
                <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-surface leading-[0.9] mb-10">
                   Choose Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-br from-tertiary to-orange-600 italic">Evolution.</span>
                </h1>
                <p className="text-xl text-on-surface-variant font-bold leading-relaxed max-w-2xl mx-auto">
                   Unlock the full potential of your intellect with advanced AI generation, collaborative Labs, and unlimited mastery missions.
                </p>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center pt-8">
                    <div className="bg-white border-2 border-surface-container rounded-full p-1.5 flex items-center shadow-lg">
                        <button 
                           onClick={() => setBillingCycle("monthly")}
                           className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-surface text-on-surface shadow-inner' : 'text-on-surface-variant hover:text-on-surface'}`}
                        >
                            Monthly
                        </button>
                        <button 
                           onClick={() => setBillingCycle("yearly")}
                           className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all relative ${billingCycle === 'yearly' ? 'bg-tertiary text-white shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
                        >
                            Yearly
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-md animate-bounce">SAVE 30%</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                {/* Basic / Free */}
                <PriceCard 
                    title="Aspirant" 
                    price="Free" 
                    description="Perfect for casual learners discovering the path."
                    features={["3 AI Study Sets / week", "Standard Quiz Modes", "Community Leaderboard"]}
                    cta="Get Started Free"
                    href="/signup"
                />

                {/* Pro / Popular */}
                <PriceCard 
                    title="Scholar"
                    price={billingCycle === 'yearly' ? "$12" : "$16"}
                    period={billingCycle === 'yearly' ? "/mo billed yearly" : "/mo"}
                    description="Advanced tools for the high-impact intellect."
                    featured
                    features={["Unlimited AI Generation", "Priority Lab Access", "Detailed AI Insights", "Weak Area Radar"]}
                    cta="Go Pro Now"
                    href="/signup"
                />

                {/* Team / Enterprise */}
                <PriceCard 
                    title="Architect"
                    price="$49"
                    period="/mo"
                    description="Scale collaborative learning for teams or classrooms."
                    features={["Everything in Scholar", "Shared Group Labs", "Admin Control Hub", "API Level Access"]}
                    cta="Contact Sales"
                    href="/contact"
                />
            </div>
        </section>

        {/* FAQ Style Highlights */}
        <section className="bg-surface-container-low py-32 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-12">
                   <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter leading-tight text-on-surface">
                      Why upgrade to <br /><span className="text-primary italic">LearnLoop Pro?</span>
                   </h2>
                   
                   <div className="space-y-10">
                      <Highlight icon="psychology" title="Infinite Intelligence" description="No caps on daily AI generation. Study everything, anytime with 1.5-Flash Gemini assistance." />
                      <Highlight icon="radar" title="The Radar" description="Our proprietary AI tracks exactly where you slip up, auto-generating recovery missions to fill the gaps." />
                      <Highlight icon="bolt" title="Velocity Mode" description="Access fast-paced recall sessions designed for maximum retention in minimum time." />
                   </div>
                </div>

                <div className="relative">
                   <div className="absolute -inset-10 bg-primary/20 blur-3xl opacity-30 rounded-full pointer-events-none" />
                   <div className="bg-white border-2 border-surface-container rounded-[3rem] p-10 shadow-2xl relative z-10 transform lg:rotate-3">
                      <h4 className="font-headline font-black text-2xl mb-6 text-on-surface">Your Intelligence ROI</h4>
                      <p className="text-on-surface-variant font-bold mb-10 leading-relaxed italic">"Since switching to Learnloop Pro, my memory retention has increased by 78% based on my own analytics. The ROI on $12/mo is insane."</p>
                      
                      <div className="flex items-center gap-5 pt-6 border-t border-surface-container">
                         <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-bold text-lg text-primary">DJ</div>
                         <div>
                            <p className="font-black font-headline text-on-surface">David Jenkins</p>
                            <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest pt-1">Medical Resident • Level 24 Scholar</p>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
        </section>
      </main>

      <PublicFooter />
    </div>
    );
}

function PriceCard({ title, price, period, description, features, cta, href, featured = false }: any) {
  return (
    <div className={`flex flex-col p-10 rounded-[3rem] border transition-all duration-500 overflow-hidden relative shadow-sm group ${featured ? 'bg-on-surface text-surface scale-[1.05] border-transparent shadow-premium' : 'bg-white border-surface-container hover:shadow-xl hover:translate-y-[-8px]'}`}>
        {featured && (
            <div className="absolute top-0 right-0 p-4 pt-6 bg-tertiary text-white text-[10px] font-black uppercase tracking-widest rounded-bl-3xl shadow-lg border border-white/20">
                Most Popular
            </div>
        )}
        
        <div className="flex flex-col gap-8 mb-12">
            <div>
                <h3 className={`font-black font-headline text-2xl tracking-tight ${featured ? 'text-white' : 'text-on-surface'}`}>{title}</h3>
                <p className={`text-sm mt-3 font-medium ${featured ? 'text-surface/70' : 'text-on-surface-variant'}`}>{description}</p>
            </div>
            
            <div className="flex items-end gap-1">
                <span className={`text-6xl font-black font-headline tracking-tighter ${featured ? 'text-white' : 'text-on-surface'}`}>{price}</span>
                <span className={`text-sm font-black uppercase tracking-widest pb-3 mb-1.5 opacity-60`}>{period}</span>
            </div>
        </div>

        <ul className="space-y-5 mb-14 h-full">
            {features.map((f: string) => (
                <li key={f} className="flex items-center gap-4 text-sm font-bold leading-none">
                    <span className={`material-symbols-outlined text-xl ${featured ? 'text-tertiary' : 'text-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {f}
                </li>
            ))}
        </ul>

        <Link 
           href={href} 
           className={`w-full py-5 rounded-full text-center font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-95 shadow-lg ${featured ? 'bg-primary text-white hover:brightness-110' : 'bg-surface text-on-surface border border-surface-container hover:bg-on-surface hover:text-surface shadow-inner'}`}
        >
            {cta}
        </Link>
    </div>
  );
}

function Highlight({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="flex items-start gap-8 group">
       <div className="w-16 h-16 bg-white border border-surface-container rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
       </div>
       <div className="space-y-2">
          <h4 className="text-2xl font-black font-headline text-on-surface group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-on-surface-variant font-medium leading-relaxed italic border-l-2 border-surface-container pl-6 opacity-80">"{description}"</p>
       </div>
    </div>
  );
}
