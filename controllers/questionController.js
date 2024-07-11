// controllers/questionController.js
import Question from '../models/Question.js';

export const createQuestion = async (req, res) => {
    try {
        const { title, content } = req.body;
        const question = new Question({ title, content, user: req.user._id });
        await question.save();
        res.status(201).json({ message: 'Question created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating question' });
    }
};

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching questions' });
    }
};

export const replyToQuestion = async (req, res) => {
    // Implement reply functionality
};
