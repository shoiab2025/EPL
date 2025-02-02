import mongoose from 'mongoose';

const testCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true,
}, { timestamps: true });

const TestCategory = mongoose.model('TestCategory', testCategorySchema);
export default TestCategory;
