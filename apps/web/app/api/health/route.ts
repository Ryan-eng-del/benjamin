import { NextResponse } from "next/server";

// Service Grid Health Check
export async function GET() {
  return NextResponse.json({ message: "Pang!" });
}
