"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch project dari Supabase
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        // Filter: hanya tampilkan project yang statusnya published/active
        // atau tambahkan field "is_published" di database
        const filteredData = data?.filter((proj) => proj.is_published !== false) || [];
        setProjects(filteredData);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>

        <div className="relative z-10 space-y-6 animate-fade-in">
          <div className="inline-block">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Hi, I'm Arul 👋
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Saya seorang developer yang suka bikin project dengan{" "}
            <span className="text-emerald-400 font-semibold">Next.js</span>,{" "}
            <span className="text-cyan-400 font-semibold">Supabase</span>, dan
            teknologi modern lainnya.
          </p>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ini adalah portfolio saya 🚀
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Link
              href="/about"
              className="group relative bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105"
            >
              <span className="relative z-10">About Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/contact"
              className="group relative bg-gray-800/50 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold border-2 border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105"
            >
              <span className="relative z-10">Contact</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Latest Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <p className="text-gray-400 text-lg">Belum ada project.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((proj, index) => (
              <div
                key={proj.id}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-300"></div>

                <div className="relative z-10">
                  {/* Project Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {proj.title || proj.tittle}
                  </h3>

                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>

                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-all duration-300 group/link"
                  >
                    Visit Project
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
    </main>
  );
}