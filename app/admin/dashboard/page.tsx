"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login"); // balik ke login page
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900/90 backdrop-blur-sm text-white flex flex-col justify-between border-r border-gray-700/50 shadow-2xl">
                <div>
                    <div className="p-6 text-2xl font-bold border-b border-gray-700/50 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </div>
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link
                            href="/admin/projects"
                            className="px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-200 border border-transparent hover:border-blue-500/30 flex items-center space-x-2"
                        >
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Projects</span>
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-600/20 hover:to-teal-600/20 transition-all duration-200 border border-transparent hover:border-green-500/30 flex items-center space-x-2"
                        >
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Messages</span>
                        </Link>
                    </nav>
                </div>
                {/* Tombol Logout di pojok bawah */}
                <div className="p-4 border-t border-gray-700/50">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-red-500/20 transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-800/30 backdrop-blur-sm">
                <div className="h-full bg-gradient-to-tl from-gray-800/20 via-transparent to-blue-900/10">
                    {children}
                </div>
            </main>
        </div>
    );
}