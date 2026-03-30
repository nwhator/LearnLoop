"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface DBUser {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  initials?: string | null;
  status: string | null;
  is_banned: boolean | null;
  created_at: string | null;
}

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter((user) => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-headline font-bold text-primary">Loading records...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <AdminSidebar />

      <main className="ml-64 min-h-screen">
        <AdminHeader 
          title="User Management" 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          placeholder="Search by name, email, or ID..."
        />

        <div className="p-10 space-y-10 max-w-[1600px] mx-auto">
            
            {/* Stats Summary Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard 
                  title="Total Users" 
                  value={users.length.toLocaleString()} 
                  icon="group" 
                  trend="+12% from last month" 
                  color="primary"
                />
                <StatCard 
                  title="Active Now" 
                  value={users.filter(u => u.status === 'Active').length.toLocaleString()} 
                  icon="bolt" 
                  trend="High engagement" 
                  color="secondary"
                />
                <StatCard 
                  title="Moderated" 
                  value={users.filter(u => u.is_banned).length.toLocaleString()} 
                  icon="block" 
                  trend="Recently banned: 2" 
                  color="error"
                />
            </section>

            {/* Table Controls */}
            <section className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-[2rem] border border-surface-container shadow-sm">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-surface border border-surface-container text-on-surface font-bold rounded-full shadow-sm hover:bg-surface-bright active:scale-95 transition-all outline-none">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                        Filters
                    </button>
                    <div className="h-8 w-px bg-surface-container"></div>
                    <span className="text-sm text-on-surface-variant font-bold">Showing {filteredUsers.length} of {users.length} users</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold shadow-md hover:brightness-110 active:scale-95 transition-all outline-none">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export CSV
                    </button>
                </div>
            </section>

            {/* User Data Table */}
            <section className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-surface-container">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-surface border-b border-surface-container text-on-surface-variant font-headline uppercase text-xs tracking-widest">
                                <th className="px-8 py-5 font-black">User</th>
                                <th className="px-8 py-5 font-black text-center">Level</th>
                                <th className="px-8 py-5 font-black min-w-[180px]">XP Status</th>
                                <th className="px-8 py-5 font-black">Status</th>
                                <th className="px-8 py-5 font-black">Join Date</th>
                                <th className="px-8 py-5 font-black text-right min-w-[200px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className={`hover:bg-surface/50 transition-colors group ${user.is_banned ? 'bg-error/5 border-l-4 border-error' : 'border-l-4 border-transparent'}`}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg font-headline border border-primary/20 shadow-sm">
                                                {user.initials || user.name.at(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold font-headline text-on-surface">{user.name}</p>
                                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-black uppercase tracking-wider inline-block">Lvl {user.level || 1}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-black text-on-surface tracking-tight">{(user.xp || 0).toLocaleString()} XP</span>
                                            <div className="h-1.5 w-24 bg-surface-container rounded-full overflow-hidden shadow-inner flex">
                                                <div className="h-full bg-gradient-to-r from-secondary to-purple-500 rounded-full" style={{ width: `${(user.xp % 1000) / 10}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${user.is_banned ? 'text-error' : 'text-green-600'}`}>
                                            <span className={`w-2 h-2 ${user.is_banned ? 'bg-error' : 'bg-green-500 animate-pulse'} rounded-full`}></span>
                                            {user.is_banned ? 'Banned' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-on-surface">
                                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2.5 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-full transition-colors outline-none" title="View Analytics">
                                                <span className="material-symbols-outlined text-lg">analytics</span>
                                            </button>
                                            <button className="p-2.5 bg-error/5 text-error hover:bg-error hover:text-white rounded-full transition-colors outline-none" title={user.is_banned ? "Unban" : "Ban User"}>
                                                <span className="material-symbols-outlined text-lg">{user.is_banned ? "verified_user" : "block"}</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string, icon: string, trend: string, color: 'primary' | 'secondary' | 'error' }) {
  const colorClasses = {
    primary: "border-b-primary group-hover:bg-primary group-hover:text-white",
    secondary: "border-b-secondary group-hover:bg-secondary group-hover:text-white",
    error: "border-b-error group-hover:bg-error group-hover:text-white",
  };
  
  const iconBgClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    error: "bg-error/10 text-error",
  };

  return (
    <div className={`bg-white p-8 rounded-3xl shadow-sm border border-surface-container border-b-[6px] transition-all duration-300 group hover:shadow-md ${color === 'primary' ? 'border-b-primary' : color === 'secondary' ? 'border-b-secondary' : 'border-b-error'}`}>
      <div className="flex justify-between items-start">
        <div>
            <p className="text-sm font-black text-on-surface-variant group-hover:text-on-surface uppercase tracking-widest font-headline">{title}</p>
            <h3 className="text-4xl font-black mt-2 text-on-surface tracking-tight">{value}</h3>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors border ${iconBgClasses[color]} group-hover:bg-white group-hover:text-on-surface`}>
            <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
      </div>
      <div className={`mt-8 flex items-center gap-2 text-sm font-bold ${color === 'error' ? 'text-on-surface-variant' : 'text-green-600'}`}>
        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{color === 'error' ? 'gavel' : 'trending_up'}</span>
        <span>{trend}</span>
      </div>
    </div>
  );
}
