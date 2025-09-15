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
        console.log("Trying to update existing record with id:", parseInt(id)); // Debug log
        
        // Kiểm tra xem record có tồn tại không
        const existing = await prisma.test1.findUnique({
          where: { id: parseInt(id) }
        });
        
        if (existing) {
          // Update record có sẵn
          row = await prisma.test1.update({
            where: { id: parseInt(id) },
            data: { name: name.trim() }
          });
          console.log("Updated existing record:", row);
        } else {
          // Record không tồn tại, tạo mới mà không chỉ định ID
          row = await prisma.test1.create({
            data: { name: name.trim() }
          });
          console.log("Created new record (auto ID):", row);
        }
      } else {
        console.log("Creating new record without ID"); // Debug log
        // Tạo record mới mà không chỉ định ID
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