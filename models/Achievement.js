import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema({
  achievementName: { type: String, required: true },
  achievementRange: { type: String },
});

const Achievement = mongoose.model("Achievement", AchievementSchema);
export default Achievement;
