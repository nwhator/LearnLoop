"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      initials: "AR",
      bgClass: "bg-primary-container text-on-primary-container",
      name: "Alex Rivera",
      email: "alex.r@learnloop.edu",
      status: "Active",
      statusClass: "bg-green-100 text-green-700",
      xp: "12,450",
      level: 24,
      department: "Computer Science / ML"
    },
    {
      initials: "SC",
      bgClass: "bg-secondary-container text-on-secondary-container",
      name: "Sarah Chen",
      email: "s.chen@gmail.com",
      status: "Idle",
      statusClass: "bg-yellow-100 text-yellow-700",
      xp: "8,200",
      level: 16,
      department: "UX Design / Figma"
    },
    {
      initials: "MJ",
      bgClass: "bg-tertiary-container text-on-tertiary-container",
      name: "Marcus Jordan",
      email: "mjordan@web3.io",
      status: "Active",
      statusClass: "bg-green-100 text-green-700",
      xp: "45,100",
      level: 89,
      department: "Digital Marketing"
    }
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      
      {/* SideNavBar (Admin Portal Anchor) */}
      <aside className="w-64 fixed left-0 top-0 h-screen bg-white border-r border-surface-container flex flex-col pt-8 pb-6 gap-2 z-50 transition-all duration-300 ease-in-out shadow-sm">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-premium">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            </div>
            <div>
              <h1 className="text-xl font-black font-headline text-primary tracking-tight">Admin Portal</h1>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">System Overview</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 mt-4">
          <Link href="/admin/dashboard" className="bg-primary/10 text-primary rounded-xl px-4 py-3 flex items-center gap-3 font-headline text-sm font-bold shadow-sm transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span> Analytics
          </Link>
          <Link href="/admin/users" className="text-on-surface-variant hover:text-on-surface px-4 py-3 flex items-center gap-3 font-headline text-sm font-bold hover:bg-surface rounded-xl transition-all duration-200 group">
            <span className="material-symbols-outlined group-hover:text-secondary transition-colors">group</span> Users
          </Link>
          <Link href="/studio" className="text-on-surface-variant hover:text-on-surface px-4 py-3 flex items-center gap-3 font-headline text-sm font-bold hover:bg-surface rounded-xl transition-all duration-200 group">
             <span className="material-symbols-outlined group-hover:text-tertiary transition-colors">psychology</span> AI Controls
          </Link>
          <Link href="#" className="text-on-surface-variant hover:text-on-surface px-4 py-3 flex items-center gap-3 font-headline text-sm font-bold hover:bg-surface rounded-xl transition-all duration-200 group">
            <span className="material-symbols-outlined group-hover:text-green-500 transition-colors">payments</span> Billing
          </Link>
          <Link href="/admin/moderation" className="text-on-surface-variant hover:text-on-surface px-4 py-3 flex items-center gap-3 font-headline text-sm font-bold hover:bg-surface rounded-xl transition-all duration-200 group">
            <span className="material-symbols-outlined group-hover:text-error transition-colors">gavel</span> Moderation
          </Link>
        </nav>
        
        <div className="px-6 mt-auto space-y-4 pt-6 border-t border-surface-container">
          <button className="w-full bg-surface border border-surface-container text-on-surface py-3 rounded-xl font-bold text-sm hover:bg-surface-bright active:scale-95 transition-all outline-none shadow-sm flex justify-center items-center gap-2">
             <span className="material-symbols-outlined text-lg">download</span> Export Data
          </button>
          <div className="pt-2 flex flex-col gap-1">
            <Link href="/legal" className="text-on-surface-variant px-2 py-2 flex items-center gap-3 font-headline text-xs font-bold hover:bg-surface rounded-lg transition-all">
              <span className="material-symbols-outlined text-[1rem]">policy</span> Legal
            </Link>
            <Link href="/support" className="text-on-surface-variant px-2 py-2 flex items-center gap-3 font-headline text-xs font-bold hover:bg-surface rounded-lg transition-all">
              <span className="material-symbols-outlined text-[1rem]">help_center</span> Support
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 p-10 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black font-headline text-on-surface tracking-tight">System Insights</h2>
            <p className="text-on-surface-variant font-medium mt-1">Real-time platform health and performance metrics</p>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="w-12 h-12 bg-white border border-surface-container rounded-full text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors shadow-sm flex items-center justify-center outline-none">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-4 bg-white border border-surface-container p-2 pr-6 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary-container text-primary font-bold flex justify-center items-center text-xl font-headline border-2 border-white shadow-sm">A</div>
              <div className="text-left">
                <p className="text-sm font-black font-headline leading-none text-on-surface tracking-wide">LearnLoop Admin</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Superuser</p>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Analytics */}
        <section className="grid grid-cols-12 gap-8 mb-16">
          
          {/* Revenue Main Card */}
          <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-3xl shadow-sm border border-surface-container relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-on-surface-variant text-sm font-black uppercase tracking-widest mb-2 font-headline">Total Revenue</p>
                  <h3 className="text-5xl font-black font-headline text-on-surface">$142,850.00</h3>
                </div>
                <div className="bg-tertiary/10 text-tertiary border border-tertiary/20 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm">trending_up</span> +12.5%
                </div>
              </div>
              
              <div className="h-48 w-full flex items-end gap-3 lg:gap-4 mt-auto">
                {/* Custom Gradient Bar Chart */}
                <div className="flex-1 bg-primary/10 rounded-t-xl h-24 group-hover:h-32 transition-all duration-500 ease-out"></div>
                <div className="flex-1 bg-primary/10 rounded-t-xl h-32 group-hover:h-40 transition-all duration-500 ease-out delay-75"></div>
                <div className="flex-1 bg-primary/20 rounded-t-xl h-20 group-hover:h-24 transition-all duration-500 ease-out delay-100"></div>
                <div className="flex-1 bg-primary/40 rounded-t-xl h-44 group-hover:h-48 transition-all duration-500 ease-out delay-150"></div>
                <div className="flex-1 bg-primary/60 rounded-t-xl h-36 group-hover:h-44 transition-all duration-500 ease-out delay-200"></div>
                <div className="flex-1 bg-primary rounded-t-xl h-48 group-hover:h-[220px] transition-all duration-500 ease-out delay-300 shadow-premium"></div>
              </div>
            </div>
          </div>
          
          {/* Active Users Small Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-secondary to-purple-800 text-white p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-premium group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform duration-700 group-hover:scale-110">
              <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex justify-center items-center mb-6 border border-white/20 shadow-inner">
                 <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-2 font-headline">Active Users</p>
              <h3 className="text-6xl font-black font-headline tracking-tighter drop-shadow-sm">24.8k</h3>
            </div>
            
            <div className="mt-12 flex items-center justify-between relative z-10 w-full bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-blue-200 shadow-sm z-30"></div>
                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-green-200 shadow-sm z-20"></div>
                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-yellow-200 shadow-sm z-10"></div>
              </div>
              <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">+412 today</span>
            </div>
          </div>

          {/* Quiz Completion Stats */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white p-8 rounded-3xl border border-surface-container shadow-sm group hover:border-surface-variant transition-colors">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black font-headline text-on-surface text-xl">Quiz Engagement</h4>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-primary/20">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3 text-on-surface">
                  <span>Completion Rate</span>
                  <span className="text-primary font-black">88%</span>
                </div>
                <div className="h-3 bg-surface-container rounded-full overflow-hidden shadow-inner flex">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[88%] rounded-full shadow-sm"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-3 text-on-surface">
                  <span>Average Score</span>
                  <span className="text-secondary font-black">74%</span>
                </div>
                <div className="h-3 bg-surface-container rounded-full overflow-hidden shadow-inner flex">
                  <div className="h-full bg-gradient-to-r from-secondary to-secondary-container w-[74%] rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Creation Card */}
          <div className="col-span-12 lg:col-span-8 bg-surface border border-surface-container p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
            <div className="flex-1">
              <h4 className="text-2xl font-black font-headline text-on-surface mb-4">Topic Popularity Index</h4>
              <p className="text-on-surface-variant font-medium mb-8 text-lg leading-relaxed max-w-lg">AI & Machine Learning courses are currently trending +40% higher than last month.</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-5 py-2.5 bg-tertiary/10 text-tertiary border border-tertiary/20 text-xs font-black rounded-full uppercase tracking-wider shadow-sm">AI Ethics</span>
                <span className="px-5 py-2.5 bg-white border border-surface-container text-on-surface text-xs font-black rounded-full uppercase tracking-wider shadow-sm hover:border-primary transition-colors cursor-pointer">Neural Nets</span>
                <span className="px-5 py-2.5 bg-white border border-surface-container text-on-surface text-xs font-black rounded-full uppercase tracking-wider shadow-sm hover:border-primary transition-colors cursor-pointer">Python Mastery</span>
              </div>
            </div>
            <div className="w-40 h-40 bg-white shadow-sm border border-surface-container rounded-[2rem] flex items-center justify-center -rotate-6 hover:rotate-0 transition-transform duration-500">
              <span className="material-symbols-outlined text-[80px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
          </div>

        </section>

        {/* User Management Table Section */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-surface-container overflow-hidden mb-16">
          <div className="px-10 py-8 border-b border-surface-container flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h3 className="text-3xl font-black tracking-tight font-headline text-on-surface">User Management</h3>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students..." 
                  className="w-full md:w-72 pl-12 pr-4 py-3 bg-surface border border-surface-container rounded-full text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white transition-all outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 border border-surface-container bg-surface rounded-full text-on-surface text-sm font-bold hover:bg-surface-bright active:scale-95 transition-all outline-none">
                <span className="material-symbols-outlined text-lg">filter_list</span> Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-surface/50 border-b border-surface-container">
                <tr>
                  <th className="px-10 py-5 text-xs font-black text-on-surface-variant uppercase tracking-widest">User</th>
                  <th className="px-10 py-5 text-xs font-black text-on-surface-variant uppercase tracking-widest">Status</th>
                  <th className="px-10 py-5 text-xs font-black text-on-surface-variant uppercase tracking-widest">Experience (XP)</th>
                  <th className="px-10 py-5 text-xs font-black text-on-surface-variant uppercase tracking-widest">Board Assignment</th>
                  <th className="px-10 py-5 text-xs font-black text-on-surface-variant uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container bg-white">
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${user.bgClass} flex items-center justify-center font-bold text-lg font-headline border-2 border-white shadow-sm`}>{user.initials}</div>
                        <div>
                          <p className="font-bold text-on-surface font-headline">{user.name}</p>
                          <p className="text-xs text-on-surface-variant font-medium mt-1">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm">
                      <span className={`px-4 py-1.5 ${user.statusClass} border border-current/20 text-[10px] font-black uppercase rounded-full tracking-wider inline-block`}>{user.status}</span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <span className="font-black font-headline text-secondary text-base">{user.xp}</span>
                        <span className="text-[10px] bg-secondary/10 border border-secondary/20 px-2 py-1 rounded text-secondary font-black tracking-wider uppercase">LVL {user.level}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm font-bold text-on-surface">{user.department}</td>
                    <td className="px-10 py-6 text-center">
                      <button className="text-on-surface-variant hover:text-primary hover:bg-primary/5 p-2 rounded-full transition-colors outline-none cursor-pointer">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-10 py-6 bg-surface flex items-center justify-between border-t border-surface-container">
            <p className="text-sm font-bold text-on-surface-variant">Showing 3 of 12,402 students</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white border border-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-sm active:scale-95 outline-none">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary shadow-md text-white flex items-center justify-center text-sm font-black transition-transform hover:scale-105 active:scale-95 outline-none font-headline">1</button>
              <button className="w-10 h-10 rounded-full bg-white border border-surface-container flex items-center justify-center text-on-surface text-sm font-bold shadow-sm hover:border-primary/50 transition-colors active:scale-95 outline-none font-headline">2</button>
              <button className="w-10 h-10 rounded-full bg-white border border-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-sm active:scale-95 outline-none">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Content Management Bento */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <h3 className="text-3xl font-black font-headline tracking-tight text-on-surface">Content Inventory</h3>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full font-bold shadow-premium hover:shadow-lg hover:brightness-110 active:scale-95 transition-all tracking-wide outline-none">
                <span className="material-symbols-outlined text-[1.25rem]">add</span> Create Module
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Topic Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-surface-container border-t-[8px] border-t-primary flex flex-col shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface px-2.5 py-1 rounded-md border border-surface-container">14 Quizzes</span>
              </div>
              <h4 className="text-xl font-black font-headline mb-3 text-on-surface">Advanced React Hooks</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-10 leading-relaxed flex-1">Deep dive into useEffect, useMemo, and custom hooks architecture.</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-surface-container mt-auto">
                <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> Published</span>
                <button className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors bg-surface hover:bg-primary/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-primary/20">Edit</button>
              </div>
            </div>

            {/* Topic Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-surface-container border-t-[8px] border-t-secondary flex flex-col shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-inner group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>brush</span>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface px-2.5 py-1 rounded-md border border-surface-container">8 Quizzes</span>
              </div>
              <h4 className="text-xl font-black font-headline mb-3 text-on-surface">UI/UX Psychology</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-10 leading-relaxed flex-1">Understanding cognitive load and gestalt principles in design.</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-surface-container mt-auto">
                <span className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-secondary"></div> Draft</span>
                <button className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors bg-surface hover:bg-secondary/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-secondary/20">Edit</button>
              </div>
            </div>

            {/* Topic Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-surface-container border-t-[8px] border-t-tertiary flex flex-col shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary border border-tertiary/20 shadow-inner group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                </div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface px-2.5 py-1 rounded-md border border-surface-container">22 Quizzes</span>
              </div>
              <h4 className="text-xl font-black font-headline mb-3 text-on-surface">Data Science Fundamentals</h4>
              <p className="text-sm font-medium text-on-surface-variant mb-10 leading-relaxed flex-1">Linear regression, probability theory, and clean data cleaning.</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-surface-container mt-auto">
                <span className="text-xs font-black text-tertiary uppercase tracking-widest flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div> Published</span>
                <button className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-tertiary transition-colors bg-surface hover:bg-tertiary/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-tertiary/20">Edit</button>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
