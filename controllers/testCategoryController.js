import TestCategory  from '../models/TestCategory.js';

// Get all test categories
export const getAllTestCategories = async (req, res) => {
  try {
    const categories = await TestCategory.find();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single test category by ID
export const getTestCategoryById = async (req, res) => {
  try {
    const category = await TestCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new test category
export const createTestCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new TestCategory({ name, description });
    await category.save();
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update an existing test category by ID
export const updateTestCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await TestCategory.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a test category by ID
export const deleteTestCategory = async (req, res) => {
  try {
    const category = await TestCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
