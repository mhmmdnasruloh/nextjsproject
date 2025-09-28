import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: ambil semua project
export async function GET() {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
}

// POST: tambah project baru
export async function POST(req: Request) {
    const body = await req.json();
    const { title, description, url } = body;

    const { error } = await supabase.from("projects").insert([
        { title, description, url },
    ]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Project berhasil ditambahkan" }, { status: 201 });
}
