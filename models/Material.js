import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    content_type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'pdf'],
        required: true,
    },
    content: {
        type: String,
    },
    file_url: {
        type: String,
    },
    publish: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);
