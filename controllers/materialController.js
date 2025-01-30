import Material from '../models/Material.js';

export const createMaterial = async (req, res) => {
    try {
        const { content_type, content, file_url, publish } = req.body;
        // let file_url = null;

        // if (req.file) {
        //     file_url = `/uploads/${req.file.filename}`; // Path to the uploaded file
        // }

        const material = new Material({ content_type, content, file_url, publish });
        await material.save();

        return res.status(201).json({ success: true, message: 'Material created successfully', data: material });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating material', error: error.message });
    }
}

export const getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.find();
        return res.status(200).json({success: true, data: materials});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching materials', error });
    }
};

export const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findOne({ _id: req.params.id });
        if (!material) {
            return res.status(404).json({ success: false, message: 'Material not found' });
        }
        return res.status(200).json({success: true, data: material});
    } catch (error) {
        return res.status(500).json({success: false, message: 'Error fetching material', error });
    }
};

export const updateMaterial = async (req, res) => {
    try {
        const material = await Material.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!material) {
            return res.status(404).json({ success: false, message: 'Material not found' });
        }
        return res.status(200).json({ success: true, message: 'Material updated successfully', data: material });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error updating material', error });
    }
};

export const deleteMaterial = async (req, res) => {
    try {
        const material = await Material.findOneAndDelete({ _id: req.params.id });
        if (!material) {
            return res.status(404).json({ success: false, message: 'Material not found' });
        }
        return res.status(200).json({ success: true, message: 'Material deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error deleting material', error });
    }
};
