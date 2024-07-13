// controllers/pastQuestionController.js
import {
  deleteObject,
  getDownloadURL,
  ref,
  storage,
  uploadBytes,
} from "../firebase.js";
import PastQuestion from "../models/PastQuestion.js";

const uploadPastQuestion = async (req, res) => {
  try {
    const { courseTitle, courseCode, dept } = req.body;
    const userId = req.user.userId;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Check for duplicate courseTitle or courseCode
    const existingQuestion = await PastQuestion.findOne({
      $or: [{ courseTitle }, { courseCode }],
    });

    if (existingQuestion) {
      return res.status(400).json({
        success: false,
        message: "Past question with same course title or code already exists.",
      });
    }

    const fileName = `past-questions/${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, fileName);

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file.buffer);
    const fileUrl = await getDownloadURL(storageRef);

    const pastQuestion = new PastQuestion({
      courseTitle,
      courseCode,
      file: {
        url: fileUrl,
        name: fileName,
      },
      dept,
      user: userId,
    });

    await pastQuestion.save();
    res.status(201).json({
      success: true,
      message: "Past question uploaded successfully",
      data: pastQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading past question",
      error,
    });
  }
};

const getPastQuestions = async (req, res) => {
  try {
    const pastQuestions = await PastQuestion.find();
    res.status(200).json(pastQuestions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching past questions" });
  }
};

const requestReview = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const pastQuestion = await PastQuestion.findById(id);
    if (!pastQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Past question not found" });
    }

    if (pastQuestion.reviewRequested) {
      return res.status(400).json({
        success: false,
        message: "Review already requested for this past question.",
      });
    }

    const fileName = `review-questions/${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, fileName);

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file.buffer);
    const reviewFileUrl = await getDownloadURL(storageRef);

    pastQuestion.reviewRequested = true;
    pastQuestion.reviewFile = { url: reviewFileUrl, name: fileName };
    pastQuestion.reviewStatus = "pending";

    await pastQuestion.save();
    res.status(200).json({
      success: true,
      message: "Review requested successfully",
      data: pastQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error requesting review",
      error,
    });
  }
};

const grantReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, secretKey } = req.body; // 'accept' or 'deny'
    if (secretKey != "communityAdmin") {
      return res.status(404).json({ success: false, message: "Unauthorized!" });
    }

    const pastQuestion = await PastQuestion.findById(id);
    if (!pastQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Past question not found" });
    }
    if (!pastQuestion.reviewRequested) {
      return res.status(400).json({
        success: false,
        message: "No review requested for this past question.",
      });
    }

    if (action === "accept") {
      const oldFileRef = ref(storage, pastQuestion.file.name);

      // Delete old file from Firebase Storage
      await deleteObject(oldFileRef);
      // Update past question with new file URL and reset review fields
      pastQuestion.file = {
        url: pastQuestion.reviewFile.url,
        name: pastQuestion.reviewFile.name,
      };
      pastQuestion.reviewFile = {
        url: "",
        name: "",
      };
      pastQuestion.reviewRequested = false;
      pastQuestion.reviewStatus = "approved";
    } else if (action === "deny") {
      const reviewFileRef = ref(storage, pastQuestion.reviewFile.name);

      // Delete review file from Firebase Storage
      await deleteObject(reviewFileRef);

      // Reset review fields
      pastQuestion.reviewFile = {
        url: "",
        name: "",
      };
      pastQuestion.reviewRequested = false;
      pastQuestion.reviewStatus = "denied";
    }

    await pastQuestion.save();
    res.status(200).json({
      success: true,
      message: `Review ${action}ed successfully`,
      data: pastQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error handling review request",
      error,
    });
  }
};

export { uploadPastQuestion, getPastQuestions, requestReview, grantReview };
