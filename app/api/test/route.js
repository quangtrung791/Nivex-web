import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Đảm bảo sử dụng Node.js runtime thay vì Edge
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    
    // Nếu có tham số name, thực hiện insert/update
    if (name && name.trim() !== '') {
      console.log("GET request with insert - id:", id, "name:", name); // Debug log
      
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
      
      console.log("Database insert operation successful:", row); // Debug log
      
      return NextResponse.json({
        ok: true,
        action: 'insert',
        row: row,
        message: 'Data inserted successfully'
      });
    }
    
    // Nếu không có tham số name, thực hiện select như bình thường
    const rows = await prisma.test1.findMany({
      orderBy: { id: 'asc' }
    });
    
    return NextResponse.json({
      ok: true,
      action: 'select',
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