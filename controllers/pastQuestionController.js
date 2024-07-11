// controllers/pastQuestionController.js
import PastQuestion from "../models/PastQuestion.js";
import { handleGenerate } from "../utils/pdfGenerator.js";

const uploadPastQuestion = async (req, res) => {
  try {
    const { course, fileUrl } = req.body;
    const pastQuestion = new PastQuestion({
      course,
      fileUrl,
      user: req.user._id,
    });
    await pastQuestion.save();
    res.status(201).json({ message: "Past question uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading past question" });
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

const generatePDF = async (req, res) => {
  try {
    const pastQuestions = await PastQuestion.find();
    const pdf = await handleGenerate(pastQuestions);
    res.status(200).send(pdf);
  } catch (error) {
    res.status(500).json({ error: "Error generating PDF" });
  }
};

const requestReview = async (req, res) => {
  // Implement request review functionality
};

export { uploadPastQuestion, getPastQuestions, generatePDF, requestReview };
