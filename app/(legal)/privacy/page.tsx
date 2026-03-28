"use client";

import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body selection:bg-primary/10">
      <PublicHeader />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 border border-surface-container shadow-premium"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-secondary/10">
            Current Version: v1.8.2
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface tracking-tighter leading-none mb-10">
            Our <span className="text-primary italic font-serif">Privacy</span> Code
          </h1>
          
          <div className="prose prose-lg max-w-none text-on-surface-variant font-medium leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">1. Data Sovereignty</h2>
              <p>Your documents, notes, and study materials belong exclusively to you. LearnLoop processes your information locally whenever possible and uses end-to-end encryption for cloud-based AI processing. We do not sell your academic data to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">2. AI Training Transparency</h2>
              <p>By default, your private documents are NOT used to train global LLM models. Your personal AI lab is an isolated environment designed specifically for your mastery journey. You may opt-in to share anonymized learning patterns to improve the communal algorithm.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">3. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li>Account Metadata (Email, Initials, Preferences)</li>
                <li>Learning Progress (XP, Streaks, Mission Scores)</li>
                <li>AI Processing Logs (To improve generation accuracy)</li>
                <li>Device & Usage Logs (To ensure platform stability)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">4. Your Rights (GDPR/CCPA)</h2>
              <p>You have the absolute right to export your learning data or request its permanent deletion from our "Intellectual Playground" at any time via the Profile Settings dashboard.</p>
            </section>
          </div>
          
          <div className="mt-20 pt-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-xs font-black text-on-surface-variant/40 uppercase tracking-widest">Last Modified: March 2026</p>
            <div className="flex gap-6">
              <button className="text-secondary font-black text-xs uppercase tracking-widest hover:underline">Download Privacy Kit</button>
            </div>
          </div>
        </motion.div>
      </main>

      <PublicFooter />
    </div>
  );
}
