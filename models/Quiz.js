import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    questionType: { type: mongoose.Schema.Types.ObjectId, ref: "TestCategory", required: true },
    quizTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizType", required: true }, // Reference to QuizType
    options: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
      },
    ],
    mark: { type: Number, required: true },
  });
  
  const Quiz = mongoose.model("Quiz", quizSchema);
  export default Quiz;