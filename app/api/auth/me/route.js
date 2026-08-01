import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserId } from "@/lib/session";

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(userId).select("name email");
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email },
  });
}
