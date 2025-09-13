import { query } from "@/app/lib/neon";
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
      console.log("GET request with insert (neon) - id:", id, "name:", name); // Debug log
      
      let row;
      
      if (id && !isNaN(parseInt(id))) {
        console.log("Upserting with id (neon):", parseInt(id)); // Debug log
        // Upsert
        const result = await query(
          `INSERT INTO test1 (id, name) VALUES ($1, $2) 
           ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name 
           RETURNING *`,
          [parseInt(id), name.trim()]
        );
        row = result[0];
      } else {
        console.log("Creating new record (neon)"); // Debug log
        // Insert mới
        const result = await query(
          `INSERT INTO test1 (name) VALUES ($1) RETURNING *`,
          [name.trim()]
        );
        row = result[0];
      }
      
      console.log("Database insert operation successful (neon):", row); // Debug log
      
      return NextResponse.json({
        ok: true,
        action: 'insert',
        row: row,
        message: 'Data inserted successfully via Neon'
      });
    }
    
    // Nếu không có tham số name, thực hiện select như bình thường
    const rows = await query('SELECT * FROM test1 ORDER BY id ASC');
    
    return NextResponse.json({
      ok: true,
      action: 'select',
      rows: rows,
      meta: {
        db: "pg-client",
        schema: "public", 
        count: rows.length
      }
    });
  } catch (error) {
    console.error("GET error (neon):", error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}