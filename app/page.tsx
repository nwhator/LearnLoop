"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-surface min-h-screen font-body relative text-on-surface selection:bg-primary/20 selection:text-primary">
      {/* 1. TopNavBar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm h-16' : 'bg-transparent h-20'} flex justify-between items-center px-6 md:px-12 border-b border-surface-container/30`}>
        <div className="flex items-center gap-10 max-w-7xl mx-auto w-full justify-between lg:justify-start">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tighter">LearnLoop</Link>
          <div className="hidden lg:flex gap-8 items-center font-headline font-bold text-sm tracking-tight text-on-surface-variant">
            <Link href="#" className="hover:text-primary transition-colors text-primary border-b-2 border-primary pb-1">Dashboard</Link>
            <Link href="#" className="hover:text-primary transition-colors">Missions</Link>
            <Link href="#" className="hover:text-primary transition-colors">Leaderboard</Link>
            <Link href="#" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 ml-auto">
             <div className="flex items-center gap-4 mr-4 text-on-surface-variant/60">
                <span className="material-symbols-outlined hover:bg-surface-container p-2 rounded-full cursor-pointer transition-all">notifications</span>
                <span className="material-symbols-outlined text-orange-500 hover:bg-surface-container p-2 rounded-full cursor-pointer transition-all">local_fire_department</span>
                <span className="material-symbols-outlined text-primary hover:bg-surface-container p-2 rounded-full cursor-pointer transition-all">stars</span>
             </div>
             <Link href="/login" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors px-4 py-2">Login</Link>
             <Link href="/register" className="bg-primary text-white font-bold px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(74,144,226,0.3)] hover:scale-105 active:scale-95 transition-all text-sm">
                Get Started
             </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-40 pb-48 overflow-hidden px-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(74,144,226,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(132,58,163,0.05),transparent_50%)]"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-secondary/10">
                <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Next-Gen Intellectual Engine
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black font-headline text-on-surface leading-[0.9] tracking-tighter mb-10">
                Elevate Your <br />
                <span className="gradient-text italic font-normal">Genius</span>
              </h1>
              
              <p className="max-w-xl text-lg md:text-xl text-on-surface-variant mb-14 leading-relaxed font-medium">
                LearnLoop transforms complex notes, infinite PDFs, and web links into a personalized, gamified mastery journey powered by cutting-edge AI.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <Link href="/register" className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-full text-lg font-black shadow-[0_20px_50px_rgba(74,144,226,0.3)] hover:shadow-[0_20px_50px_rgba(74,144,226,0.5)] transition-all hover:-translate-y-1 text-center">
                  Start Your First Mission
                </Link>
                <button className="w-full sm:w-auto flex items-center justify-center gap-4 text-on-surface font-black text-lg hover:text-primary transition-all group">
                  <span className="material-symbols-outlined bg-white shadow-xl p-4 rounded-full group-hover:scale-110 transition-transform">play_arrow</span>
                  Watch the Experience
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1 }}
              className="relative"
            >
              <img 
                alt="AI Brain Transformation" 
                className="w-full h-auto drop-shadow-2xl mix-blend-multiply transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjvxTDpmOyuY2SjRAiQnxt-ngT71VnrJWkicRB4PclZfZ1RZvH7Qjpf1XbFV1ns0wz27xOAYfijcT9mqmh57ifC9SraiYacKyo__lTwsJFdB3JyoR50p4iKBAprA8mnWPyu-pYmH46XwHQ5SVILlq2qH1IICFC2WsLQdZv14Gv74a0ylY3joXUj5RxGm1liOSoCGiO1svzlxiTmfmDT5GoW62tH7TLdu19aaKuF4ywnvj1POr43uxGK6TD54GS1yrtmMJw2qa_qe8"
              />
              
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-premium hidden md:block border border-white/50"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <span className="material-symbols-outlined text-primary text-3xl font-black">psychology</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">Cognitive Load</p>
                    <p className="text-2xl font-black text-on-surface">-45% Reduced</p>
                  </div>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden flex shadow-inner">
                  <div className="w-1/2 h-full bg-primary" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Product Showcase */}
        <section className="py-32 px-6 bg-surface-container-low relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-surface to-transparent"></div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 tracking-tighter leading-none">The Lab in Your Pocket</h2>
              <p className="text-on-surface-variant text-lg md:text-xl font-medium">Your study materials shouldn't just sit there. They should challenge you.</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[4rem] blur-[100px] opacity-40 group-hover:opacity-70 transition-opacity"></div>
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white p-5 rounded-[2.5rem] shadow-2xl border border-white/50"
              >
                <img 
                  alt="Dashboard Showcase" 
                  className="w-full h-auto rounded-[1.5rem] shadow-inner" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3zr9xAUIRlb9cjP4eXgVCFIzXhh07QGOYtZYJmobdl4NkSESy0MLpJU_VYeYZOK098JiGae2ikjnm6jvu9VlH1eMfQlbv4v3g83OoWZ_bSwZZ_td2vFFKPnIBinSgAqciuwYTfm8SMzfOtRuAHuqxLaVFjLZN2pCUKYZuRss3mrh5jFCHiO9XHUNNq4oyVdDBSr2n0v1wKoN9swAPbGx0lXXia-mdP-uleKbfiSAl3K5N-MwBew-1RgCuziqPpeI3lkwoQJ2tW4I"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section className="py-32 px-6 overflow-hidden max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Neural Extraction", 
                icon: "auto_awesome", 
                color: "bg-primary/10 text-primary",
                desc: "Our proprietary AI doesn't just summarize. It understands the underlying concepts to generate deep-thinking challenges." 
              },
              { 
                title: "Flow-State Loops", 
                icon: "rocket_launch", 
                color: "bg-secondary/10 text-secondary",
                desc: "Using spaced repetition and variable rewards, we keep you in the zone where learning feels effortless and fun.",
                yShift: "lg:translate-y-8"
              },
              { 
                title: "Competitive Pods", 
                icon: "groups", 
                color: "bg-tertiary/10 text-tertiary",
                desc: "Join high-stakes leagues where you grow alongside peers, pushing each other to reach the top of the leaderboard." 
              }
            ].map((feature, i) => (
              <div key={i} className={`bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-premium transition-all border border-surface-container group ${feature.yShift || ''}`}>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner ${feature.color}`}>
                  <span className="material-symbols-outlined text-4xl font-black" style={{ fontVariationSettings: "'FILL' 1" }}>{feature.icon}</span>
                </div>
                <h3 className="text-3xl font-black font-headline mb-6 tracking-tight text-on-surface">{feature.title}</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Social Proof / Community */}
        <section className="py-44 px-6 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-premium rotate-2">
                <img 
                  alt="Community Learning" 
                  className="w-full h-auto" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxgeI03ORcvzAb1bNe-jfLYBwfrbAdZD7TLyLMj4WgZKjFMeMZEIXJxqXogQl7AXHfZtaeJXrw5vRsVlHhk3Z2cHJ7wn0NaXbZqdcN72PK_YRFOLmoDhO3hJaxEG6MIC3uZrSw0exdSMvUeEAUEfz0OaznIJvUUQGXH4khgHXQoEy0jVTJVRmOCdDwHYwQazA9o4JJXmjskgmXSnz98Wgzo8hCAUcJt1Z5YBycC63fUz-3b1fu8Q_XAFaApjf3tFQ_u8Allh1eFHc"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
              </div>
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-premium flex items-center gap-4 border border-white/50">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-12 h-12 rounded-full border-4 border-white bg-surface-container flex items-center justify-center font-black text-xs">{(j+2) * 10}%</div>
                  ))}
                </div>
                <span className="text-sm font-black text-on-surface uppercase tracking-widest">+12k Active</span>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black font-headline mb-10 leading-none tracking-tighter text-on-surface">Trusted by the <br /> Next Generation of <span className="text-primary italic">Polymaths</span></h2>
              <p className="text-xl text-on-surface-variant mb-12 leading-relaxed font-medium">LearnLoop isn't just a tool; it's a global community of students, engineers, and creatives who believe learning should be the most exciting part of their day.</p>
              
              <div className="space-y-8">
                {[
                  "50k+ Missions Completed Weekly",
                  "Rated 4.9/5 by Medical & Law Students"
                ].map((text, k) => (
                  <div key={k} className="flex items-center gap-6">
                    <div className="p-3 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-lg font-black">check</span>
                    </div>
                    <p className="font-black text-on-surface text-lg">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="bg-primary rounded-[3rem] py-32 px-12 text-center text-white relative overflow-hidden shadow-[0_40px_100px_rgba(74,144,226,0.3)]">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <circle cx="20" cy="20" fill="white" r="10"></circle>
                <circle cx="80" cy="80" fill="white" r="15"></circle>
                <circle cx="50" cy="50" fill="white" r="30"></circle>
              </svg>
            </div>
            <h2 className="text-6xl font-black font-headline mb-10 tracking-tighter leading-none">Your Intellect, <br /> Unleashed.</h2>
            <p className="text-white/90 mb-14 max-w-xl mx-auto text-xl font-medium">Join 50,000+ learners today. The first 100 XP are on us.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link href="/register" className="bg-white text-primary px-16 py-6 rounded-full text-xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto uppercase tracking-widest">
                Get Started Free
              </Link>
              <Link href="#" className="bg-transparent text-white border-2 border-white/40 px-16 py-6 rounded-full text-xl font-black hover:bg-white/10 transition-all w-full sm:w-auto uppercase tracking-widest">
                View Premium
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-surface-container-low border-t border-surface-container w-full pt-32">
        <div className="max-w-7xl mx-auto w-full py-20 px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-black text-on-surface mb-8 tracking-tighter font-headline">LearnLoop</div>
            <p className="text-on-surface-variant text-sm mb-10 max-w-xs leading-relaxed font-medium">The AI-driven learning platform designed for the modern intellect. Fast, fun, and effective.</p>
            <div className="flex gap-6">
              {['public', 'alternate_email', 'share'].map(icon => (
                 <span key={icon} className="material-symbols-outlined text-on-surface-variant/40 hover:text-primary cursor-pointer transition-colors text-2xl">{icon}</span>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { title: "Product", links: ["Features", "Leaderboards", "Missions"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
              { title: "Support", links: ["Help Center", "Contact Us", "Careers"] }
            ].map((col, idx) => (
              <div key={idx}>
                <p className="font-black text-on-surface uppercase tracking-widest text-xs mb-8">{col.title}</p>
                <ul className="space-y-5">
                  {col.links.map(link => (
                    <li key={link}><Link className="text-on-surface-variant hover:text-primary font-bold text-sm transition-colors" href="#">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-10 border-t border-surface-container">
          <p className="text-on-surface-variant/40 text-xs font-black uppercase tracking-[0.3em] text-center">© 2024 LearnLoop AI. Elevate your intellect.</p>
        </div>
      </footer>
    </div>
  );
}
