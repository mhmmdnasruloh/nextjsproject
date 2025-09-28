"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    // Fetch projects dari Supabase
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

    useEffect(() => {
        fetchProjects();
    }, []);

    // Tambah project
    const handleAdd = async (e: React.FormEvent) => {
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
    const handleDelete = async (id: number) => {
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
            console.error("Delete error:", error.message);
        } else {
            setProjects((prev) => prev.filter((p) => p.id !== id)); // update state
        }
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

            {/* Form Tambah Project */}
            <form
                onSubmit={handleAdd}
                className="bg-gray-800 p-6 rounded-lg shadow mb-8"
            >
                <h2 className="text-xl font-semibold mb-4">Tambah Project</h2>
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Project URL"
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Tambah
                </button>
            </form>

            {/* List Project */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Daftar Projects</h2>
                {projects.length === 0 ? (
                    <p className="text-gray-400">Belum ada project.</p>
                ) : (
                    <ul className="space-y-4">
                        {projects.map((proj) => (
                            <li
                                key={proj.id}
                                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-bold">{proj.title}</h3>
                                    <p className="text-gray-300 text-sm">{proj.description}</p>
                                    {proj.url && (
                                        <a
                                            href={proj.url}
                                            target="_blank"
                                            className="text-blue-400 text-sm hover:underline"
                                        >
                                            {proj.url}
                                        </a>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(proj.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
