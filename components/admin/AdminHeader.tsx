"use client";

import { useState } from "react";

interface AdminHeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export default function AdminHeader({ title, searchQuery, onSearchChange, placeholder }: AdminHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-surface-container sticky top-0 z-40 shadow-sm h-20 flex items-center px-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <h2 className="text-2xl font-black tracking-tight text-surface-on font-headline">{title}</h2>
          <div className="relative w-96 hidden md:block">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-surface-variant z-10">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder || "Search items..."} 
              className="w-full pl-12 pr-4 py-2.5 bg-surface border border-surface-container rounded-full text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none placeholder:text-surface-variant"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <button className="w-10 h-10 bg-surface border border-surface-container rounded-full text-surface-variant hover:text-primary transition-colors flex justify-center items-center shadow-sm relative">
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-white shadow-sm"></span>
          </button>
          <button className="w-10 h-10 bg-surface border border-surface-container rounded-full text-surface-variant hover:text-primary transition-colors flex justify-center items-center shadow-sm">
            <span className="material-symbols-outlined text-lg">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface flex justify-center items-center font-bold text-primary shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
