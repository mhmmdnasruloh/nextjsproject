"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>([]);

  // Fetch project dari Supabase
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Supabase error:", error.message);
    } else {
      setProjects(data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gray-950 shadow">
        <h1 className="text-5xl font-bold mb-4">Hi, I’m Arul 👋</h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-6">
          Saya seorang developer yang suka bikin project dengan Next.js, Supabase,
          dan teknologi modern lainnya. Ini adalah portfolio saya 🚀
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Lihat Projects
          </Link>
          <Link
            href="/about"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Projects</h2>
        {projects.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada project.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-gray-800 shadow-lg rounded-lg p-4 hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {proj.title || proj.tittle}
                </h3>
                <p className="text-sm text-gray-300 mb-2">{proj.description}</p>
                <Link
                  href={proj.url}
                  target="_blank"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Visit Project →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
