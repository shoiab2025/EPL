import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    questionType: { type: String, enum: ['text', 'video', 'photo'], default: 'text' },
    url: { type: String, default: null },
    optionType: { type: String, enum: ['single', 'multiple'], default: 'single' },
    options: [
      {
        option: { type: Number, required: true },
        value: { type: String, required: true },
      },
    ],
    correctOptions: [{ type: Number, required: true }],
    mark: { type: Number, required: true },
  }, { timestamps: true });
  
  const Quiz = mongoose.model("Quiz", quizSchema);
  export default Quiz;