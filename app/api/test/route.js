import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET /api/test called");
    
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
    
    // Đơn giản hóa - không cần connect manual vì Prisma tự handle
    
    // Validate input
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ 
        ok: false,
        error: "Name is required"
      }, { status: 400 });
    }
    
    let newRow;
    
    // Đơn giản hóa logic - chỉ dùng create hoặc update
    if (body.id && !isNaN(parseInt(body.id))) {
      // Dùng upsert cho case có ID
      newRow = await prisma.test1.upsert({
        where: { id: parseInt(body.id) },
        update: { name: body.name.trim() },
        create: { 
          id: parseInt(body.id),
          name: body.name.trim()
        }
      });
      console.log("Upserted record:", newRow);
    } else {
      // Tạo mới với auto-increment
      newRow = await prisma.test1.create({
        data: {
          name: body.name.trim()
        }
      });
      console.log("Created new record:", newRow);
    }
    
    return NextResponse.json({ 
      ok: true,
      row: newRow,
      message: "Record saved successfully" 
    });
    
  } catch (error) {
    console.error("POST /api/test error:", error);
    
    return NextResponse.json({ 
      ok: false,
      error: error.message || "Internal server error",
      code: error.code || 'UNKNOWN_ERROR',
      prismaCode: error.code,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}