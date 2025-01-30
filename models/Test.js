import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  season: { type: String, required: true },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  QuizTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizType" },
});

const Test = mongoose.model("Test", TestSchema);
export default Test;
