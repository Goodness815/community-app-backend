// controllers/questionController.js
import Question from "../models/Question.js";
import Reply from "../models/Reply.js";

const createQuestion = async (req, res) => {
  try {
    const { title, content } = req.body;
    const question = new Question({ title, content, user: req.user.userId });
    await question.save();
    res
      .status(201)
      .json({ success: true, message: "Question created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating question", error });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", "username email")
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "username",
        },
        select: "user content",
      })
      .sort({ postedAt: -1 }); // Sort by postedAt in descending order

    res.status(200).json({
      success: true,
      message: "Questions fetched successfully!",
      data: questions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching questions", error });
  }
};
const replyToQuestion = async (req, res) => {
  try {
    const { id } = req.params; // ID of the question to reply to
    const { content } = req.body; // Content of the reply
    const userId = req.user.userId; // ID of the authenticated user

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Message content is required!" });
    }

    // Find the question by ID
    const question = await Question.findById(id);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found!" });
    }

    // Create a new reply
    const reply = new Reply({
      content,
      user: userId,
    });

    // Save the reply to the database
    const savedReply = await reply.save();

    // Add the reply to the question's replies array
    question.replies.push(savedReply._id);
    await question.save();

    // Populate the user field in the reply
    const populatedReply = await Reply.findById(savedReply._id).populate(
      "user",
      "username email"
    );

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: populatedReply,
    });
  } catch (error) {
    console.error("Error adding reply:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding reply", error });
  }
};

export { createQuestion, getQuestions, replyToQuestion };
