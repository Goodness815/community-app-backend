// routes/questionRoutes.js
import { Router } from 'express';
import { createQuestion, getQuestions, replyToQuestion } from '../controllers/questionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/questions', authMiddleware, createQuestion);
router.get('/questions', getQuestions);
router.post('/questions/:id/reply', authMiddleware, replyToQuestion);

export default router;
