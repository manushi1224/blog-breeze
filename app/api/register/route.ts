import { connectDb } from "@/app/config/dbConfig";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  console.log("requested in route.js");
  try {
    const { name, email, password } = await request.json();
    console.log({ name, email, password });
    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json({
        message: "User already exists",
        status: "400",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.log(error, "error is in route");
    return NextResponse.json({
      error: "Some error occured",
      status: "500",
    });
  }
}
