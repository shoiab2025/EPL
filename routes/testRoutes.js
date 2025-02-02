import express from 'express';
import { getAllTests, createTest, updateTest, getTestById, deleteTest, submitTest, getResult } from '../controllers/testController.js';

const router = express.Router();

router.get('/', getAllTests);

router.post('/', createTest);

router.put('/:id', updateTest);

router.get('/:id', getTestById);

router.delete('/:id', deleteTest);

// Submission routes

router.post('/submit', submitTest);

router.get('/result/:submissionId', getResult);

export default router;
