import { connectDb } from "@/app/config/dbConfig";
import Blogs from "@/app/models/blogModel";
import User from "@/app/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, category, createdDate, description, userId } =
      await req.json();
    console.log({ title, category, createdDate, description, userId });
    await connectDb();
    const slug = title.toLowerCase().split(" ").join("-");
    console.log(slug);
    const newBlog = new Blogs({
      title,
      category,
      createdDate,
      slug,
      // image,
      description,
      creator: userId,
    });

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        message: "Some error occured",
        status: 500,
      });
    }

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({ session: session });
      user.blogs.push(newBlog);
      await user.save({ session: session });
      await session.commitTransaction();
    } catch (error) {
      return NextResponse.json({
        message: "Some error occured!",
        status: 400,
      });
    }
    return NextResponse.json({
      blog: newBlog,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Could not create the blog.",
      status: 400,
    });
  }
}
