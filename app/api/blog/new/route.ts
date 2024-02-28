import { connectDb } from "@/app/config/dbConfig";
import Blogs from "@/app/models/blogModel";
import User from "@/app/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, category, createdDate, description, userEmail, imageUrl } =
      await req.json();
    await connectDb();
    const currentUser = await User.findOne({ email: userEmail });
    const slug = title.toLowerCase().split(" ").join("-");
    const newBlog = new Blogs({
      title,
      category,
      createdDate,
      slug,
      image: imageUrl,
      description,
      creator: currentUser._id,
    });

    const user = await User.findById(currentUser._id);
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
    console.log(newBlog);
    return NextResponse.json({
      blog: newBlog,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Could not create the blog.",
      status: 400,
    });
  }
}
