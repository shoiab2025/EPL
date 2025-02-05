import Test from "../models/Test.js";

export const createTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
