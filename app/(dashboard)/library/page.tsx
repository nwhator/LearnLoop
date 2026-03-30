"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";

interface StudySet {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  created_at: string | null;
  users?: {
    name: string | null;
  } | null;
}

function LibraryContent() {
  const [sets, setSets] = useState<StudySet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const categories = ["All Topics", "Computer Science", "Humanities", "Sciences", "Economics", "Medicine"];

  useEffect(() => {
    async function fetchSets() {
      try {
        const { data, error } = await supabase
          .from("study_sets")
          .select("*, users(name)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSets(data || []);
      } catch (err) {
        console.error("Library fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSets();
  }, []);

  const filteredSets = sets.filter(s => {
    const matchesCategory = activeCategory === "All Topics" || s.category === activeCategory;
    const matchesSearch = !search || 
      s.title.toLowerCase().includes(search) || 
      (s.description?.toLowerCase().includes(search) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 lg:ml-72 min-h-screen">
        <DashboardHeader title="Knowledge Vault" />

        <div className="p-8 lg:p-12 mt-20 space-y-12 max-w-7xl mx-auto w-full">
            
            <header className="space-y-4">
                <h2 className="text-5xl font-black font-headline text-on-surface tracking-tighter">Topic Library</h2>
                <p className="text-on-surface-variant font-medium text-lg max-w-2xl leading-relaxed">Expand your horizons with curated study sets and interactive modules across dozens of specialized disciplines.</p>
            </header>

            {/* Category Navigation */}
            <div className="flex flex-wrap items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/30 border-primary' : 'bg-white border-surface-container text-on-surface-variant hover:text-on-surface hover:border-primary/30'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Trending / Recommended Grid */}
            <section className="space-y-10">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black font-headline text-on-surface tracking-tight flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                        Trending Study Sets
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse"></div>
                        ))
                    ) : filteredSets.length > 0 ? filteredSets.map((set) => (
                        <StudyCard key={set.id} set={set} />
                    )) : (
                        <div className="col-span-full py-20 bg-white border-2 border-dashed border-surface-container rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-6">local_library</span>
                            <p className="text-xl font-black font-headline text-on-surface">Your vault is empty in this sector.</p>
                            <Link href="/dashboard" className="text-primary font-black uppercase text-xs tracking-widest mt-4 hover:underline underline-offset-8 transition-all">Generate your first set →</Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
      </main>

      {/* Floating Action Button */}
      <Link href="/dashboard" title="New Study Set" className="fixed bottom-10 right-10 w-16 h-16 bg-secondary text-white rounded-full shadow-premium flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group border border-white/20">
        <span className="material-symbols-outlined text-3xl font-black group-hover:rotate-180 transition-transform duration-500">add</span>
      </Link>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
        <div className="flex bg-surface min-h-screen items-center justify-center">
             <span className="material-symbols-outlined animate-spin text-5xl text-primary">autorenew</span>
        </div>
    }>
        <LibraryContent />
    </Suspense>
  );
}

function StudyCard({ set }: { set: StudySet }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-surface-container shadow-sm hover:shadow-xl hover:translate-y-[-8px] transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
        
        <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
                <span className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm w-fit">{set.category || 'General'}</span>
                {set.users?.name && <span className="text-[9px] font-bold text-on-surface-variant uppercase ml-2">by {set.users.name}</span>}
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{set.created_at ? new Date(set.created_at).toLocaleDateString() : 'N/A'}</span>
        </div>

        <h4 className="text-2xl font-black font-headline text-on-surface leading-tight mb-4 group-hover:text-primary transition-colors">{set.title}</h4>
        <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-10 line-clamp-3 italic opacity-80">"{set.description}"</p>
        
        <div className="mt-auto pt-6 border-t border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">Mastery: 0%</span>
            </div>
            <Link href={`/sets/${set.id}`} className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group/btn px-4 py-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-all">
                Enter <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
        </div>
    </div>
  );
}
