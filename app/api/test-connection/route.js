import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test kết nối đơn giản với pg
    const { Client } = await import('pg');
    const client = new Client(process.env.DATABASE_URL);
    
    await client.connect();
    const result = await client.query('SELECT NOW() as current_time');
    await client.end();
    
    return NextResponse.json({
      ok: true,
      connection: "success",
      time: result.rows[0].current_time,
      env: process.env.NODE_ENV,
      database_url: process.env.DATABASE_URL ? "present" : "missing"
    });
  } catch (error) {
    console.error("Connection test error:", error);
    return NextResponse.json({
      ok: false,
      error: error.message,
      env: process.env.NODE_ENV,
      database_url: process.env.DATABASE_URL ? "present" : "missing"
    }, { status: 500 });
  }
}