"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center font-body p-6 text-center overflow-hidden relative">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10 rotate-45" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        {/* Visual Element: Futuristic 404 */}
        <div className="relative mb-12 flex justify-center">
            <div className="relative">
                <span className="text-[120px] md:text-[180px] font-black font-headline leading-none text-primary/10 tracking-tighter select-none">404</span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-[3rem] shadow-premium flex items-center justify-center border border-surface-container overflow-hidden group"
                    >
                        <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMw_3nVtM2Rpg0EUJBjGEnrfS71StSjTYSDtX_TflyqX8w0A16bjldtAsd9Q_cLJqklS_En5VD_Z6z4qPhw-gd9QD5QkkNnLLvBITj1GLFaZFZHE1l8jOmaLMHgXmIhatBxKXzlCD_qxDKRAEl9erE9LuaCBHHOfFrUoBMJ30cs20Okl5_sYoShgjY2hFzUJPnDg_ZW_ppOWrpkWIvw5QkkfsW_8jkcQZ8By21FsF7rQ4HPM0-UiikN4qxXbdXc7rNF5OiXEKgiCM" 
                            alt="Lost in dimension" 
                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                </div>
            </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-6 leading-none text-on-surface">
            Lost in the <span className="text-primary italic font-serif">Parallel Loop?</span>
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant font-medium mb-12 max-w-lg mx-auto leading-relaxed">
            Our knowledge base is vast, but this specific coordinate seems to be hiding in a parallel dimension today. 
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
                href="/dashboard" 
                className="w-full sm:w-auto px-12 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-premium hover:scale-105 active:scale-95 transition-all text-center"
            >
                Return to the Arena
            </Link>
            <Link 
                href="/" 
                className="w-full sm:w-auto px-12 py-5 bg-white border border-surface-container text-on-surface rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-bright active:scale-95 transition-all text-center"
            >
                Back to Safety
            </Link>
        </div>

        {/* Footnote */}
        <div className="mt-20 border-t border-surface-container/50 pt-10">
            <p className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em]">
                Error Code: ARCHIVE_NOT_FOUND_404
            </p>
        </div>
      </motion.div>

    </div>
  );
}
