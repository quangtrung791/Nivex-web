import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.test1.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json({
      ok: true,
      rows,
      meta: { db: process.env.PGDATABASE ?? "neondb", schema: "public", count: rows.length },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, name } = await req.json();
    if (!name?.trim()) return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });

    const row = id
      ? await prisma.test1.upsert({
          where: { id: Number(id) },
          update: { name: name.trim() },
          create: { id: Number(id), name: name.trim() },
        })
      : await prisma.test1.create({ data: { name: name.trim() } });

    return NextResponse.json({ ok: true, row });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
