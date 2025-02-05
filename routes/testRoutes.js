import express from 'express';
import { getAllTests, createTest, updateTest, getTestById, deleteTest } from '../controllers/testController.js'; // Import the deleteTest controller

const router = express.Router();

router.get('/', getAllTests);

router.post('/', createTest);

router.put('/:id', updateTest);

router.get('/:id', getTestById);

router.delete('/:id', deleteTest);

export default router;
