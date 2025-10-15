export default function AboutPage() {
    const skills = [
        { name: "HTML & CSS", color: "from-orange-500 to-red-500" },
        { name: "JavaScript", color: "from-yellow-500 to-orange-500" },
        { name: "Next.js", color: "from-gray-700 to-gray-900" },
        { name: "Supabase", color: "from-emerald-500 to-green-600" },
        { name: "PHP / Laravel", color: "from-purple-500 to-indigo-600" },
        { name: "MySQL", color: "from-blue-500 to-cyan-600" }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-20 px-6">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <section className="relative max-w-5xl mx-auto z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        About Me
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full mb-8"></div>

                    <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Halo 👋, saya <span className="font-bold text-emerald-400">Arul</span>, seorang mahasiswa
                            Sistem Informasi yang juga suka ngulik web development.
                            Saat ini saya banyak belajar <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
                            <span className="text-emerald-400 font-semibold">Supabase</span>, dan{" "}
                            <span className="text-purple-400 font-semibold">PHP/Laravel</span>.
                        </p>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            My Skills
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20"
                            >
                                {/* Skill Badge */}
                                <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${skill.color} rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 rounded-xl transition-all duration-300"></div>

                                <div className="relative z-10">
                                    <p className="text-center font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors duration-300">
                                        {skill.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Links */}
                <div className="text-center">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Find Me Online
                        </h2>
                    </div>

                    <div className="flex justify-center gap-6">
                        <a
                            href="https://github.com/mhmmdnasruloh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
                        >
                            <span className="relative z-10 font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                GitHub
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 rounded-full transition-all duration-300"></div>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/mnasruloh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
                        >
                            <span className="relative z-10 font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                LinkedIn
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 rounded-full transition-all duration-300"></div>
                        </a>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="mt-16 flex justify-center">
                    <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                </div>
            </section>
        </main>
    );
}