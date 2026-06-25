import express from 'express';
import { register, login, getProfile, updateProfile, changePassword } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', registerLimiter, validateRegister, handleValidationErrors, register);
router.post('/login', loginLimiter, validateLogin, handleValidationErrors, login);
router.get('/profile', verifyToken, getProfile);
router.patch('/profile', verifyToken, updateProfile);
router.post('/change-password', verifyToken, changePassword);

export default router;
