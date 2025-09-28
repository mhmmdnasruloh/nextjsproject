"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();

            if (data.session) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                if (pathname !== "/admin/login") {
                    router.push("/admin/login");
                }
            }
            setLoading(false);
        };

        checkSession();

        // dengerin perubahan login/logout
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                if (pathname !== "/admin/login") {
                    router.push("/admin/login");
                }
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [router, pathname]);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading...</p>
            </main>
        );
    }

    return <>{children}</>;
}
