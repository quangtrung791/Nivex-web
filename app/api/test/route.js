import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET /api/test called");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    
    // Test connection
    await prisma.$connect();
    console.log("Database connected successfully");
    
    const rows = await prisma.test1.findMany({
      orderBy: { id: 'asc' }
    });
    
    console.log("Found rows:", rows);
    
    return NextResponse.json({ 
      ok: true,
      rows: rows,
      meta: {
        db: "nivex",
        schema: "public",
        count: rows.length
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ 
      ok: false,
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("POST /api/test called with:", body);
    
    const newRow = await prisma.test1.create({
      data: {
        id: body.id || undefined, // Let DB auto-increment if not provided
        name: body.name || 'Test User'
      }
    });
    
    console.log("Created row:", newRow);
    
    return NextResponse.json({ 
      ok: true,
      row: newRow,
      message: "Record created successfully" 
    });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ 
      ok: false,
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}