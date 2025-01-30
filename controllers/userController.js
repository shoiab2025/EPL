import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { validateFields } from '../utils/validators.js';
import generateRegId from '../utils/generateRegId.js'
import generatedTokenAndCookie from '../utils/tokenGenerator.js'

import Institution from '../models/Institution.js';
import Group from '../models/Group.js';
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({succes: true, data: users})
  } catch (error) {
    return res.status(400).json({succes: false,  message: 'users not found', error });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const { name, groupName, email, phoneNo, educationLevel, institutionData, address, password, dob } = req.body;

    const errors = validateFields(req.body);
    if (errors.length > 0) {
      return res.status(400).json({succes: false,  message: errors.join(', ') });
    }

    const userExists = await User.findOne({ email, dob });
    if (userExists) {
      return res.status(400).json({succes: false,  message: 'User already exists' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    // Group
    const group = await Group.findOne({groupName})
    if (!group){
      return res.status(400).json({succes: false,  message: 'Group not found' });
    }

    // Institution
    let institution = await Institution.findOne({ institutionName: institutionData?.institutionName, contactPersonNumber: institutionData?.contactPersonNumber });

    if (!institution) {
      institution = new Institution(institutionData);
      await institution.save();
    }
  
    const newUser = new User({
      userId: generateRegId(),
      groupId: group._id,
      name,
      email,
      phoneNo,
      educationLevel,
      institution: institution._id,
      address,
      password: hashedPassword,
      isActive: true,
      isAdmin: false,
      dob,
    });

  
    await newUser.save();
    
    generatedTokenAndCookie(newUser, res)
    res.status(201).json({succes: true,  message: 'Registration successfull!',  data: newUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({succes: false,  message: 'Server error', error });
  }
}

export const signInUser = async (req, res) => {
  try {
      const { userId, password, name } = req.body;

      const user = await User.findOne({
          $or: [{ userId }, {name}]
      });

      if(!user){
          return res.status(401).json({succes: false, message: 'User not found'})
      }
      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
          return res.status(401).json({succes: false, message: 'Incorrect password'})
      }

      await user.save();

      generatedTokenAndCookie(user, res)
      return res.status(200).json({succes: true, message: 'User logged in successfully', data: user})
  } catch (error) {
      console.log(error)
      return res.status(500).json({succes: false, error, message: 'Failed to login user'})
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { regId, dob } = req.body;

    const user = await User.findOne({ regId, dob });
    if (!user) {
      return res.status(404).json({succes: false,  message: 'User not found or invalid details' });
    }

    const resetToken = uuidv4();

    user.resetToken = resetToken;
    await user.save();

    sendResetLink(user.email, resetToken);
    
    res.status(200).json({succes: true,  message: 'Password reset link has been sent', data: resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({succes: false,  message: 'Server error' });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({ resetToken });
    if (!user) {
      return res.status(404).json({succes: false,  message: 'Invalid reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({succes: true,  message: 'Password has been successfully reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({succes: false,  message: 'Server error' });
  }
}

export const signOutUser = async (req, res) => {
  try {
      res.clearCookie('jwt')
      return res.status(200).json({succes: true, message: 'User logged out successfully'})
  } catch (error) {
      return res.status(500).json({succes: false, error})
  }
}
