import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-surface text-surface-on min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 w-full z-50 border-b border-surface-container/30 shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
             <Link href="/" className="text-2xl font-black font-headline text-primary tracking-tighter">
                LearnLoop
             </Link>
             <div className="hidden md:flex gap-6 items-center">
                <Link href="/dashboard" className="font-headline font-bold text-sm tracking-tight text-primary border-b-2 border-primary pb-1">Dashboard</Link>
                <Link href="/missions" className="font-headline font-bold text-sm tracking-tight text-surface-variant hover:text-primary transition-colors">Missions</Link>
                <Link href="/leaderboard" className="font-headline font-bold text-sm tracking-tight text-surface-variant hover:text-primary transition-colors">Leaderboard</Link>
                <Link href="/premium" className="font-headline font-bold text-sm tracking-tight text-surface-variant hover:text-primary transition-colors">Pricing</Link>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-3 mr-4 text-surface-variant">
               <span className="material-symbols-outlined hover:bg-surface-container p-2 rounded-full cursor-pointer transition-all">notifications</span>
               <span className="material-symbols-outlined text-tertiary-fixed hover:bg-surface-container p-2 rounded-full cursor-pointer transition-all">local_fire_department</span>
               <span className="material-symbols-outlined text-primary hover:bg-surface-container p-2 rounded-full cursor-pointer transition-all">stars</span>
            </div>
            <Link href="/login" className="hidden lg:block text-surface-variant font-bold font-headline text-sm hover:text-primary transition-colors px-4 py-2">
               Login
            </Link>
            <Link href="/signup" className="bg-primary text-primary-on px-6 py-2.5 rounded-full font-bold font-headline text-sm shadow-md hover:scale-105 transition-all active:scale-95">
               Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-48 overflow-hidden px-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--colors-primary-container),transparent_50%),radial-gradient(circle_at_bottom_left,var(--colors-secondary-container),transparent_50%)] opacity-30" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-secondary-container text-secondary-on px-5 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-wider backdrop-blur-md">
                 <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                 Next-Gen Intellectual Engine
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-headline text-surface-on tracking-tight leading-[0.95] mb-8">
                 Elevate Your <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary italic pr-2">Genius</span>
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-surface-variant mb-12 leading-relaxed">
                 LearnLoop transforms complex notes, infinite PDFs, and web links into a personalized, gamified mastery journey powered by cutting-edge AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                 <Link href="/signup" className="w-full sm:w-auto bg-primary text-primary-on px-10 py-5 rounded-full text-lg font-bold shadow-premium hover:shadow-primary/50 transition-all hover:-translate-y-1 text-center">
                    Start Your First Mission
                 </Link>
                 <button className="w-full sm:w-auto flex items-center justify-center gap-3 text-surface-on font-bold text-lg hover:text-primary transition-all">
                    <span className="material-symbols-outlined bg-white text-surface-on shadow-md p-3 rounded-full">play_arrow</span>
                    Watch the Experience
                 </button>
              </div>
            </div>

            <div className="relative">
              <img 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjvxTDpmOyuY2SjRAiQnxt-ngT71VnrJWkicRB4PclZfZ1RZvH7Qjpf1XbFV1ns0wz27xOAYfijcT9mqmh57ifC9SraiYacKyo__lTwsJFdB3JyoR50p4iKBAprA8mnWPyu-pYmH46XwHQ5SVILlq2qH1IICFC2WsLQdZv14Gv74a0ylY3joXUj5RxGm1liOSoCGiO1svzlxiTmfmDT5GoW62tH7TLdu19aaKuF4ywnvj1POr43uxGK6TD54GS1yrtmMJw2qa_qe8" 
                 alt="AI Brain Transformation" 
                 className="w-full h-auto drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal rounded-3xl"
              />
              
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl hidden md:block border border-surface-container animate-[bounce_6s_infinite]">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary-container/20 rounded-2xl">
                       <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                    </div>
                    <div>
                       <p className="text-xs text-surface-variant font-bold uppercase tracking-widest">Cognitive Load</p>
                       <p className="text-xl font-black text-surface-on">-45% Reduced</p>
                    </div>
                 </div>
                 <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-primary" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-32 px-6 bg-surface-container-low relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-surface to-transparent" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black font-headline mb-6 tracking-tight">The Lab in Your Pocket</h2>
              <p className="text-surface-variant max-w-2xl mx-auto text-lg">Your study materials shouldn't just sit there. They should challenge you.</p>
            </div>
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-white/50 transform transition-transform duration-1000 hover:scale-[1.02]">
                 <img 
                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3zr9xAUIRlb9cjP4eXgVCFIzXhh07QGOYtZYJmobdl4NkSESy0MLpJU_VYeYZOK098JiGae2ikjnm6jvu9VlH1eMfQlbv4v3g83OoWZ_bSwZZ_td2vFFKPnIBinSgAqciuwYTfm8SMzfOtRuAHuqxLaVFjLZN2pCUKYZuRss3mrh5jFCHiO9XHUNNq4oyVdDBSr2n0v1wKoN9swAPbGx0lXXia-mdP-uleKbfiSAl3K5N-MwBew-1RgCuziqPpeI3lkwoQJ2tW4I" 
                   alt="Dashboard Showcase" 
                   className="w-full rounded-[1.5rem]" 
                 />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="bg-primary rounded-[3rem] py-24 px-12 text-center text-primary-on relative overflow-hidden shadow-premium">
            <h2 className="text-5xl font-black font-headline mb-8 tracking-tight relative z-10">Your Intellect, <br />Unleashed.</h2>
            <p className="text-primary-on/90 mb-12 max-w-xl mx-auto text-xl relative z-10">Join 50,000+ learners today. The first 100 XP are on us.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
               <Link href="/signup" className="bg-white text-primary px-12 py-5 rounded-full text-xl font-black shadow-xl hover:scale-105 transition-all w-full sm:w-auto text-center">
                  Get Started Free
               </Link>
               <Link href="/premium" className="bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto text-center">
                  View Premium
               </Link>
            </div>
            
            {/* Background graphic */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
               <span className="material-symbols-outlined text-[400px]">language</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-surface-container w-full">
        <div className="w-full py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="text-xl font-black font-headline text-surface-on mb-4">LearnLoop</div>
            <p className="text-surface-variant text-sm mb-6 max-w-xs leading-relaxed">The AI-driven learning platform designed for the modern intellect. Fast, fun, and effective.</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-surface-variant hover:text-primary cursor-pointer transition-colors">public</span>
              <span className="material-symbols-outlined text-surface-variant hover:text-primary cursor-pointer transition-colors">alternate_email</span>
              <span className="material-symbols-outlined text-surface-variant hover:text-primary cursor-pointer transition-colors">share</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
               <p className="font-bold font-headline text-surface-on mb-4">Product</p>
               <ul className="space-y-3">
                 <li><Link href="#features" className="text-surface-variant hover:text-primary text-sm transition-opacity">Features</Link></li>
                 <li><Link href="/leaderboard" className="text-surface-variant hover:text-primary text-sm transition-opacity">Leaderboards</Link></li>
                 <li><Link href="/missions" className="text-surface-variant hover:text-primary text-sm transition-opacity">Missions</Link></li>
               </ul>
            </div>
            <div>
               <p className="font-bold font-headline text-surface-on mb-4">Legal</p>
               <ul className="space-y-3">
                 <li><Link href="/privacy" className="text-surface-variant hover:text-primary text-sm transition-opacity">Privacy Policy</Link></li>
                 <li><Link href="/terms" className="text-surface-variant hover:text-primary text-sm transition-opacity">Terms of Service</Link></li>
               </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile Navigation Guard for SPA feel across mobile */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 md:hidden bg-surface-bright/90 backdrop-blur-lg border-t border-surface-container shadow-premium z-50 rounded-t-[2rem]">
         <Link href="/" className="flex flex-col items-center justify-center bg-primary-container text-primary rounded-2xl px-5 py-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-headline text-[10px] font-semibold">Home</span>
         </Link>
         <Link href="/missions" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
            <span className="material-symbols-outlined">rocket_launch</span>
            <span className="font-headline text-[10px] font-semibold">Missions</span>
         </Link>
         <Link href="/leaderboard" className="flex flex-col items-center justify-center text-surface-variant px-5 py-2 hover:text-primary transition-all">
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="font-headline text-[10px] font-semibold">Ranks</span>
         </Link>
      </nav>
      
    </div>
  );
}
