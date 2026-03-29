"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to initiate recovery. Please verify your identity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-surface-on antialiased min-h-screen flex flex-col relative">
      
      {/* Decorative Visual Background Element */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-container/20 rounded-full blur-[100px]" />
      </div>

      {/* Header / TopNavBar (Suppressed Navigation Version) */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl transition-all shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-headline text-primary tracking-tighter">LearnLoop</span>
          </div>
          <Link href="/login" className="flex items-center gap-2 text-surface-variant hover:text-primary transition-colors font-semibold text-sm">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Login
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        {/* Transactional Card Layout */}
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2rem] shadow-premium relative overflow-hidden border border-surface-container">
          
          {/* Visual Accent (Asymmetric Element) */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary-container/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl" />
          
          <div className="relative z-10 text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container/20 rounded-2xl mb-6 shadow-inner">
              <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
            </div>
            <h1 className="text-3xl font-extrabold font-headline text-surface-on tracking-tight mb-3">Forgot Password?</h1>
            <p className="text-surface-variant text-base leading-relaxed">
              No worries, it happens. Enter your email and we'll send you a recovery link.
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-6 relative z-10">
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="block text-sm font-bold text-surface-on ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-surface-variant/70">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com" 
                  required 
                  className="block w-full pl-11 pr-4 py-4 bg-surface border border-surface-container rounded-xl focus:ring-2 focus:ring-primary focus:bg-white text-surface-on placeholder-surface-variant transition-all outline-none" 
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-xl">error</span>
                <p className="text-error text-xs font-bold leading-none">{error}</p>
              </div>
            )}

            <button 
              disabled={loading || success}
              type="submit" 
              className="w-full py-4 px-6 bg-primary text-primary-on font-bold rounded-xl text-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading && <span className="material-symbols-outlined animate-spin text-xl">autorenew</span>}
              {loading ? "Requesting..." : "Send Reset Link"}
            </button>
          </form>

          {success && (
            <div className="mt-8 pt-8 border-t border-surface-container relative z-10">
              <div className="flex items-start gap-4 p-4 bg-tertiary-container/10 border border-tertiary-container/30 rounded-2xl">
                <span className="material-symbols-outlined text-tertiary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <div className="text-left">
                  <p className="text-surface-on font-semibold text-sm">Check your email for instructions</p>
                  <p className="text-surface-variant text-xs mt-1 leading-relaxed">
                    If an account exists for {email}, you will receive a password reset link shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 text-center relative z-10">
            <p className="text-surface-variant text-sm">
              Didn't receive the email? 
              <button className="text-primary font-bold hover:underline underline-offset-4 ml-1">Resend link</button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer (Transactional Minimal Version) */}
      <footer className="w-full py-12 px-6 max-w-7xl mx-auto border-t border-surface-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-surface-variant text-sm font-medium">
            &copy; {new Date().getFullYear()} LearnLoop Systems. Elevate your intellect.
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-surface-variant hover:text-primary transition-all text-sm font-semibold hover:underline decoration-2 underline-offset-4">Privacy Policy</Link>
            <Link href="/terms" className="text-surface-variant hover:text-primary transition-all text-sm font-semibold hover:underline decoration-2 underline-offset-4">Terms of Service</Link>
            <Link href="/help" className="text-surface-variant hover:text-primary transition-all text-sm font-semibold hover:underline decoration-2 underline-offset-4">Help Center</Link>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
