import express from 'express';
import { getAllGroups, createGroup, editGroup } from '../controllers/groupController.js';
import authenticate from '../middleware/authenticate.js'

const router = express.Router();

router.get('/', authenticate, getAllGroups);
router.post('/', createGroup);
router.put('/:id', editGroup);

export default router;
