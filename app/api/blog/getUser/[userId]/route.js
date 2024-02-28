import { NextResponse } from "next/server";
import User from "@/app/models/userModel";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const data = await User.findById(params.userId);

    return NextResponse.json({
      user: data,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
