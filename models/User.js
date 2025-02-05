import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  groupId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Group',
    required: true 
  },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  educationLevel: { type: String, required: true },
  institution: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Institution',
    required: true 
  },
  address: { type: String, required: true },
  password: { type: String, required: true },
  isLogin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  dob: { type: Date, required: true },
  resetToken: { type: String, default: null }
});

export default mongoose.model('User', userSchema);
