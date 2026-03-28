"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      
      Array.from(sections).forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 200) {
          currentSection = section.id;
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-surface text-surface-on min-h-screen antialiased">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-surface-container">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tighter hover:brightness-110 transition-all">LearnLoop</Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-surface-variant hover:text-primary font-headline font-bold text-sm tracking-wide transition-colors">Dashboard</Link>
              <Link href="/community" className="text-surface-variant hover:text-primary font-headline font-bold text-sm tracking-wide transition-colors">Community</Link>
              <Link href="/support" className="text-surface-variant hover:text-primary font-headline font-bold text-sm tracking-wide transition-colors">Support</Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="w-10 h-10 rounded-full border border-surface-container bg-white flex items-center justify-center text-surface-variant hover:text-primary transition-colors shadow-sm outline-none">
              <span className="material-symbols-outlined text-lg">notifications</span>
            </button>
            <Link href="/settings" className="w-10 h-10 rounded-full border border-surface-container bg-white flex items-center justify-center text-surface-variant hover:text-primary transition-colors shadow-sm outline-none">
              <span className="material-symbols-outlined text-lg">settings</span>
            </Link>
            <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface flex items-center justify-center text-primary font-bold shadow-sm hover:shadow-md transition-shadow outline-none font-headline">
              A
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-32 pb-16 px-6 md:px-12 bg-white border-b border-surface-container">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-xs mb-6 tracking-wide shadow-sm border border-secondary/20">Last Updated: October 24, 2026</span>
          <h1 className="text-5xl md:text-6xl font-black font-headline text-surface-on tracking-tight leading-tight max-w-3xl mb-8">
             Legal & <span className="text-primary italic font-serif">Compliance</span> Center
          </h1>
          <p className="text-xl text-surface-variant max-w-2xl leading-relaxed font-medium">
             Everything you need to know about our terms of service, privacy practices, and how we protect your intellectual playground.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Side Navigation (Table of Contents) */}
          <aside className="lg:w-1/4 hidden lg:block sticky top-28 self-start">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-surface-container">
              <h3 className="font-headline font-black text-xl mb-8 flex items-center gap-3 text-surface-on">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl border border-primary/20">list_alt</span>
                Contents
              </h3>
              <nav className="space-y-2 flex flex-col font-medium text-sm">
                <button 
                  onClick={() => scrollTo('introduction')} 
                  className={`text-left py-2.5 pl-4 border-l-[3px] transition-all font-bold ${activeSection === 'introduction' ? 'border-primary text-primary' : 'border-transparent text-surface-variant hover:text-surface-on hover:border-surface-variant'}`}
                >
                  1. Introduction
                </button>
                <button 
                  onClick={() => scrollTo('terms')} 
                  className={`text-left py-2.5 pl-4 border-l-[3px] transition-all font-bold ${activeSection === 'terms' ? 'border-primary text-primary' : 'border-transparent text-surface-variant hover:text-surface-on hover:border-surface-variant'}`}
                >
                  2. Terms of Service
                </button>
                <button 
                  onClick={() => scrollTo('privacy')} 
                  className={`text-left py-2.5 pl-4 border-l-[3px] transition-all font-bold ${activeSection === 'privacy' ? 'border-primary text-primary' : 'border-transparent text-surface-variant hover:text-surface-on hover:border-surface-variant'}`}
                >
                  3. Privacy Policy
                </button>
                <button 
                  onClick={() => scrollTo('data-usage')} 
                  className={`text-left py-2.5 pl-4 border-l-[3px] transition-all font-bold ${activeSection === 'data-usage' ? 'border-primary text-primary' : 'border-transparent text-surface-variant hover:text-surface-on hover:border-surface-variant'}`}
                >
                  4. Data Usage & AI
                </button>
                <button 
                  onClick={() => scrollTo('contact')} 
                  className={`text-left py-2.5 pl-4 border-l-[3px] transition-all font-bold ${activeSection === 'contact' ? 'border-primary text-primary' : 'border-transparent text-surface-variant hover:text-surface-on hover:border-surface-variant'}`}
                >
                  5. Contact Legal
                </button>
              </nav>

              <div className="mt-12 p-6 bg-surface rounded-2xl border border-surface-container">
                <p className="text-xs font-black text-primary uppercase tracking-widest mb-4">Download PDF Version</p>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-full hover:brightness-110 active:scale-95 transition-all shadow-sm font-bold text-sm outline-none">
                  <span className="material-symbols-outlined text-lg">download</span>
                  Legal_Bundle.pdf
                </button>
              </div>
            </div>
          </aside>

          {/* Legal Content Area */}
          <div className="lg:w-3/4 space-y-20">
            
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 font-headline text-surface-on tracking-tight">1. Introduction</h2>
              <div className="prose prose-lg prose-slate max-w-none text-surface-variant leading-relaxed space-y-6 font-medium">
                <p>Welcome to LearnLoop. These Legal & Compliance documents govern your use of the LearnLoop platform, website, and associated services. By accessing or using our platform, you agree to be bound by these terms.</p>
                <p>Our goal is to provide a transparent and secure "Intellectual Playground" where users can grow their skills without compromising their privacy or digital rights. We maintain high standards of compliance with global regulations including GDPR, CCPA, and COPPA.</p>
              </div>
            </section>

            {/* Terms of Service Bento Grid */}
            <section id="terms" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 font-headline text-surface-on tracking-tight">2. Terms of Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-white p-8 rounded-3xl border border-surface-container shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 border border-secondary/20 shadow-inner group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                  </div>
                  <h4 className="font-headline font-black text-xl mb-3 text-surface-on">User Eligibility</h4>
                  <p className="text-surface-variant leading-relaxed font-medium">Users must be at least 13 years of age to create an account. For users under 18, parental or guardian consent is required for certain premium features.</p>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-surface-container shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">verified_user</span>
                  </div>
                  <h4 className="font-headline font-black text-xl mb-3 text-surface-on">Account Security</h4>
                  <p className="text-surface-variant leading-relaxed font-medium">You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>
                </div>
                
                <div className="bg-white p-10 rounded-3xl border border-surface-container md:col-span-2 shadow-sm border-l-8 border-l-error">
                  <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-full md:w-1/2">
                      <h4 className="font-headline font-black text-2xl mb-4 text-surface-on tracking-tight">Prohibited Conduct</h4>
                      <p className="text-surface-variant leading-relaxed mb-6 font-medium">We strictly prohibit any use of the platform for harassment, data scraping, or the distribution of unauthorized intellectual property.</p>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-base font-bold text-surface-on bg-error/5 p-3 rounded-xl border border-error/10">
                           <span className="material-symbols-outlined text-error">cancel</span> No automated bots or crawlers
                        </li>
                        <li className="flex items-center gap-3 text-base font-bold text-surface-on bg-error/5 p-3 rounded-xl border border-error/10">
                           <span className="material-symbols-outlined text-error">cancel</span> No reverse-engineering of AI models
                        </li>
                      </ul>
                    </div>
                    <div className="w-full md:w-1/2 bg-surface p-6 rounded-[2rem] border border-surface-container text-center flex flex-col justify-center items-center min-h-[200px] shadow-inner relative overflow-hidden">
                        <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[150px] text-error/5 rotate-12 pointer-events-none">gavel</span>
                        <span className="material-symbols-outlined text-5xl text-error mb-4">gavel</span>
                        <p className="font-black font-headline text-surface-on text-lg">Strict Enforcement</p>
                        <p className="text-sm text-surface-variant font-medium mt-2 max-w-[200px]">Violations may result in immediate account termination.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Policy */}
            <section id="privacy" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 font-headline text-surface-on tracking-tight">3. Privacy Policy</h2>
              <div className="bg-white border border-surface-container rounded-[2rem] p-10 md:p-12 space-y-10 shadow-sm">
                <div>
                  <h3 className="font-headline font-black text-2xl mb-4 text-primary tracking-tight">How We Collect Information</h3>
                  <p className="text-surface-variant leading-relaxed font-medium mb-6">
                      We collect information that you provide directly to us, such as when you create an account, update your profile, or participate in community discussions. This includes:
                  </p>
                  <ul className="space-y-4 text-surface-on font-bold pl-2">
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary/50"></div> Identification data (Name, email address)</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary/50"></div> Learning progress and quiz results</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary/50"></div> Interaction metadata within the "AI Lab"</li>
                    <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary/50"></div> Device information and IP addresses for security logs</li>
                  </ul>
                </div>
                
                <div className="h-px bg-surface-container w-full"></div>
                
                <div>
                  <h3 className="font-headline font-black text-2xl mb-4 text-primary tracking-tight">Your Rights (GDPR/CCPA)</h3>
                  <p className="text-surface-variant leading-relaxed font-medium mb-8">
                      You have the right to access, correct, or delete your personal data at any time. You can also export your learning history in a machine-readable format from your settings panel.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 active:scale-95 transition-all outline-none">
                        Request Data Export
                    </button>
                    <button className="px-8 py-3 rounded-full bg-surface text-surface-on border border-surface-container font-bold hover:bg-surface-bright active:scale-95 transition-all outline-none shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">admin_panel_settings</span> Manage Consent
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Usage & AI */}
            <section id="data-usage" className="scroll-mt-32">
              <h2 className="text-3xl font-black mb-8 font-headline text-surface-on tracking-tight">4. Data Usage & AI Ethics</h2>
              
              <div className="bg-gradient-to-br from-secondary to-purple-800 rounded-[2rem] p-10 md:p-12 relative overflow-hidden shadow-premium text-white group">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[200px] text-white/5 pointer-events-none group-hover:rotate-12 transition-transform duration-700" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                
                <div className="relative z-10">
                  <h3 className="font-headline font-black text-3xl mb-6 text-white tracking-tight">The LearnLoop AI Commitment</h3>
                  <p className="text-white/80 leading-relaxed max-w-2xl mb-12 font-medium text-lg">
                      As a pioneer in the AI-driven education space, we believe in radical transparency. Your learning data is used to fine-tune our personalized curriculum algorithms, but we never sell your prompts or private interactions to third-party model trainers.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                          <span className="material-symbols-outlined text-white text-lg">public_off</span>
                      </div>
                      <h5 className="font-black font-headline text-white mb-2 text-lg">Anonymization</h5>
                      <p className="text-sm text-white/80 font-medium">All data used for system improvement is fully anonymized.</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                          <span className="material-symbols-outlined text-white text-lg">lock</span>
                      </div>
                      <h5 className="font-black font-headline text-white mb-2 text-lg">No Leakage</h5>
                      <p className="text-sm text-white/80 font-medium">Strict isolation protocols prevent cross-tenant data leakage.</p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                          <span className="material-symbols-outlined text-white text-lg">tune</span>
                      </div>
                      <h5 className="font-black font-headline text-white mb-2 text-lg">Human Control</h5>
                      <p className="text-sm text-white/80 font-medium">Users can opt-out of AI training contributions entirely.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Support */}
            <section id="contact" className="scroll-mt-32">
              <div className="bg-surface-on text-surface rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-sm">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                <h2 className="text-4xl font-black mb-6 font-headline tracking-tight relative z-10 text-white">Still have questions?</h2>
                <p className="text-surface-variant mb-12 max-w-xl mx-auto text-lg relative z-10 leading-relaxed">Our legal team and data protection officer are here to help clarify any points regarding our compliance or your rights.</p>
                
                <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                  <a href="mailto:legal@learnloop.app" className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-black text-sm tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-premium border border-primary/50">
                    <span className="material-symbols-outlined text-xl">mail</span> Email Legal Team
                  </a>
                  <Link href="/support" className="flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-black text-sm tracking-wide hover:bg-white/20 active:scale-95 transition-all border border-white/20 backdrop-blur-md">
                    <span className="material-symbols-outlined text-xl">help_center</span> Visit Help Center
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-container pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <span className="text-3xl font-black text-primary font-headline tracking-tighter">LearnLoop</span>
              <p className="mt-6 text-surface-variant font-medium leading-relaxed">Dismantling rigid learning systems through intentional design and deep intelligence.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 w-full lg:w-auto">
              <div>
                <h5 className="font-black text-surface-on mb-6 uppercase tracking-widest text-xs font-headline">Platform</h5>
                <ul className="space-y-4 font-medium text-sm text-surface-variant">
                  <li><Link href="/library" className="hover:text-primary transition-colors">Curriculum</Link></li>
                  <li><Link href="/studio" className="hover:text-primary transition-colors">AI Lab</Link></li>
                  <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="font-black text-surface-on mb-6 uppercase tracking-widest text-xs font-headline">Legal</h5>
                <ul className="space-y-4 font-medium text-sm text-surface-variant">
                  <li><Link href="/legal" className="text-primary font-bold">Terms of Service</Link></li>
                  <li><Link href="/legal" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/legal" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="font-black text-surface-on mb-6 uppercase tracking-widest text-xs font-headline">Connect</h5>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-surface-variant hover:bg-primary hover:text-white transition-all border border-surface-container"><span className="material-symbols-outlined">public</span></a>
                  <a href="#" className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-surface-variant hover:bg-primary hover:text-white transition-all border border-surface-container"><span className="material-symbols-outlined">chat</span></a>
                  <a href="#" className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-surface-variant hover:bg-primary hover:text-white transition-all border border-surface-container"><span className="material-symbols-outlined">alternate_email</span></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-surface-variant">
            <p>© 2026 LearnLoop AI Inc. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <Link href="/status" className="hover:text-primary transition-colors">System Status</Link>
              <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
              <button className="hover:text-primary transition-colors underline decoration-dotted underline-offset-4 outline-none">Privacy Preferences</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
