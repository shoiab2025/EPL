import validator from "validator";

const validateQuizData = (quizData) => {
  const errors = [];

  // Validate question
  if (!quizData.question || validator.isEmpty(quizData.question.trim())) {
    errors.push("Question is required and cannot be empty.");
  }
  // Validate quizTypeId
  // if (!quizData.quizTypeId || !validator.isMongoId(quizData.quizTypeId)) {
  //   errors.push("Invalid or missing Quiz Type ID.");
  // }

  // Validate mark
  if (typeof quizData.mark !== "number" || quizData.mark <= 0) {
    errors.push("Mark must be a positive number.");
  }

  // Validate options
  if (!Array.isArray(quizData.options) || quizData.options.length === 0) {
    errors.push("At least one option is required.");
  } else {
    quizData.options.forEach((option, index) => {
      if (!option.text || validator.isEmpty(option.text.trim())) {
        errors.push(`Option ${index + 1} must have non-empty text.`);
      }
      if (typeof option.isCorrect !== "boolean") {
        errors.push(`Option ${index + 1} must have a valid isCorrect boolean value.`);
      }
    });
  }

  return errors;
};

export default validateQuizData
