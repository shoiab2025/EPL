import QuizType from '../models/QuizType.js';

// Create a new QuizType
export const createQuizType = async (req, res) => {
  try {
    const { name, description, constraints } = req.body;

    // Create a new quiz type
    const newQuizType = new QuizType({
      name,
      description,
      constraints,
    });

    // Save to database
    await newQuizType.save();

    return res.status(201).json({ success: true,
      message: 'Quiz Type created successfully!',
      data: newQuizType,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error?.message });
  }
};

// Get all QuizTypes
export const getAllQuizTypes = async (req, res) => {
  try {
    const quizTypes = await QuizType.find();
    return res.status(200).json({ success: true,
      message: 'Quiz Types fetched successfully!',
      data: quizTypes,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error?.message });
  }
};

// Get a specific QuizType by ID
export const getQuizTypeById = async (req, res) => {
  try {
    const quizType = await QuizType.findById(req.params.id);

    if (!quizType) {
      return res.status(404).json({ success: false, message: 'QuizType not found' });
    }

    return res.status(200).json({ success: true,
      message: 'Quiz Type fetched successfully!',
      data: quizType,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error?.message });
  }
};

// Update an existing QuizType
export const updateQuizType = async (req, res) => {
  try {
    const updatedQuizType = await QuizType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedQuizType) {
      return res.status(404).json({ success: false, message: 'QuizType not found' });
    }

    return res.status(200).json({ success: true,
      message: 'Quiz Type updated successfully!',
      data: updatedQuizType,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error?.message });
  }
};

// Delete a QuizType
export const deleteQuizType = async (req, res) => {
  try {
    const deletedQuizType = await QuizType.findByIdAndDelete(req.params.id);

    if (!deletedQuizType) {
      return res.status(404).json({ success: false, message: 'QuizType not found' });
    }

    return res.status(200).json({ success: true,
      message: 'Quiz Type deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error?.message });
  }
};
