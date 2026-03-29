"use client";

import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body selection:bg-primary/10">
      <PublicHeader />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 border border-surface-container shadow-premium"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-primary/10">
            Current Version: v0.1.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface tracking-tighter leading-none mb-10">
            Terms of <span className="text-secondary italic font-serif">Service</span>
          </h1>
          
          <div className="prose prose-lg max-w-none text-on-surface-variant font-medium leading-relaxed space-y-12">
            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using LearnLoop, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services. We provide an AI-powered gamified learning platform "as-is" and "as-available".</p>
            </section>

            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">2. User Eligibility</h2>
              <p>You must be at least 13 years of age to create an account on LearnLoop. If you are under 18, you represent that you have your parent or guardian's permission to use the platform. Accounts found to be held by children under 13 will be terminated immediately.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">3. Intellectual Playground Rules</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li>You are responsible for all content uploaded to your personal learning lab.</li>
                <li>Commercial exploitation of AI-generated study materials is prohibited.</li>
                <li>Harassment, cheating on competitive pod leaderboards, or exploiting system vulnerabilities is strictly forbidden.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight mb-4">4. AI & Data Processing</h2>
              <p>LearnLoop utilizes advanced neural extraction to transform your documents. You retain ownership of your original data, while granting LearnLoop a license to process this data for the sole purpose of generating your personalized learning experience.</p>
            </section>
          </div>
          
          <div className="mt-20 pt-10 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-black text-on-surface-variant/40 uppercase tracking-widest">Last Modified: March 2026</p>
            <div className="flex gap-6">
              <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Download PDF</button>
              <button className="text-on-surface-variant font-black text-xs uppercase tracking-widest hover:text-on-surface transition-colors">Print</button>
            </div>
          </div>
        </motion.div>
      </main>

      <PublicFooter />
    </div>
  );
}
