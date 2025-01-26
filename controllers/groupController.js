import Group from '../models/Group.js';

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    return res.status(200).json({data: groups})
  } catch (error) {
    return res.status(500).json({ message: 'Something wrong fetch group', error });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { groupName, groupTheme } = req.body;
    const group = new Group({ groupName, groupTheme });
    await group.save();
    return res.status(201).json({ message: 'Group created successfully', data: group });
  } catch (error) {
    return res.status(500).json({ message: 'Something wrong...creating group', error });
  }
};
