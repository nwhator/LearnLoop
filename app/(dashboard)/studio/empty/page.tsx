"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function StudioEmptyStatePage() {
  const level = useStore((state) => state.level);
  const router = useRouter();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16 border-b border-surface-container/50">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-on-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Dashboard</Link>
            <Link href="/studio/empty" className="text-primary font-bold border-b-2 border-primary font-headline px-3 py-1">Studio</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">notifications</button>
          <div className="h-10 w-10 border-2 border-primary/20 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface-variant">
             A
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container pb-6 z-40">
        <div className="px-6 mb-8 mt-6">
          <p className="font-headline text-xl font-bold text-on-surface">Creator Studio</p>
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mt-1">System Overview</p>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/dashboard" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-xl transition-all">
             <span className="material-symbols-outlined">dashboard</span> General
          </Link>
          <Link href="/studio/empty" className="bg-primary/10 text-primary rounded-xl px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm">
             <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>drive_folder_upload</span> Files
          </Link>
          <Link href="/studio" className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-xl transition-all">
             <span className="material-symbols-outlined">psychology</span> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-24 pb-32 px-6 lg:px-12 max-w-7xl mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
        
        <section className="w-full max-w-4xl bg-white border border-surface-container rounded-[2rem] overflow-hidden shadow-premium group">
            
            <div className="relative h-64 md:h-80 overflow-hidden bg-surface-container flex flex-col items-center justify-center border-b border-surface-container">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="material-symbols-outlined text-[120px] text-on-surface shadow-sm">inventory_2</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                   <div className="bg-surface/80 backdrop-blur-xl p-8 rounded-full shadow-lg border border-surface-container group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                   </div>
                </div>
            </div>
            
            <div className="p-10 md:p-16 text-center bg-white">
                <h2 className="text-3xl md:text-4xl font-black font-headline text-on-surface mb-4 tracking-tight">No notes uploaded yet</h2>
                <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                    Your intellectual playground is a blank canvas. Start by capturing your thoughts, or upload your class PDF to see our AI work its magic.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center mt-4">
                    <button 
                      onClick={() => router.push('/studio/generating')}
                      className="bg-primary text-on-primary px-10 py-4 text-lg rounded-full font-bold flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 shadow-md shadow-primary/20 transition-all font-headline"
                    >
                        <span className="material-symbols-outlined">upload_file</span>
                        Upload First PDF
                    </button>
                    <button 
                      className="bg-surface text-on-surface border border-surface-container px-10 py-4 text-lg rounded-full font-bold hover:bg-surface-bright hover:shadow-inner active:scale-95 transition-all font-headline"
                    >
                        Browse Templates
                    </button>
                </div>
            </div>

            <div className="bg-surface p-6 border-t border-surface-container flex justify-between items-center px-10">
               <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Supports .PDF, .TXT, .DOCX</span>
               <span className="text-xs font-bold text-primary hover:underline cursor-pointer">View formatting guidelines</span>
            </div>
        </section>

      </main>
      
    </div>
  );
}
