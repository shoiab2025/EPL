import express from 'express';
import upload from '../utils/upload.js'
import {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial
} from '../controllers/materialController.js';

const router = express.Router();

// CRUD Routes
// router.post('/materials', createMaterial);
// router.get('/materials', getAllMaterials);
// router.get('/materials/:id', getMaterialById);
// router.put('/materials/:id', updateMaterial);
// router.delete('/materials/:id', deleteMaterial);

router.post('/', upload.single('file'), createMaterial);
router.get('/', getAllMaterials);
router.get('/:id', getMaterialById);
router.put('/:id', upload.single('file'), updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;
