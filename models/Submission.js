import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  score: { type: Number, required: true },
  submittedDateTime: { type: Date, default: Date.now },
  result: { type: String },
  awardCategory: { type: String },
  achievement: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
});

const Submission = mongoose.model("Submission", SubmissionSchema);
export default Submission;
