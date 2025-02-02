import Test from "../models/Test.js";
import Quiz from "../models/Quiz.js";
import Material from "../models/Material.js";
import QuizType from "../models/QuizType.js";
import TestCategory from "../models/TestCategory.js"
import Submission from '../models/Submission.js';

import validateQuizData from "../validations/validate_quiz.js";
import validateMaterial from "../validations/validate_material.js";

export const createTest = async (req, res) => {
  try {
    const { name, season, quizzes } = req.body;

    if (!name || !season || !Array.isArray(quizzes)) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    const createdQuizzes = await Promise.all(
      quizzes.map(async (quiz) => {
        const question = new Quiz({
          question: quiz.question,
          questionType: quiz.questionType || "text",
          url: quiz.url || null,
          optionType: quiz.optionType || "single",
          options: quiz.options,
          correctOptions: quiz.correctOptions,
          mark: quiz.mark,
        });
        return question.save();
      })
    );

    const test = await Test.create({
      name,
      season,
      quizzes: createdQuizzes.map((quiz) => quiz._id),
    });

    return res.status(201).json({ success: true, data: test, message: "Test created successfully"});
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (E11000)
      return res.status(400).json({ message: `An Test with the name "${req.body.name}" already exists.` });
    }
    console.error("Error creating test:", error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message});
  }
};

export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, season, quizzes } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Test ID is required" });
    }

    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    if (name) test.name = name;
    if (season) test.season = season;

    if (Array.isArray(quizzes) && quizzes.length > 0) {
      await Quiz.deleteMany({ _id: { $in: test.quizzes } });

      const updatedQuizzes = await Promise.all(
        quizzes.map(async (quiz) => {
          const question = new Quiz({
            question: quiz.question,
            questionType: quiz.questionType || "text",
            url: quiz.url || null,
            optionType: quiz.optionType || "single",
            options: quiz.options,
            correctOptions: quiz.correctOptions,
            mark: quiz.mark,
          });
          return question.save();
        })
      );

      test.quizzes = updatedQuizzes.map((quiz) => quiz._id);
    }

    await test.save();

    return res.status(200).json({ success: true, data: test, message: "Test updated successfully" });
  } catch (error) {
    console.error("Error updating test:", error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('quizzes');
    return res.status(200).json({
      success: true,
      data: tests,
    });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('quizzes');

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (error) {
    console.error("Error fetching test by ID:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);

    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Test deleted successfully!',
    });
  } catch (error) {
    console.error("Error deleting test:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Submission

export const submitTest = async (req, res) => {
  try {
    const { user, testId, answers } = req.body;
    
    // Find the test and populate quizzes
    const test = await Test.findById(testId).populate('quizzes');
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

    let totalMarks = 0;
    const evaluatedAnswers = test.quizzes.map((question) => {
      const submittedAnswer = answers.find((a) => a.questionId === question._id.toString());
      let isCorrect = false;

      if (submittedAnswer) {
        if (question.optionType === 'multiple') {
          // Check if multiple selected options are correct
          isCorrect = JSON.stringify(submittedAnswer.selectedOptions.sort()) === JSON.stringify(question.correctOptions.sort());
        } else {
          // Check if the selected option is correct
          isCorrect = question.correctOptions.includes(submittedAnswer.selectedOptions[0]);
        }
      }

      if (isCorrect) {
        totalMarks += question.mark;
      }

      return {
        question: question._id,
        selectedOptions: submittedAnswer ? submittedAnswer.selectedOptions : [],
      };
    });

    // Find an existing submission for the user and test, or create a new one
    let submission = await Submission.findOne({ user, test: testId });

    if (submission) {
      // If submission exists, increment the attempts and update the submission
      submission.attempts += 1;
      submission.totalMarks = totalMarks;
      submission.answers = evaluatedAnswers;
      await submission.save();
    } else {
      submission = new Submission({
        user,
        test: testId,
        answers: evaluatedAnswers,
        totalMarks,
        attempts: 1,
      });
      await submission.save();
    }

    res.status(201).json({ success: true, message: 'Test submitted', data: { totalMarks, submission } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getResult = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findById(submissionId).populate('test');
    if (!submission) return res.status(404).json({ success: false, message: 'Submission not found' });

    res.status(200).json({ success: true, message: 'Test Result', data: submission });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
