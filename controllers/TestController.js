import Test from "../models/Test.js";
import Quiz from "../models/Quiz.js";
import Material from "../models/Material.js";
import QuizType from "../models/QuizType.js";

export const createTest = async (req, res) => {
  try {
    const { name, season, material, quizzes, quiztype_detail, quizTypeName  } = req.body;

    const newMaterial = await Material.create(material);

    const createdQuizzes = await Quiz.insertMany(quizzes);

    let quiztype = '';
    if (quizTypeName){
      quiztype = QuizType.findOne({name: quizTypeName});
    }
    if (quiztype_detail){
      quiztype = await Test.create({quiztype_detail})
    }
    if (quiztype){
      return res.status(400).json({ success: false, message: 'Quiz type not found' });
    }
    const test = await Test.create({
      name,
      season,
      materialId: newMaterial._id,
      quizzes: createdQuizzes.map((quiz) => quiz._id),
      QuizTypeId: quiztype._id
    });

    return res.status(201).json({ success: true, data: test });
  } catch (error) {
    console.error("Error creating test:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, season, material, quizzes, quiztype_detail, quizTypeName } = req.body

    const existingTest = await Test.findById(id).populate('materialId quizzes QuizTypeId');
    if (!existingTest) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    let updatedMaterial;
    if (material) {
      updatedMaterial = await Material.findByIdAndUpdate(existingTest.materialId, material, { new: true });
      if (!updatedMaterial) {
        updatedMaterial = await Material.create(material);
      }
    } else {
      updatedMaterial = existingTest.materialId;
    }

    let updatedQuizzes;
    if (quizzes && quizzes.length > 0) {
      updatedQuizzes = await Quiz.insertMany(quizzes);
    } else {
      updatedQuizzes = existingTest.quizzes;
    }

    let quiztype;
    if (quizTypeName) {
      quiztype = await QuizType.findOne({ name: quizTypeName });
    }
    if (quiztype_detail) {
      quiztype = await QuizType.create(quiztype_detail);
    }

    if (!quiztype) {
      return res.status(400).json({ success: false, message: 'Quiz type not found' });
    }

    const updatedTest = await Test.findByIdAndUpdate(
      id,
      {
        name: name || existingTest.name,
        season: season || existingTest.season,
        materialId: updatedMaterial._id,
        quizzes: updatedQuizzes.map((quiz) => quiz._id),
        QuizTypeId: quiztype._id,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, data: updatedTest });
  } catch (error) {
    console.error("Error updating test:", error);
    return res.status(500).json({ success: false, error: error?.message });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('materialId quizzes QuizTypeId'); 
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
      .populate('materialId quizzes QuizTypeId');

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
