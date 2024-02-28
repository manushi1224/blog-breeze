import { connectDb } from "@/app/config/dbConfig";
import Blogs from "@/app/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextRequest) {
  connectDb();
  const data = await Blogs.find();
  // console.log(data);

  return NextResponse.json({ blogs: data });
}
