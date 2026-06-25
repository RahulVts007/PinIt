import express from 'express';
import {
  getUserReminders,
  createReminder,
  deleteReminder,
  completeReminder,
} from '../controllers/reminderController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateCreateReminder, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.get('/', verifyToken, getUserReminders);
router.post('/', verifyToken, validateCreateReminder, handleValidationErrors, createReminder);
router.delete('/:reminderId', verifyToken, deleteReminder);
router.patch('/:reminderId/complete', verifyToken, completeReminder);

export default router;
