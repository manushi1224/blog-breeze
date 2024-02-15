import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, response: NextRequest) {
  const res = await fetch("http://localhost:8000/posts");
  const data = await res.json();

  return NextResponse.json({ blogs: data });
}