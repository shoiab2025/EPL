import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
      selectedOptions: [{ type: Number, required: true }],
      isCorrect: {type: Boolean, default: false}
    },
  ],
  correctCount: {type: Number, default: 0},
  score: { type: Number, default: 0 },
  totalPossibleScore: { type: Number, default: 0 },
  result: { type: String, enum: ['passed', 'failed'], default: 'failed' },
  awardCategory: { type: String, default: null },
  achievement: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
  attempts: {type: Number}
}, { timestamps: true });

const Submission = mongoose.model("Submission", SubmissionSchema);
export default Submission;
