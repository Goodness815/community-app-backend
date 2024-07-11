import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../config.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export { connectDB };
