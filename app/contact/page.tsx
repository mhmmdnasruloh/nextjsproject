"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from("messages").insert([
            { name, email, message }
        ]);

        if (error) {
            console.error("Supabase insert error:", error.message);
        } else {
            setSuccess("Pesan berhasil dikirim!");
            setName("");
            setEmail("");
            setMessage("");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Contact Me</h1>

                {success && <p className="text-green-500 mb-4">{success}</p>}

                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 mb-4 border rounded text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 mb-4 border rounded text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Your Message"
                    className="w-full p-2 mb-4 border rounded text-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </main>
    );
}
