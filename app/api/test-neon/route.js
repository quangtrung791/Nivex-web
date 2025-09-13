import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

// Đảm bảo sử dụng Node.js runtime thay vì Edge
export const runtime = 'nodejs';

export async function GET() {
  try {
    const rows = await query('SELECT * FROM test1 ORDER BY id ASC');
    
    return NextResponse.json({
      ok: true,
      rows: rows,
      meta: {
        db: "pg-client",
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
  console.log("POST request received (neon)"); // Debug log
  
  try {
    const body = await request.json();
    console.log("Request body (neon):", body); // Debug log
    
    const { id, name } = body;
    
    if (!name || name.trim() === '') {
      console.log("Name validation failed (neon)"); // Debug log
      return NextResponse.json({
        ok: false,
        error: "Name is required"
      }, { status: 400 });
    }
    
    console.log("About to query database with pg client"); // Debug log
    
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
    
    console.log("Database operation successful (neon):", row); // Debug log
    
    return NextResponse.json({
      ok: true,
      row: row
    });
  } catch (error) {
    console.error("POST error details (neon):", {
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