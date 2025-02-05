import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedOptions: [String],
    },
  ],
  score: { type: Number },
  result: { type: String },
  awardCategory: { type: String },
  achievement: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
  attempts: {type: Number}
}, { timestamps: true });

const Submission = mongoose.model("Submission", SubmissionSchema);
export default Submission;
