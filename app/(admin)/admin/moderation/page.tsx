"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { moderateContent } from "@/lib/gemini";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface ModerationItem {
  id: string;
  type: string;
  content_id: string;
  flagged_by: string;
  reason: string;
  status: string;
  created_at: string;
  title?: string; // Optinal field for better UI
}

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState("All Content");
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModerating, setIsModerating] = useState<string | null>(null);

  const tabs = ["All Content", "Flagged Sets", "AI Notes", "Quizzes", "Flashcards"];

  useEffect(() => {
    const fetchModerationItems = async () => {
      try {
        const { data, error } = await supabase
          .from("moderation_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error("Error fetching moderation items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchModerationItems();
  }, []);

  const handleAIReview = async (item: ModerationItem) => {
    setIsModerating(item.id);
    try {
      // In a real app, you'd fetch the actual content text here
      const mockContent = `Reviewing ${item.type} with ID ${item.content_id}: ${item.reason}`;
      const result = await moderateContent(mockContent);
      
      alert(`AI Review Result:\nFlagged: ${result.flagged}\nScore: ${result.accuracyScore}\nReason: ${result.reason}`);
      
      // Update status in DB if AI confirms it's okay or bad?
      // await supabase.from('moderation_items').update({ status: 'reviewed' }).eq('id', item.id);
    } catch (error) {
      console.error("AI Review Failed:", error);
    } finally {
      setIsModerating(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.reason?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Content" || 
                       (activeTab === "Quizzes" && item.type === "quiz") ||
                       (activeTab === "Flashcards" && item.type === "flashcard");
    return matchesSearch && matchesTab;
  });

  if (loading) {
    return (
      <div className="bg-surface text-surface-on min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-headline font-bold text-primary">Scanning records...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      <AdminSidebar />

      <main className="ml-64 min-h-screen">
        <AdminHeader 
          title="Content Moderation" 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          placeholder="Search reports or items..."
        />

        <div className="p-10 space-y-10 max-w-7xl mx-auto">
            
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ModerationStat 
                  title="Pending Review" 
                  value={items.filter(i => i.status === 'pending').length.toString()} 
                  icon="pending_actions" 
                  color="warning" 
                />
                <ModerationStat 
                  title="AI Flagged" 
                  value="12" 
                  icon="psychology" 
                  color="error" 
                />
                <ModerationStat 
                  title="Content Health" 
                  value="94%" 
                  icon="health_and_safety" 
                  color="success" 
                />
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0 font-headline">
                    {tabs.map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'bg-surface border border-surface-container text-surface-variant hover:text-surface-on hover:border-surface-variant/50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Moderation Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredItems.length > 0 ? filteredItems.map((item) => (
                  <ModerationCard 
                    key={item.id} 
                    item={item} 
                    onAIReview={() => handleAIReview(item)}
                    isModerating={isModerating === item.id}
                  />
                )) : (
                  <div className="col-span-full py-20 bg-white rounded-[2rem] border border-dashed border-surface-container flex flex-col items-center justify-center text-surface-variant">
                    <span className="material-symbols-outlined text-6xl mb-4">check_circle</span>
                    <p className="text-xl font-headline font-bold">Clear Skies! No items found.</p>
                  </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}

function ModerationStat({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) {
  const colorMap: any = {
    warning: "text-orange-500 bg-orange-50",
    error: "text-error bg-error/10",
    success: "text-green-600 bg-green-50",
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-surface-container flex items-center justify-between">
      <div>
        <p className="text-sm font-black text-surface-variant uppercase tracking-widest font-headline">{title}</p>
        <h3 className="text-4xl font-black mt-2 text-surface-on tracking-tight">{value}</h3>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl material-symbols-outlined ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
}

function ModerationCard({ item, onAIReview, isModerating }: { item: ModerationItem, onAIReview: () => void, isModerating: boolean }) {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden group border border-surface-container hover:border-primary/30 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row h-full">
          <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-surface-variant/30">
                {item.type === 'quiz' ? 'quiz' : item.type === 'flashcard' ? 'style' : 'description'}
              </span>
              <div className="absolute top-4 left-4 bg-error text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 z-20 shadow-md">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span> 
                  {item.status.toUpperCase()}
              </div>
          </div>
          <div className="flex-1 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest font-headline">{item.type} • ID: {item.content_id.slice(0,8)}</span>
                  <span className="text-[10px] font-bold text-surface-variant uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <h4 className="text-lg font-black font-headline text-surface-on leading-tight mb-3">Report Reason</h4>
              <p className="text-sm text-surface-variant leading-relaxed mb-6 font-medium">"{item.reason}"</p>
              
              <div className="mt-auto pt-5 flex items-center justify-between border-t border-surface-container">
                  <button 
                    disabled={isModerating}
                    onClick={onAIReview}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-secondary hover:text-white transition-all disabled:opacity-50"
                  >
                    {isModerating ? 'AI REVIEWING...' : 'AI ASSISTANT'}
                    <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  </button>
                  <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full transition-colors shadow-sm outline-none" title="Review">
                          <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                      <button className="p-2.5 bg-error/10 text-error hover:bg-error hover:text-white rounded-full transition-colors shadow-sm outline-none" title="Delete">
                          <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
