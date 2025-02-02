const evaluateSubmission = (questions, userAnswers) => {
    let totalScore = 0;
    let correctCount = 0;
    const evaluatedAnswers = [];
  
    // Calculate total possible marks for the questions
    const totalPossibleScore = questions.reduce((sum, question) => sum + question.mark, 0);
  
    questions.forEach((question) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.question.toString() === question._id.toString()
      );
  
      let isCorrect = false;
  
      if (userAnswer) {
        isCorrect =
          question.optionType === "single"
            ? question.correctOptions.includes(userAnswer.selectedOptions[0])
            : userAnswer.selectedOptions.every((opt) => question.correctOptions.includes(opt)) &&
              userAnswer.selectedOptions.length === question.correctOptions.length;
  
        if (isCorrect) {
          totalScore += question.mark;
          correctCount++;
        }
      }
  
      evaluatedAnswers.push({
        question: question._id,
        selectedOptions: userAnswer ? userAnswer.selectedOptions : [],
        isCorrect,
      });
    });
  
    const result = totalScore >= totalPossibleScore * 0.5 ? "passed" : "failed";
  
    return { score: totalScore, totalPossibleScore, result, evaluatedAnswers, correctCount };
  };
  
  export default evaluateSubmission;
  