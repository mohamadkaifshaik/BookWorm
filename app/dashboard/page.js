import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Book from "@/models/Book";
import { getUserId } from "@/lib/session";
import Navbar from "@/components/Navbar";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  await connectDB();
  const [user, books] = await Promise.all([
    User.findById(userId).select("name email"),
    Book.find({ owner: userId }).sort({ createdAt: -1 }),
  ]);

  if (!user) redirect("/login");

  return (
    <>
      <Navbar userName={user.name} />
      <main className="flex-1">
        <DashboardClient initialBooks={JSON.parse(JSON.stringify(books))} />
      </main>
    </>
  );
}
