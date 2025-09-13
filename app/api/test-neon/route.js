import { query } from "@/app/lib/neon";
import { NextResponse } from "next/server";

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
      // Upsert
      const result = await query(
        `INSERT INTO test1 (id, name) VALUES ($1, $2) 
         ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name 
         RETURNING *`,
        [parseInt(id), name.trim()]
      );
      row = result[0];
    } else {
      // Insert mới
      const result = await query(
        `INSERT INTO test1 (name) VALUES ($1) RETURNING *`,
        [name.trim()]
      );
      row = result[0];
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