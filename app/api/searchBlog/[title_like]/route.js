import { NextResponse } from "next/server";
import Blogs from "@/app/models/blogModel";

export async function GET(req, { params }) {
  try {
    const blogs = await Blogs.find({ $text: { $search: params.title_like } });

    return NextResponse.json({
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
