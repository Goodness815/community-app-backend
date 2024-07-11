// models/Question.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
});

export default mongoose.model('Question', questionSchema);
