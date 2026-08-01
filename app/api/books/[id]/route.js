import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import { getUserId } from "@/lib/session";

export async function PATCH(request, { params }) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const updates = await request.json();

    const allowed = {};
    if (typeof updates.title === "string") allowed.title = updates.title.trim();
    if (typeof updates.author === "string")
      allowed.author = updates.author.trim();
    if (Array.isArray(updates.tags))
      allowed.tags = updates.tags.map((t) => t.trim()).filter(Boolean);
    if (["want-to-read", "reading", "completed"].includes(updates.status))
      allowed.status = updates.status;

    await connectDB();

    const book = await Book.findOneAndUpdate(
      { _id: id, owner: userId },
      allowed,
      { new: true },
    );

    if (!book) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong updating that book." },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;
  await connectDB();

  const book = await Book.findOneAndDelete({ _id: id, owner: userId });
  if (!book) {
    return NextResponse.json({ error: "Book not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
