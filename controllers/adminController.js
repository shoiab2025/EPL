import Achievement from '../models/Achievement.js';

export const createOrUpdateAchievement = async (req, res) => {
  try {
    const { name, level, minPercentage, maxPercentage } = req.body;


    if (minPercentage < 0 || maxPercentage > 100 || minPercentage >= maxPercentage) {
      return res.status(400).json({ message: 'Invalid percentage range' });
    }
    const currentYear = new Date().getFullYear();
    const achievement = await Achievement.findOneAndUpdate(
      { name, level },
      { minPercentage, maxPercentage, level, year: currentYear },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'Achievement updated', data: achievement });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json({success: true, data: achievements});
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
