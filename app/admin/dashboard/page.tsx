"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

type TabType = "projects" | "messages";

interface Project {
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: string;
}

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("projects");
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Projects state
    const [projects, setProjects] = useState<Project[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    // Messages state
    const [messages, setMessages] = useState<Message[]>([]);

    // Fetch projects
    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Supabase error:", error.message);
        } else {
            setProjects(data || []);
        }
    };

    // Fetch messages
    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error.message);
        } else {
            setMessages(data || []);
        }
    };

    // Fetch data ketika tab berubah
    useEffect(() => {
        if (activeTab === "projects") {
            fetchProjects();
        } else if (activeTab === "messages") {
            fetchMessages();
        }
    }, [activeTab]);

    // Tambah project
    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("projects").insert([
            { title, description, url },
        ]);
        if (error) {
            console.error("Insert error:", error.message);
        } else {
            setTitle("");
            setDescription("");
            setUrl("");
            fetchProjects();
        }
    };

    // Hapus project
    const handleDeleteProject = async (id: number) => {
        if (!confirm("Hapus project ini?")) return;
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
            console.error("Delete error:", error.message);
        } else {
            setProjects((prev) => prev.filter((p) => p.id !== id));
        }
    };

    // Hapus message
    const handleDeleteMessage = async (id: number) => {
        if (!confirm("Hapus message ini?")) return;
        const { error } = await supabase.from("messages").delete().eq("id", id);
        if (error) {
            console.error("Delete error:", error.message);
        } else {
            setMessages((prev) => prev.filter((m) => m.id !== id));
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700/50 shadow-xl flex flex-col relative z-10">
                {/* Header */}
                <div className="p-6 border-b border-gray-700/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg shadow-lg shadow-emerald-500/50 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Admin
                            </h1>
                            <p className="text-xs text-gray-400">Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`group px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 w-full text-left ${activeTab === "projects"
                            ? "bg-emerald-500/20 text-emerald-400 border-l-4 border-emerald-400"
                            : "text-gray-300 hover:bg-gray-800/50 hover:text-emerald-400"
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <span className="font-semibold">Projects</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`group px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 w-full text-left ${activeTab === "messages"
                            ? "bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-400"
                            : "text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400"
                            }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="font-semibold">Messages</span>
                    </button>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-700/50">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                    >
                        {isLoggingOut ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Logging out...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative z-10">
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        {/* PROJECTS TAB */}
                        {activeTab === "projects" && (
                            <div>
                                <div className="mb-8">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                        Manage Projects
                                    </h1>
                                    <p className="text-gray-400">Tambah dan kelola project portfolio Anda</p>
                                </div>

                                {/* Form Tambah Project */}
                                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
                                    <h2 className="text-xl font-bold text-emerald-400 mb-6">Tambah Project Baru</h2>
                                    <form onSubmit={handleAddProject} className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Judul Project"
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                        <textarea
                                            placeholder="Deskripsi Project"
                                            rows={4}
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Project URL"
                                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                                        >
                                            Tambah Project
                                        </button>
                                    </form>
                                </div>

                                {/* List Projects */}
                                <div>
                                    <h2 className="text-2xl font-bold text-emerald-400 mb-4">Daftar Projects ({projects.length})</h2>
                                    {projects.length === 0 ? (
                                        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                            <p className="text-gray-400">Belum ada project</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {projects.map((proj) => (
                                                <div
                                                    key={proj.id}
                                                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all"
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-emerald-400">{proj.title}</h3>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {new Date(proj.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteProject(proj.id)}
                                                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all font-medium"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <p className="text-gray-300 mb-3">{proj.description}</p>
                                                    {proj.url && (
                                                        <a
                                                            href={proj.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm"
                                                        >
                                                            {proj.url} →
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* MESSAGES TAB */}
                        {activeTab === "messages" && (
                            <div>
                                <div className="mb-8">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                        Messages
                                    </h1>
                                    <p className="text-gray-400">Lihat pesan dari pengunjung portfolio</p>
                                </div>

                                {messages.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700/50">
                                        <p className="text-gray-400">Belum ada pesan</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-cyan-400">{msg.name}</h3>
                                                        <p className="text-sm text-gray-400">{msg.email}</p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(msg.created_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteMessage(msg.id)}
                                                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed">{msg.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}