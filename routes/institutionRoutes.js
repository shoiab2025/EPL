import express from 'express';
import { getAllInstitutions, createInstitution } from '../controllers/institutionController.js';

const router = express.Router();

router.get('/', getAllInstitutions);
router.post('/', createInstitution);

export default router;
