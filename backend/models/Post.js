import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
