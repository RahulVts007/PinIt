import { Notification, User } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

export const getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const { userId, type, message } = req.body;

    if (!userId || !type || !message) {
      throw new AppError('User ID, type, and message are required', 400);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const notification = await Notification.create({
      userId,
      type,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    if (notification.userId !== req.userId) {
      throw new AppError('You can only mark your own notifications as read', 403);
    }

    notification.isRead = true;
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    if (notification.userId !== req.userId) {
      throw new AppError('You can only delete your own notifications', 403);
    }

    await notification.destroy();

    res.json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
