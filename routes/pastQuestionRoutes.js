// routes/pastQuestionRoutes.js
import { Router } from "express";
import {
  uploadPastQuestion,
  getPastQuestions,
  requestReview,
  grantReview,
} from "../controllers/pastQuestionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMIddleware.js";

const router = Router();

router.post(
  "/past-questions",
  authMiddleware,
  upload.single("file"),
  uploadPastQuestion
);
router.get("/past-questions", getPastQuestions);
router.post(
  "/past-questions/:id/request-review",
  authMiddleware,
  upload.single("file"),
  requestReview
);
router.post("/past-questions/:id/grant-review", authMiddleware, grantReview);

export default router;
