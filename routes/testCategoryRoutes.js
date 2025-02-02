import express from 'express';
import {
  getAllTestCategories,
  getTestCategoryById,
  createTestCategory,
  updateTestCategory,
  deleteTestCategory,
} from '../controllers/testCategoryController.js';

const router = express.Router();

router.get('/', getAllTestCategories);
router.get('/:id', getTestCategoryById);
router.post('/', createTestCategory);
router.put('/:id', updateTestCategory);
router.delete('/:id', deleteTestCategory);

export default router;
