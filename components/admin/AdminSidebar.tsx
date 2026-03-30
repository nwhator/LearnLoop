"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "System Analytics", icon: "insights", activeIcon: "insights" },
    { href: "/admin/users", label: "User Management", icon: "group", activeIcon: "group" },
    { href: "/admin/moderation", label: "Content Moderation", icon: "gavel", activeIcon: "gavel" },
    { href: "/studio", label: "AI Controls", icon: "psychology", activeIcon: "psychology" },
  ];

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-white border-r border-surface-container flex flex-col pt-8 pb-6 gap-2 z-50 transition-all duration-300 ease-in-out shadow-sm">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-premium">
            <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
            <h1 className="text-xl font-black font-headline text-primary tracking-tight leading-none mb-1">Admin Console</h1>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest leading-none">System Overview</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 mt-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`${isActive ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface'} px-4 py-3 flex items-center gap-3 font-headline text-sm font-bold rounded-xl transition-all duration-200 group`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>{link.icon}</span> 
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="px-6 mt-auto space-y-4 pt-6 border-t border-surface-container">
        <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all outline-none shadow-md">
           Generate Report
        </button>
        <div className="pt-2 flex flex-col gap-1">
          <Link href="/support" className="text-on-surface-variant px-2 py-2 flex items-center gap-3 font-headline text-xs font-bold hover:bg-surface rounded-lg transition-all group">
            <span className="material-symbols-outlined text-[1rem] group-hover:text-on-surface transition-colors">help</span> Help Center
          </Link>
          <button className="text-error/80 px-2 py-2 flex items-center gap-3 font-headline text-xs font-bold hover:bg-error/10 hover:text-error rounded-lg transition-all text-left">
            <span className="material-symbols-outlined text-[1rem]">logout</span> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
