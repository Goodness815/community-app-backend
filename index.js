// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import pastQuestionRoutes from "./routes/pastQuestionRoutes.js";
import dotenv from "dotenv";
import config from "./config.js";
import { connectDB } from "./utils/db.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", pastQuestionRoutes);

app.get("/", (req, res) => {
  res.send("community forum backend (active)");
});

app.use(errorHandlerMiddleware);

// Start server
const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// Export the app for Vercel
export default app;
