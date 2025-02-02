import express from 'express';
import { createOrUpdateAchievement, getAllAchievements } from '../controllers/adminController.js';

const router = express.Router();

router.post('/', createOrUpdateAchievement);

router.get('/', getAllAchievements);

export default router;
