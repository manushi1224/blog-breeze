import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const post = await fetch(
      `http://localhost:8000/posts/?title_like=${params.title_like}`
    );
    const blogs = await post.json();

    if (!post) {
      return new NextResponse("Not Found!", { status: 404 });
    }

    return NextResponse.json({
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
