import { NextResponse } from "next/server";
import Blogs from "@/app/models/blogModel";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const data = await Blogs.findOne({ slug: params.slug });
    return NextResponse.json({
      blogs: data,
    });
  } catch (error) {
    return new NextResponse.json("Internal Server Error", { status: 500 });
  }
}
