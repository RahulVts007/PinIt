import { Reminder, User, Organization } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';

export const getUserReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.findAll({
      where: { userId: req.userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Organization,
          attributes: ['id', 'name'],
        },
      ],
      order: [['dueDate', 'ASC']],
    });

    res.json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    next(error);
  }
};

export const createReminder = async (req, res, next) => {
  try {
    const { title, description, organizationId, dueDate } = req.body;

    if (!title || !organizationId) {
      throw new AppError('Title and organization ID are required', 400);
    }

    const reminder = await Reminder.create({
      userId: req.userId,
      organizationId,
      title,
      description,
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      message: 'Reminder created successfully',
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReminder = async (req, res, next) => {
  try {
    const { reminderId } = req.params;

    const reminder = await Reminder.findByPk(reminderId);

    if (!reminder) {
      throw new AppError('Reminder not found', 404);
    }

    if (reminder.userId !== req.userId) {
      throw new AppError('You can only delete your own reminders', 403);
    }

    await reminder.destroy();

    res.json({
      success: true,
      message: 'Reminder deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const completeReminder = async (req, res, next) => {
  try {
    const { reminderId } = req.params;

    const reminder = await Reminder.findByPk(reminderId);

    if (!reminder) {
      throw new AppError('Reminder not found', 404);
    }

    if (reminder.userId !== req.userId) {
      throw new AppError('You can only complete your own reminders', 403);
    }

    reminder.isCompleted = true;
    await reminder.save();

    res.json({
      success: true,
      message: 'Reminder completed',
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};
