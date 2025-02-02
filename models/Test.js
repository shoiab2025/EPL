import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  season: { type: String, required: true },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
}, { timestamps: true });

const Test = mongoose.model("Test", TestSchema);
export default Test;
