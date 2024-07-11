// routes/pastQuestionRoutes.js
import { Router } from 'express';
import { uploadPastQuestion, getPastQuestions, generatePDF, requestReview } from '../controllers/pastQuestionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/past-questions', authMiddleware, uploadPastQuestion);
router.get('/past-questions', getPastQuestions);
router.get('/past-questions/pdf', generatePDF);
router.post('/past-questions/:id/request-review', authMiddleware, requestReview);

export default router;
