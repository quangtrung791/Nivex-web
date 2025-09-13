import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Test đơn giản nhất - chỉ tạo record với auto-increment
    const result = await prisma.test1.create({
      data: {
        name: "Simple Test - " + new Date().toISOString()
      }
    });
    
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error("Simple test error:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      cause: error.cause?.message,
      meta: error.meta
    }, { status: 500 });
  }
}