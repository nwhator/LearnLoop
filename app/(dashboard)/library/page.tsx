"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function TopicLibraryPage() {
  const level = useStore((state) => state.level);

  return (
    <div className="bg-surface text-surface-on min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-primary font-headline tracking-tight">LearnLoop</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Dashboard</Link>
            <Link href="/library" className="text-primary font-bold border-b-2 border-primary font-headline px-3 py-1">Library</Link>
            <Link href="/missions" className="text-surface-variant font-medium font-headline hover:bg-surface-container/50 transition-colors px-3 py-1 rounded-lg">Missions</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 gap-2 border border-surface-container">
            <span className="material-symbols-outlined text-surface-variant text-sm">search</span>
            <input type="text" placeholder="Search topics..." className="bg-transparent border-none focus:ring-0 text-sm w-48 font-medium outline-none text-surface-on" />
          </div>
          <div className="flex items-center gap-3">
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">bolt</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">workspace_premium</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container rounded-full transition-all active:scale-95">local_fire_department</button>
          </div>
          <div className="h-10 w-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/10">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQEtUFszGwozEsi0rnbIl9d8hGS_3uJhShgepcWQ5hXwGfhj7NQ2uzK5L7m-8lqlB7tFW8ajpOyiBzjSI_QZHsK_M0UOghqNXOzIIzHgdfjvDjvD-ZCmRUQJQf35f9b3n09RPbFQqqCTCsG36-CYCDI7vMNzAqYHrgS2iePMfEeSLMk6y3sz4z3PQbeimNV4XzZsh2_e1EX0PfiLvgHh3dHvYW_AodmRMz7eCZsM7nCgR4-HOOs7LsW-mHcSlyRAfkCaMA--4zMN8" alt="User Avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-full w-64 fixed left-0 top-0 pt-20 bg-surface-bright border-r border-surface-container z-40">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <span className="text-surface-on font-bold text-lg font-headline">Alex Chen</span>
          <span className="text-surface-variant text-xs font-semibold uppercase tracking-wider">Level {level} Architect</span>
          <button className="mt-6 w-full bg-primary text-primary-on font-bold py-3 px-4 rounded-full shadow-md active:translate-x-1 transition-all duration-150 text-sm flex items-center justify-center gap-2 hover:brightness-110">
             Start Daily Quiz
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <Link href="/dashboard" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link href="/library" className="bg-primary/10 text-primary rounded-full px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm">
             <span className="material-symbols-outlined">local_library</span> Library
          </Link>
          <Link href="/leaderboard" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">leaderboard</span> Leaderboard
          </Link>
          <Link href="/missions" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">assignment_turned_in</span> Missions
          </Link>
          <Link href="/profile" className="text-surface-variant px-4 py-3 mx-2 flex items-center gap-3 font-semibold text-sm hover:bg-surface-container rounded-full transition-all">
             <span className="material-symbols-outlined">person</span> Profile
          </Link>
        </nav>
        <div className="p-4 mt-auto border-t border-surface-container flex flex-col gap-1">
          <Link href="/history" className="text-surface-variant px-4 py-2 flex items-center gap-3 text-xs font-bold hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-lg">history</span> History
          </Link>
          <Link href="/notifications" className="text-surface-variant px-4 py-2 flex items-center gap-3 text-xs font-bold hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-lg">notifications</span> Notifications
          </Link>
          <Link href="/settings" className="text-surface-variant px-4 py-2 flex items-center gap-3 text-xs font-bold hover:text-primary transition-colors">
             <span className="material-symbols-outlined text-lg">settings</span> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Header & Search */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-surface-on tracking-tight mb-4">Topic Library</h1>
            <p className="text-surface-variant text-lg max-w-2xl mb-8 leading-relaxed">Expand your horizons with curated study sets and interactive modules across dozens of specialized disciplines.</p>
            <div className="relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-primary text-2xl">search</span>
              </div>
              <input type="text" placeholder="Search for themes, subjects, or specific sets..." className="block w-full pl-16 pr-8 py-5 bg-white border border-surface-container rounded-xl shadow-glass focus:ring-2 focus:ring-primary text-lg font-medium placeholder-surface-variant outline-none transition-all" />
              <div className="absolute right-3 inset-y-3">
                <button className="h-full px-6 bg-primary text-primary-on font-bold rounded-lg active:scale-95 transition-transform">Explore</button>
              </div>
            </div>
          </header>

          {/* Category Filters */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-headline tracking-tight">Browse Categories</h2>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
              <button className="flex-none px-6 py-3 bg-primary text-primary-on rounded-full font-bold text-sm shadow-md">All Topics</button>
              {['Computer Science', 'Humanities', 'Natural Sciences', 'Business & Econ', 'Fine Arts', 'Medicine'].map(cat => (
                 <button key={cat} className="flex-none px-6 py-3 bg-white border border-surface-container text-surface-variant hover:bg-surface-container hover:text-surface-on rounded-full font-bold text-sm transition-colors shadow-sm">
                    {cat}
                 </button>
              ))}
            </div>
          </section>

          {/* Trending / Recommended */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-secondary text-3xl">trending_up</span>
              <h2 className="text-2xl font-extrabold font-headline tracking-tight">Trending Study Sets</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Featured Card (Large) */}
              <div className="md:col-span-8 bg-white border border-surface-container rounded-2xl overflow-hidden group hover:shadow-premium transition-all duration-300 flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-primary">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs1zdfeViIiHpPvVLzkSfpkxDKbxBEtk8-ymb4ThbGHh1cKe84Ng9X0KHXjhE04ZXz2mMMhV97PFwq7seflRoGEUFP8OImKefRoOcL2xg00rqCB7w1h4KJ99nuDhnjOUR9GlfHFXjO9ow3daDV1htL9q9lMSGpGCXaYFOxGLTZEwVu-i4Ka0Ly2c46DGMAMFMIBgnVgFtXizvIYnwqsqD_5gWZHzHdsOr-xfIe8M4tJgWQYcod7erxegweNP29XWIOL-C-EjEKX0s" alt="Visual" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-6 left-6 relative z-10">
                    <span className="bg-secondary-container text-secondary-on px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block uppercase tracking-widest backdrop-blur-md">Masterclass</span>
                    <h3 className="text-white text-2xl font-bold font-headline leading-tight drop-shadow-md">Quantum Computing: The Future of Logic</h3>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxoBA6ZzNpGUFCfU3kq9kiYFxjggYpH-75hw-GSHCF-ZAw71RXeLvdbQFXVoSt6xeOo7302eIzxK3sRD1266aM4VJt-BjqXmiRDO0bADcoOO2B4uClrKkIZ5pfoHYQdrY7bkX1w2dzlrKsHakEmaR3guf_4q8jhb2JilG8dmavM4GeJm5m9PqQU0JLncuVYYKjCfNI5umlA-MbukIQNvSlWuUYSihgYAZARcckT0FZyW86zGTVW0GHX3m2bVwCOm9ZhS3Pc91VNSw" alt="Author" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-surface-variant z-10 text-center leading-none tracking-tighter shadow-sm">+12</div>
                    </div>
                    <span className="text-surface-variant text-sm font-medium">1.2k Learners this week</span>
                  </div>
                  <p className="text-surface-variant mb-8 line-clamp-3 leading-relaxed">Dive deep into qubits, superposition, and entanglement. This comprehensive study set covers basic logic gates through to complex Shor's algorithm applications.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <button className="w-full bg-primary text-primary-on py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md">
                      <span className="material-symbols-outlined">play_circle</span> Start Quiz
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Featured Card */}
              <div className="md:col-span-4 bg-white border border-surface-container rounded-2xl p-8 flex flex-col hover:shadow-premium transition-all duration-300">
                <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-tertiary text-3xl">architecture</span>
                </div>
                <span className="text-tertiary font-bold text-xs uppercase tracking-widest mb-2 font-headline">Architecture</span>
                <h3 className="text-xl font-extrabold mb-4 leading-tight font-headline">Post-Modernist Principles</h3>
                <p className="text-surface-variant text-sm mb-8 leading-relaxed">Exploring the shift from functionalism to playful, eclectic forms in 20th-century urban design.</p>
                <div className="bg-surface rounded-xl p-4 mb-6 border border-surface-container">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-surface-variant">Your Progress</span>
                    <span className="text-xs font-bold text-primary">65%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="mt-auto flex gap-3">
                  <button className="flex-1 bg-primary text-primary-on py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform hover:brightness-110 shadow-md">Resume</button>
                  <button className="px-3 bg-surface hover:bg-surface-container rounded-xl flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-surface-variant">more_vert</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
          
          {/* Recommended Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold font-headline tracking-tight mb-8">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              <div className="bg-white border border-surface-container rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-premium transition-all duration-300 group">
                <div className="h-40 relative overflow-hidden bg-primary-container">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-colors" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-xs">timer</span> 15m
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Data Science</span>
                  <h4 className="font-bold text-surface-on mb-4 font-headline">Neural Networks 101</h4>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-xs text-surface-variant font-medium">
                      <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                    </div>
                    <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Start <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Duplicate structure for display grid layout matching original */}
              {[
                { title: 'Stoicism in Practice', cat: 'Humanities', time: '22m', color: 'bg-secondary-container' },
                { title: 'Biology Fundamentals', cat: 'Sciences', time: '12m', color: 'bg-tertiary-container' },
                { title: 'Global Market Dynamics', cat: 'Economics', time: '30m', color: 'bg-primary-container' }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-surface-container rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-premium transition-all duration-300 group">
                  <div className={`h-40 relative overflow-hidden ${item.color}`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay transition-colors" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-xs">timer</span> {item.time}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">{item.cat}</span>
                    <h4 className="font-bold text-surface-on mb-4 font-headline">{item.title}</h4>
                    <div className="flex items-center justify-between mt-auto">
                      <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all w-full justify-between">
                        Commence <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>

        </div>
      </main>
      
      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-secondary-on rounded-full shadow-premium flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

    </div>
  );
}
