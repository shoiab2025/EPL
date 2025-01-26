import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { 
  getAllUsers,
  signUpUser, 
  signInUser, 
  forgotPassword, 
  resetPassword, 
  signOutUser 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);

router.post('/signup', signUpUser);

router.post('/signin', signInUser);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/signout', signOutUser);

export default router;
