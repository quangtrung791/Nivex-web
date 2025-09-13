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
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Database URL (partial):", process.env.DATABASE_URL?.substring(0, 30) + "...");
    
    // Test connection first
    await prisma.$connect();
    console.log("Database connection successful");
    
    // Validate input
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ 
        ok: false,
        error: "Name is required"
      }, { status: 400 });
    }
    
    let newRow;
    
    try {
      if (body.id && !isNaN(parseInt(body.id))) {
        // Nếu có ID, kiểm tra xem có tồn tại không
        const existing = await prisma.test1.findUnique({
          where: { id: parseInt(body.id) }
        });
        
        if (existing) {
          // Update existing record
          newRow = await prisma.test1.update({
            where: { id: parseInt(body.id) },
            data: { name: body.name.trim() }
          });
          console.log("Updated existing record:", newRow);
        } else {
          // Create with specific ID
          newRow = await prisma.test1.create({
            data: { 
              id: parseInt(body.id),
              name: body.name.trim()
            }
          });
          console.log("Created record with ID:", newRow);
        }
      } else {
        // Create new record with auto-increment ID
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
      
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      
      // Handle specific Prisma errors
      if (dbError.code === 'P2002') {
        return NextResponse.json({ 
          ok: false,
          error: "Record with this ID already exists",
          code: dbError.code
        }, { status: 409 });
      }
      
      throw dbError; // Re-throw to be caught by outer try-catch
    }
    
  } catch (error) {
    console.error("POST /api/test error:", error);
    
    // Log chi tiết lỗi
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
    
    return NextResponse.json({ 
      ok: false,
      error: error.message || "Internal server error",
      code: error.code || 'UNKNOWN_ERROR',
      details: process.env.NODE_ENV === 'development' ? {
        name: error.name,
        stack: error.stack
      } : undefined
    }, { status: 500 });
  } finally {
    // Disconnect để tránh connection leak trên serverless
    await prisma.$disconnect();
  }
}