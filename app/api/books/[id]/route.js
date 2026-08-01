import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { getUserId } from "@/lib/session";

export async function GET(request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const tag = searchParams.get("tag");

  const query = { owner: userId };
  if (status) query.status = status;
  if (tag) query.tags = tag;

  const books = await Book.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ books });
}

export async function POST(request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const { title, author, tags, status } = await request.json();

    if (!title?.trim() || !author?.trim()) {
      return NextResponse.json(
        { error: "Title and author are required." },
        { status: 400 },
      );
    }

    await connectDB();

    const book = await Book.create({
      owner: userId,
      title: title.trim(),
      author: author.trim(),
      tags: Array.isArray(tags)
        ? tags.map((t) => t.trim()).filter(Boolean)
        : [],
      status: ["want-to-read", "reading", "completed"].includes(status)
        ? status
        : "want-to-read",
    });

    return NextResponse.json({ book }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong adding that book." },
      { status: 500 },
    );
  }
}
