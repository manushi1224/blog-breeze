import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextRequest) {
  const res = await fetch("https://blog-app-api-ughb.onrender.com/posts");
  const data = await res.json();

  return NextResponse.json({ blogs: data });
}
