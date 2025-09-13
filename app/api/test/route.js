import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Đảm bảo sử dụng Node.js runtime thay vì Edge
export const runtime = 'nodejs';

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
  console.log("POST request received"); // Debug log
  
  try {
    const body = await request.json();
    console.log("Request body:", body); // Debug log
    
    const { id, name } = body;
    
    if (!name || name.trim() === '') {
      console.log("Name validation failed"); // Debug log
      return NextResponse.json({
        ok: false,
        error: "Name is required"
      }, { status: 400 });
    }
    
    console.log("About to query database with Prisma"); // Debug log
    
    let row;
    
    if (id && !isNaN(parseInt(id))) {
      console.log("Upserting with id:", parseInt(id)); // Debug log
      row = await prisma.test1.upsert({
        where: { id: parseInt(id) },
        update: { name: name.trim() },
        create: { id: parseInt(id), name: name.trim() }
      });
    } else {
      console.log("Creating new record"); // Debug log
      row = await prisma.test1.create({
        data: { name: name.trim() }
      });
    }
    
    console.log("Database operation successful:", row); // Debug log
    
    return NextResponse.json({
      ok: true,
      row: row
    });
  } catch (error) {
    console.error("POST error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return NextResponse.json({
      ok: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}