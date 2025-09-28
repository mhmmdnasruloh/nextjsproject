"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) console.error("Supabase error:", error.message);
        else setMessages(data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <main className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-white">Messages</h1>
            <div className="bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-700">
                {messages.length === 0 ? (
                    <p className="text-gray-400">No messages yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {messages.map((msg) => (
                            <li key={msg.id} className="border-b border-gray-600 pb-2 last:border-b-0">
                                <p className="font-semibold text-white">{msg.name} ({msg.email})</p>
                                <p className="text-gray-300 mt-1">{msg.message}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(msg.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}