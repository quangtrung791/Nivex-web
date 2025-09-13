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
    
    // Sử dụng upsert để tránh conflict với ID
    let newRow;
    
    if (body.id) {
      // Nếu có ID, dùng upsert
      newRow = await prisma.test1.upsert({
        where: { id: parseInt(body.id) },
        update: { name: body.name || 'Updated User' },
        create: { 
          id: parseInt(body.id),
          name: body.name || 'Test User'
        }
      });
    } else {
      // Nếu không có ID, tạo mới với auto-increment
      newRow = await prisma.test1.create({
        data: {
          name: body.name || 'Test User - ' + new Date().toISOString()
        }
      });
    }
    
    console.log("Created/Updated row:", newRow);
    
    return NextResponse.json({ 
      ok: true,
      row: newRow,
      message: "Record created/updated successfully" 
    });
  } catch (error) {
    console.error("Insert error:", error);
    
    // Log chi tiết lỗi để debug trên Vercel
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    return NextResponse.json({ 
      ok: false,
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      meta: error.meta || null
    }, { status: 500 });
  }
}