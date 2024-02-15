import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const post = await fetch(`https://blog-app-api-ughb.onrender.com/posts/?slug=${params.slug}`);
    const data = await post.json();

    if (!post) {
      return new NextResponse("not found", { status: 404 });
    }

    return NextResponse.json({
      blogs: data,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
