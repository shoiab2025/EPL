import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, unique: true },
  groupTheme: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
