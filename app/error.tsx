"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center font-body p-6 text-center overflow-hidden relative">
      
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(179,27,37,0.05),transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-error/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Visual Element: Glitchy AI */}
        <div className="mb-12 flex justify-center">
            <motion.div 
               animate={{ 
                  scale: [1, 1.05, 1],
                  filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-[3rem] shadow-premium flex items-center justify-center border border-error/20 overflow-hidden relative"
            >
                <span className="material-symbols-outlined text-error text-[80px] md:text-[100px] font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
                   cloud_off
                </span>
                <div className="absolute inset-0 bg-error/5 opacity-50" />
            </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-6 leading-none text-on-surface">
            The Neural Link <span className="text-error italic font-serif">Glitched</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant font-medium mb-12 max-w-lg mx-auto leading-relaxed">
            Our AI tutors are having a brief moment of existential dread. We are currently working to stabilize the system.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
                onClick={() => reset()} 
                className="w-full sm:w-auto px-12 py-5 bg-error text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-error/20 hover:scale-105 active:scale-95 transition-all text-center"
            >
                Retry Connection
            </button>
            <Link 
                href="/dashboard" 
                className="w-full sm:w-auto px-12 py-5 bg-white border border-surface-container text-on-surface rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-bright active:scale-95 transition-all text-center"
            >
                Return to Arena
            </Link>
        </div>

        {/* Footnote */}
        <div className="mt-20 border-t border-surface-container/50 pt-10">
            <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em]">
                Error Code: 500_SYSTEM_INSTABILITY
            </p>
            {error.digest && (
              <p className="text-[8px] font-bold text-on-surface-variant/20 tracking-widest mt-2 uppercase">
                Digest: {error.digest}
              </p>
            )}
        </div>
      </motion.div>

    </div>
  );
}
