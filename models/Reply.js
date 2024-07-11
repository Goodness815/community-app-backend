import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reply", replySchema);
