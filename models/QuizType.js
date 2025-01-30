import mongoose from "mongoose";

const quizTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  constraints: { type: Object },
});

const QuizType = mongoose.model("QuizType", quizTypeSchema);

export default QuizType;
