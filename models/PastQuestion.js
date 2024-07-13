import mongoose from "mongoose";

const pastQuestionSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true, unique: true, trim: true },
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    set: (courseCode) => courseCode.toUpperCase(),
  },
  file: {
    type: {
      url: { type: String, required: true },
      name: { type: String, required: true },
    },
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dept: {
    type: String,
    required: true,
    trim: true,
    set: (dept) => dept.toUpperCase(),
  },
  reviewRequested: { type: Boolean, default: false },
  reviewFile: {
    type: {
      url: { type: String },
      name: { type: String },
    },
  },
  reviewStatus: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
});

export default mongoose.model("PastQuestion", pastQuestionSchema);
