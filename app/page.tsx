"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowRight, 
  Command, 
  Globe, 
  Zap, 
  Cpu, 
  Search,
  MessageSquare,
  Sparkles,
  Layers,
  BrainCircuit,
  Lightbulb,
  Trophy
} from "lucide-react";
import HlsVideo from "@/components/HlsVideo";
import Link from "next/link";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] },
});

// Reusable word render for scroll reveal
function ScrollReveal({ text, className, highlights = ["mastery", "potential", "clarity"] }: { text: string; className?: string; highlights?: string[] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");
  
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const isHighlight = highlights.includes(word.toLowerCase().replace(/[^a-z]/gi, ''));
        
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} highlight={isHighlight}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range, highlight }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; highlight?: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = highlight ? "hsl(var(--foreground))" : "hsl(var(--hero-subtitle))";

  return (
    <motion.span 
      style={{ opacity, color }}
      className="inline-block mr-2"
    >
      {children}
    </motion.span>
  );
}

export default function LearnLoopLanding() {
  return (
    <div className="relative">
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-28 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-12 pointer-events-auto">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border-2 border-foreground/30 flex items-center justify-center relative">
              <div className="w-3 h-3 rounded-full border border-foreground/60"></div>
              <div className="absolute inset-0 bg-foreground/5 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
            <span className="font-bold text-xl tracking-tight">LearnLoop</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-4 text-xs font-semibold tracking-widest uppercase">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">AI Missions</Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          {[Instagram, Linkedin, Twitter].map((Icon, i) => (
            <button key={i} className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
              <Icon size={18} strokeWidth={1.5} />
            </button>
          ))}
          <Link href="/login" className="ml-4 bg-foreground text-background px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 active:scale-95 transition-all">
            Enter Arena
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-[0.4]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
        />
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-background via-background/80 to-transparent z-[1]"></div>

        <div className="relative z-10 max-w-5xl mt-24">
          <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1544005313-94ddf0286df2' : i === 2 ? '1500648767791-00dcc994a43e' : '1507003211169-0a1dd7228f2d'}?auto=format&fit=crop&q=60&w=100&h=100&sat=-100`} 
                    alt="User" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-medium tracking-wide">7,000+ scholars already learning</span>
          </motion.div>

          <motion.h1 
            {...fadeUp(0.3)}
            className="text-5xl md:text-7xl lg:text-9xl font-medium tracking-[-3px] leading-[0.95] mb-8"
          >
            Study <span className="font-serif italic font-normal">Smarter</span> with AI
          </motion.h1>

          <motion.p 
            {...fadeUp(0.5)}
            className="text-lg md:text-xl text-hero-subtitle max-w-3xl mx-auto mb-12 font-medium leading-relaxed opacity-90"
          >
            Transform your notes, recordings, or links into an interactive gamified adventure. Instantly generate flashcards and quizzes grounded in cognitive science.
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto">
             <Link href="/register" className="w-full sm:w-auto bg-foreground text-background font-black text-[11px] tracking-[0.2em] px-12 py-5 rounded-full uppercase transition-all shadow-xl hover:scale-105 active:scale-95 text-center">
                Start Your Adventure
             </Link>
             <button className="text-muted-foreground text-xs font-bold uppercase tracking-widest hover:text-foreground transition-colors px-6 py-4">
                Watch Demo
             </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Education Evolution Section */}
      <section className="relative px-8 md:px-28 pt-64 pb-32">
        <motion.div {...fadeUp(0.1)} className="text-center mb-40">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-[-3px] leading-[0.95] mb-12">
            Learning has <span className="font-serif italic font-normal">changed.</span> <br /> Have you?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Passive reading is dead. LearnLoop uses active recall and space repetition to cement knowledge 4x faster than traditional methods.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 mb-32">
          {[
            { name: "AI Flashcards", icon: BrainCircuit, desc: "Automatically extract key concepts and create smart repetition decks in seconds." },
            { name: "Active Retrieval", icon: Layers, desc: "Dynamic quizzes that adapt to your performance, targeting your knowledge gaps." },
            { name: "Global Insights", icon: Globe, desc: "Compete in the arena, climb the leaderboard, and learn with a mission-driven community." }
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp(0.2 + i * 0.15)} className="text-center group">
              <div className="w-48 h-48 mx-auto mb-10 flex items-center justify-center liquid-glass rounded-[3rem] border border-white/5 shadow-inner">
                <item.icon size={64} strokeWidth={1} className="text-foreground/40 group-hover:text-foreground transition-all duration-700 group-hover:scale-110" />
              </div>
              <h4 className="font-bold text-lg mb-3 tracking-tight">{item.name}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto px-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(0.6)} className="text-muted-foreground text-xs font-black uppercase tracking-[0.4em] text-center opacity-40">
          Don't just study. Master the loop of knowledge.
        </motion.p>
      </section>

      {/* 4. Mission Section */}
      <section className="relative px-8 md:px-28 pb-44">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            viewport={{ once: true }}
            className="w-full max-w-4xl aspect-square mb-32 relative group"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-contain grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
          </motion.div>

          <div className="max-w-5xl space-y-16">
            <ScrollReveal 
              text="We're building a space where potential meets clarity — where students find focus, thinkers find reach, and every study session becomes an adventure worth having."
              className="text-4xl md:text-6xl font-medium tracking-[-2px] leading-[1.1]"
              highlights={["potential", "clarity", "focus"]}
            />
            <ScrollReveal 
              text="A platform where wisdom, community, and strategy flow together — with less noise, less friction, and more mastery for everyone involved."
              className="text-2xl md:text-3xl font-medium opacity-80 leading-[1.3] max-w-4xl"
              highlights={["mastery"]}
            />
          </div>
        </div>
      </section>

      {/* 5. Platform Section */}
      <section className="relative px-8 md:px-28 py-44 border-t border-white/5">
        <motion.div {...fadeUp(0.1)} className="mb-24 text-center">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground block mb-6 px-1">Platform</span>
          <h2 className="text-4xl md:text-7xl font-medium tracking-[-2px]">The arena for <span className="font-serif italic font-normal">relentless</span> learning</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full aspect-[21/9] rounded-[3rem] overflow-hidden mb-24 grayscale group border border-white/5 shadow-premium"
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
          />
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
          {[
            { title: "AI Flashcards", desc: "Instant extraction of key concepts into cognitive-grade revision materials." },
            { title: "Smart Quizzes", desc: "Adaptive testing environments that evolve with your learning progress." },
            { title: "Progress Insight", desc: "Deep analytics tracking your retention rates and mastery levels." },
            { title: "Global Community", desc: "Collaborate on study modules across a network of elite scholars." }
          ].map((feature, i) => (
            <motion.div key={i} {...fadeUp(0.2 + i * 0.1)} className="flex flex-col gap-4">
              <h5 className="font-bold text-lg tracking-tight border-b border-foreground/10 pb-4">{feature.title}</h5>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Adventure Section (CTA) */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/5">
        <HlsVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" 
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-[1]"></div>

        <div className="relative z-10 max-w-4xl px-8">
          <motion.div {...fadeUp(0.1)} className="flex justify-center mb-10">
            <div className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center relative">
              <div className="w-5 h-5 rounded-full border border-foreground/60"></div>
            </div>
          </motion.div>

          <motion.h2 
            {...fadeUp(0.3)}
            className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-[-3px] leading-none mb-10"
          >
            Start Your <br /><span className="font-serif italic font-normal">Adventure</span>
          </motion.h2>

          <motion.p 
            {...fadeUp(0.5)}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 font-medium"
          >
            Enter the LearnLoop arena. Experience a new standard of cognitive mastery and discovery.
          </motion.p>

          <motion.div {...fadeUp(0.7)} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register" className="bg-foreground text-background font-black text-xs tracking-widest px-12 py-5 rounded-2xl uppercase hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Join LearnLoop
            </Link>
            <Link href="/login" className="liquid-glass border border-white/10 font-black text-xs tracking-widest px-12 py-5 rounded-2xl uppercase hover:scale-105 active:scale-95 transition-all">
              Study Smarter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="px-8 md:px-28 py-16 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-full border border-foreground/30 flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full border border-foreground/60"></div>
              </div>
              <span className="font-black text-sm tracking-tight">LearnLoop</span>
          </div>
          <p className="text-muted-foreground text-xs font-medium opacity-60">© 2026 LearnLoop. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-10">
          <Link href="#" className="text-muted-foreground text-xs font-black uppercase tracking-widest hover:text-foreground transition-all">Privacy</Link>
          <Link href="#" className="text-muted-foreground text-xs font-black uppercase tracking-widest hover:text-foreground transition-all">Terms</Link>
          <Link href="#" className="text-muted-foreground text-xs font-black uppercase tracking-widest hover:text-foreground transition-all">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
