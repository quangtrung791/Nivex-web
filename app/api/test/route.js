import { prisma } from "../../lib/prisma";

// Prisma cần Node runtime (không chạy ở Edge)
export const runtime = "nodejs";

// GET: meta + list rows
export async function GET() {
  try {
    const [meta] = await prisma.$queryRaw`
      SELECT current_database() AS db, current_schema() AS schema
    `;
    const rows = await prisma.$queryRaw`
      SELECT id, name FROM public.test1 ORDER BY id
    `;
    return Response.json({ ok: true, meta, rows }, { status: 200 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// POST: { id, name }
export async function POST(req) {
  try {
    const { id, name } = await req.json();
    await prisma.$executeRaw`
      INSERT INTO public.test1 (id, name) VALUES (${id}, ${name})
    `;
    return Response.json({ ok: true }, { status: 201 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
