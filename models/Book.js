import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["want-to-read", "reading", "completed"],
      default: "want-to-read",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
