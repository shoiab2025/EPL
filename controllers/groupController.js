import Group from '../models/Group.js';

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    return res.status(200).json({success: true, data: groups})
  } catch (error) {
    return res.status(500).json({success: false, message: 'Something wrong fetch group', error });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { groupName, groupTheme } = req.body;
    const group = new Group({ groupName, groupTheme });
    await group.save();
    return res.status(201).json({success: true,  message: 'Group created successfully', data: group });
  } catch (error) {
    return res.status(500).json({success: false,  message: 'Something wrong...creating group', error });
  }
};


export const editGroup = async (req, res) => {
  const { id } = req.params;
  const { groupName, groupTheme } = req.body;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { groupName, groupTheme },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({success: false,  message: 'Group not found' });
    }

    res.status(200).json({success: true, data: updatedGroup});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false,  message: 'Error updating group', error: error.message });
  }
};