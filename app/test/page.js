import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const [ro, rec, user] = await Promise.all([
    prisma.$queryRaw`SHOW transaction_read_only`,
    prisma.$queryRaw`SELECT pg_is_in_recovery()`,
    prisma.$queryRaw`SELECT current_user`
  ]);
  return NextResponse.json({
    on_vercel: true,
    transaction_read_only: (ro as any)[0].transaction_read_only, // 'off' = RW
    pg_is_in_recovery: (rec as any)[0].pg_is_in_recovery,        // false = primary
    current_user: (user as any)[0].current_user
  });
}