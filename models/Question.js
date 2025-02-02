import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  questionType: { type: String },
  question: { type: String },
  optionType: { type: String },
  options: [
    { option: String },
    { option: String },
    { option: String },
    { option: String }
  ],
  correctOption: { type: Number, required: true },
  mark: { type: Number, required: true },
}, { timestamps: true });

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
