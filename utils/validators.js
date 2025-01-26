// utils/validators.js
// import { isEmail, isLength } from 'validator/lib';
import validator from 'validator';

export const validateFields = (data) => {
  const { name, email, phoneNo, password, dob } = data;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a valid string');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Invalid email address');
  }

  if (!phoneNo || !/^\d{10}$/.test(phoneNo)) {
    errors.push('Phone number must be 10 digits');
  }

  if (!password || !validator.isLength(password, { min: 6 })) {
    errors.push('Password must be at least 6 characters');
  }

  // Validate DOB: User should be at least 18 years old
  const today = new Date();
  const birthDate = new Date(dob);
  console.log(birthDate)
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 18 || isNaN(birthDate.getTime())) {
    errors.push('User must be at least 18 years old');
  }

  return errors;
};
