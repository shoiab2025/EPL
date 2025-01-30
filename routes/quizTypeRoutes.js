import express from 'express';
import {
  createQuizType,
  getAllQuizTypes,
  getQuizTypeById,
  updateQuizType,
  deleteQuizType,
} from '../controllers/quizTypeController.js';

const router = express.Router();

router.post('/', createQuizType);

router.get('/', getAllQuizTypes);

router.get('/:id', getQuizTypeById);

router.put('/:id', updateQuizType);

router.delete('/:id', deleteQuizType);

export default router;
