import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Attempting to fetch data...");
    const users = await prisma.test1.findMany();
    console.log("Data fetched successfully:", users);
    
    return NextResponse.json({ 
      success: true, 
      data: users,
      count: users.length 
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Attempting to insert:", body);
    
    const newUser = await prisma.test1.create({
      data: {
        name: body.name || 'Test User from Vercel'
      }
    });
    
    console.log("Data inserted successfully:", newUser);
    
    return NextResponse.json({ 
      success: true, 
      data: newUser,
      message: "Record created successfully" 
    });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}