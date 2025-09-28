export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-900 text-white py-16 px-6">
            <section className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
                <p className="text-lg text-gray-300 mb-8 text-center">
                    Halo 👋, saya <span className="font-semibold">Arul</span>, seorang mahasiswa
                    Sistem Informasi yang juga suka ngulik web development.
                    Saat ini saya banyak belajar <span className="text-blue-400">Next.js</span>,{" "}
                    <span className="text-green-400">Supabase</span>, dan{" "}
                    <span className="text-yellow-400">PHP/Laravel</span>.
                </p>

                {/* Skills Section */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">My Skills</h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <li className="bg-gray-700 p-3 rounded text-center">HTML & CSS</li>
                        <li className="bg-gray-700 p-3 rounded text-center">JavaScript</li>
                        <li className="bg-gray-700 p-3 rounded text-center">Next.js</li>
                        <li className="bg-gray-700 p-3 rounded text-center">Supabase</li>
                        <li className="bg-gray-700 p-3 rounded text-center">PHP / Laravel</li>
                        <li className="bg-gray-700 p-3 rounded text-center">MySQL</li>
                    </ul>
                </div>

                {/* Contact Links */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Find Me Online</h2>
                    <div className="flex justify-center gap-6">
                        <a
                            href="https://github.com/username"
                            target="_blank"
                            className="text-blue-400 hover:underline"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/username"
                            target="_blank"
                            className="text-blue-400 hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:youremail@example.com"
                            className="text-blue-400 hover:underline"
                        >
                            Email
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
