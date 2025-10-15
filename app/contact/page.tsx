"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        const { error: insertError } = await supabase.from("messages").insert([
            { name, email, message }
        ]);

        if (insertError) {
            setError("Failed to send message. Please try again.");
            console.error("Supabase insert error:", insertError.message);
        } else {
            setSuccess("Message sent successfully! 🎉");
            setName("");
            setEmail("");
            setMessage("");

            // Auto-hide success message after 5 seconds
            setTimeout(() => setSuccess(""), 5000);
        }
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-20 px-6">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-2xl mx-auto z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl shadow-lg shadow-emerald-500/50 mb-6">
                        <svg
                            className="w-10 h-10 text-white"
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
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full mb-6"></div>

                    <p className="text-lg text-gray-300">
                        I&apos;d love to hear from you. Send me a message!
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
                >
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-start gap-3 animate-fade-in">
                            <svg
                                className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-emerald-300 font-medium">{success}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3 animate-fade-in">
                            <svg
                                className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-red-300 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-emerald-300">
                                Your Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-emerald-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Message Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-emerald-300">
                                Your Message
                            </label>
                            <textarea
                                placeholder="Write your message here..."
                                rows={6}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
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
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                                Send Message
                            </span>
                        )}
                    </button>
                </form>

                {/* Footer Message */}
                <p className="text-center text-gray-400 mt-8">
                    I ll get back to you as soon as possible 🚀
                </p>

                {/* Bottom Gradient Line */}
                <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            </div>
        </main>
    );
}