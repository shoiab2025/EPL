import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
  },
  minPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  maxPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
