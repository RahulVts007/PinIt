import express from 'express';
import {
  getUserNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
} from '../controllers/notificationController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateCreateNotification, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.get('/', verifyToken, getUserNotifications);
router.post('/', verifyToken, validateCreateNotification, handleValidationErrors, createNotification);
router.patch('/:notificationId/read', verifyToken, markAsRead);
router.delete('/:notificationId', verifyToken, deleteNotification);

export default router;
