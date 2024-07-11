// models/PastQuestion.js
import mongoose from 'mongoose';

const pastQuestionSchema = new mongoose.Schema({
    course: { type: String, required: true },
    fileUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewRequested: { type: Boolean, default: false },
});

export default mongoose.model('PastQuestion', pastQuestionSchema);
