import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await prisma.test1.findMany({
      orderBy: { id: 'asc' }
    });
    
    return NextResponse.json({
      ok: true,
      rows: rows,
      meta: {
        db: "neondb",
        schema: "public", 
        count: rows.length
      }
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id, name } = await request.json();
    
    if (!name || name.trim() === '') {
      return NextResponse.json({
        ok: false,
        error: "Name is required"
      }, { status: 400 });
    }
    
    let row;
    
    if (id && !isNaN(parseInt(id))) {
      row = await prisma.test1.upsert({
        where: { id: parseInt(id) },
        update: { name: name.trim() },
        create: { id: parseInt(id), name: name.trim() }
      });
    } else {
      row = await prisma.test1.create({
        data: { name: name.trim() }
      });
    }
    
    return NextResponse.json({
      ok: true,
      row: row
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}