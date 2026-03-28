"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PublicHeader from "@/app/components/PublicHeader";
import PublicFooter from "@/app/components/PublicFooter";

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("introduction");

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
    <div className="bg-surface text-surface-on min-h-screen antialiased flex flex-col">
      <PublicHeader />

      {/* Hero Header */}
      <header className="pt-32 pb-16 px-6 md:px-12 bg-white border-b border-surface-container">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-black text-[10px] mb-6 tracking-[0.2em] uppercase shadow-sm border border-secondary/20">Last Updated: October 24, 2026</span>
          <h1 className="text-5xl md:text-7xl font-black font-headline text-surface-on tracking-tighter leading-tight max-w-4xl mb-8">
             Legal & <span className="text-primary italic font-serif">Trust</span> Center
          </h1>
          <p className="text-xl text-surface-variant max-w-2xl leading-relaxed font-bold">
             Everything you need to know about our terms of service, privacy practices, and how we protect your intellectual playground.
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Side Navigation */}
          <aside className="lg:w-1/4 hidden lg:block sticky top-28 self-start">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-surface-container">
              <h3 className="font-headline font-black text-xl mb-10 flex items-center gap-3 text-surface-on">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl border border-primary/20">list_alt</span>
                Contents
              </h3>
              <nav className="space-y-3 flex flex-col font-black text-xs uppercase tracking-widest">
                <LegalNavLink id="introduction" active={activeSection === 'introduction'} label="1. Introduction" onClick={() => scrollTo('introduction')} />
                <LegalNavLink id="terms" active={activeSection === 'terms'} label="2. Terms of Service" onClick={() => scrollTo('terms')} />
                <LegalNavLink id="privacy" active={activeSection === 'privacy'} label="3. Privacy Policy" onClick={() => scrollTo('privacy')} />
                <LegalNavLink id="data-usage" active={activeSection === 'data-usage'} label="4. Data Usage & AI" onClick={() => scrollTo('data-usage')} />
                <LegalNavLink id="contact" active={activeSection === 'contact'} label="5. Contact Legal" onClick={() => scrollTo('contact')} />
              </nav>
            </div>
          </aside>

          {/* Legal Content Area */}
          <div className="lg:w-3/4 space-y-32">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-10 font-headline text-surface-on tracking-tighter">1. Introduction</h2>
              <div className="prose prose-lg max-w-none text-surface-variant leading-relaxed space-y-8 font-medium italic border-l-4 border-primary/20 pl-8">
                <p className="text-2xl">Welcome to LearnLoop. These Legal & Compliance documents govern your use of the LearnLoop platform, website, and associated services.</p>
                <p>Our goal is to provide a transparent and secure "Intellectual Playground" where users can grow their skills without compromising their privacy or digital rights.</p>
              </div>
            </section>

            <section id="terms" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-12 font-headline text-surface-on tracking-tighter text-primary">2. Terms of Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LegalCard icon="account_balance_wallet" title="User Eligibility" color="text-secondary" bg="bg-secondary/10">
                    Users must be at least 13 years of age. For users under 18, parental or guardian consent is required for premium features.
                </LegalCard>
                <LegalCard icon="verified_user" title="Account Security" color="text-primary" bg="bg-primary/10">
                    You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
                </LegalCard>
              </div>
            </section>

            <section id="privacy" className="scroll-mt-32">
              <h2 className="text-4xl font-black mb-12 font-headline text-surface-on tracking-tighter">3. Privacy Policy</h2>
              <div className="bg-white border border-surface-container rounded-[3rem] p-12 space-y-12 shadow-premium">
                <div>
                  <h3 className="font-headline font-black text-2xl mb-6 text-primary tracking-tight">How We Collect Information</h3>
                  <p className="text-surface-variant leading-relaxed font-bold mb-8">
                      We collect information that you provide directly to us, such as when you create an account, update your profile, or participate in the AI Lab.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-surface-on font-black text-xs uppercase tracking-widest">
                    <li className="flex items-center gap-3 p-4 bg-surface rounded-2xl border border-surface-container"><span className="w-2 h-2 rounded-full bg-primary"></span> Profile Metadata</li>
                    <li className="flex items-center gap-3 p-4 bg-surface rounded-2xl border border-surface-container"><span className="w-2 h-2 rounded-full bg-primary"></span> Learning Progress</li>
                    <li className="flex items-center gap-3 p-4 bg-surface rounded-2xl border border-surface-container"><span className="w-2 h-2 rounded-full bg-primary"></span> AI Lab Prompts</li>
                    <li className="flex items-center gap-3 p-4 bg-surface rounded-2xl border border-surface-container"><span className="w-2 h-2 rounded-full bg-primary"></span> Security Logs</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

function LegalNavLink({ id, active, label, onClick }: { id: string, active: boolean, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className={`text-left py-4 px-6 rounded-2xl transition-all border ${active ? 'bg-primary text-white border-primary shadow-lg' : 'border-transparent text-surface-variant hover:text-surface-on hover:bg-surface'}`}
    >
      {label}
    </button>
  );
}

function LegalCard({ icon, title, children, color, bg }: { icon: string, title: string, children: React.ReactNode, color: string, bg: string }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-surface-container shadow-sm hover:shadow-xl transition-all group">
      <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center ${color} mb-8 border border-current/10 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
         <span className="material-symbols-outlined text-3xl font-bold">{icon}</span>
      </div>
      <h4 className="font-headline font-black text-2xl mb-4 text-surface-on tracking-tight">{title}</h4>
      <p className="text-surface-variant leading-relaxed font-bold text-sm italic">"{children}"</p>
    </div>
  );
}
