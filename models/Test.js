import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  qtId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionType" },
  testId: { type: String, required: true },
  catId: { type: String },
  season: { type: String },
  smId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
});

const Test = mongoose.model("Test", TestSchema);
export default Test;
