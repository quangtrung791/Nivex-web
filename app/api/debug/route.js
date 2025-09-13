import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Debug endpoint called");
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Basic query result:", result);
    
    // Test table existence
    const tableCheck = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'test1'
    `;
    console.log("Table check:", tableCheck);
    
    // Check table structure
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'test1' AND table_schema = 'public'
      ORDER BY ordinal_position
    `;
    console.log("Table structure:", columns);
    
    // Test simple read
    const records = await prisma.test1.findMany({
      take: 5,
      orderBy: { id: 'desc' }
    });
    console.log("Recent records:", records);
    
    return NextResponse.json({
      ok: true,
      environment: process.env.NODE_ENV,
      database: process.env.DATABASE_URL?.substring(0, 30) + "...",
      connection: "SUCCESS",
      tableExists: tableCheck.length > 0,
      tableStructure: columns,
      recordCount: records.length,
      sampleRecords: records
    });
    
  } catch (error) {
    console.error("Debug error:", error);
    
    return NextResponse.json({
      ok: false,
      error: error.message,
      code: error.code,
      environment: process.env.NODE_ENV,
      database: process.env.DATABASE_URL?.substring(0, 30) + "...",
    }, { status: 500 });
  }
}