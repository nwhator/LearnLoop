"use client";

import Link from "next/link";
import PublicHeader from "@/app/components/PublicHeader";
import PublicFooter from "@/app/components/PublicFooter";

export default function LandingPage() {
  return (
    <div className="bg-surface text-surface-on min-h-screen flex flex-col antialiased">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-48 overflow-hidden px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--colors-primary-container),transparent_40%),radial-gradient(circle_at_bottom_left,var(--colors-secondary-container),transparent_40%)] opacity-30" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-3 bg-secondary-container/20 text-secondary-on border border-secondary-container/30 px-6 py-2 rounded-full text-[10px] font-black mb-10 uppercase tracking-[0.2em] backdrop-blur-md shadow-sm">
                 <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                 Next-Gen Intellectual Engine
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-headline text-surface-on tracking-tighter leading-[0.9] mb-8">
                 Master the <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary italic pr-2">LearnLoop</span>
              </h1>
              <p className="max-w-xl text-xl text-surface-variant mb-12 leading-relaxed font-medium">
                 Transform complex notes, infinite PDFs, and web links into a personalized, gamified mastery journey powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                 <Link href="/signup" className="w-full sm:w-auto bg-primary text-primary-on px-12 py-5 rounded-full text-lg font-black shadow-premium hover:shadow-primary/50 transition-all hover:-translate-y-1 text-center">
                    Start Your First Mission
                 </Link>
                 <button className="w-full sm:w-auto flex items-center justify-center gap-3 text-surface-on font-black text-lg hover:text-primary transition-all group">
                    <span className="material-symbols-outlined bg-white text-surface-on shadow-lg p-4 rounded-full group-hover:scale-110 transition-transform">play_arrow</span>
                    Watch the Experience
                 </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 to-secondary/10 blur-3xl rounded-full opacity-50 pointer-events-none" />
              <img 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjvxTDpmOyuY2SjRAiQnxt-ngT71VnrJWkicRB4PclZfZ1RZvH7Qjpf1XbFV1ns0wz27xOAYfijcT9mqmh57ifC9SraiYacKyo__lTwsJFdB3JyoR50p4iKBAprA8mnWPyu-pYmH46XwHQ5SVILlq2qH1IICFC2WsLQdZv14Gv74a0ylY3joXUj5RxGm1liOSoCGiO1svzlxiTmfmDT5GoW62tH7TLdu19aaKuF4ywnvj1POr43uxGK6TD54GS1yrtmMJw2qa_qe8" 
                 alt="AI Brain Transformation" 
                 className="w-full h-auto drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal rounded-3xl relative z-10"
              />
              
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl hidden md:block border border-surface-container animate-bounce-subtle z-20">
                 <div className="flex items-center gap-5 mb-5">
                    <div className="p-4 bg-primary-container/20 rounded-2xl border border-primary-container/30">
                       <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                    </div>
                    <div>
                       <p className="text-[10px] text-surface-variant font-black uppercase tracking-[0.2em] mb-1">Cognitive Load</p>
                       <p className="text-2xl font-black text-surface-on">-45% Reduced</p>
                    </div>
                 </div>
                 <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div className="w-1/2 h-full bg-primary shadow-[0_0_10px_rgba(0,123,255,0.5)]" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-32 px-8 bg-surface-container-low relative">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-surface to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-6xl font-black font-headline mb-8 tracking-tighter">The Lab in Your Pocket</h2>
              <p className="text-surface-variant max-w-2xl mx-auto text-xl font-medium leading-relaxed">Your study materials shouldn't just sit there. They should challenge you.</p>
            </div>
            <div className="relative max-w-6xl mx-auto group">
              <div className="absolute -inset-10 bg-gradient-to-r from-primary-container to-secondary-container rounded-[4rem] blur-[80px] opacity-40 group-hover:opacity-70 transition-all duration-1000" />
              <div className="relative bg-white p-5 rounded-[3.5rem] shadow-2xl border-4 border-white/50 transform transition-all duration-1000 hover:scale-[1.01] overflow-hidden">
                 <img 
                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3zr9xAUIRlb9cjP4eXgVCFIzXhh07QGOYtZYJmobdl4NkSESy0MLpJU_VYeYZOK098JiGae2ikjnm6jvu9VlH1eMfQlbv4v3g83OoWZ_bSwZZ_td2vFFKPnIBinSgAqciuwYTfm8SMzfOtRuAHuqxLaVFjLZN2pCUKYZuRss3mrh5jFCHiO9XHUNNq4oyVdDBSr2n0v1wKoN9swAPbGx0lXXia-mdP-uleKbfiSAl3K5N-MwBew-1RgCuziqPpeI3lkwoQJ2tW4I" 
                   alt="Dashboard Showcase" 
                   className="w-full rounded-[2.5rem] shadow-inner" 
                 />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-8 py-32">
          <div className="bg-primary rounded-[4rem] py-32 px-12 text-center text-primary-on relative overflow-hidden shadow-premium group">
            <h2 className="text-5xl md:text-7xl font-black font-headline mb-10 tracking-tighter relative z-10 leading-tight">Your Intellect, <br /><span className="italic font-serif opacity-80">Unleashed.</span></h2>
            <p className="text-primary-on/80 mb-14 max-w-2xl mx-auto text-xl font-medium leading-relaxed relative z-10">Join 50,000+ learners today. The first 100 XP are on us.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
               <Link href="/signup" className="bg-white text-primary px-16 py-6 rounded-full text-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-center border-4 border-white">
                  Get Started Free
               </Link>
               <Link href="/premium" className="bg-transparent text-white border-2 border-white/30 px-16 py-6 rounded-full text-xl font-black hover:bg-white/10 transition-all w-full sm:w-auto text-center backdrop-blur-md">
                  View Premium
               </Link>
            </div>
            
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center -z-0">
               <span className="material-symbols-outlined text-[600px] group-hover:rotate-45 transition-transform duration-[4000ms] ease-out">language</span>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
