import { body, validationResult } from 'express-validator';

const validateRegister = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').optional().trim().escape(),
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

const validateCreateOrganization = [
  body('name').trim().notEmpty().escape().withMessage('Organization name required'),
  body('description').optional().trim().escape(),
];

const validateCreatePost = [
  body('title').trim().notEmpty().escape().withMessage('Title required'),
  body('description').optional().trim().escape(),
  body('type').isIn(['idea', 'bug', 'feature', 'discussion']).withMessage('Invalid post type'),
];

const validateCreateReminder = [
  body('title').trim().notEmpty().escape().withMessage('Title required'),
  body('description').optional().trim().escape(),
  body('dueDate').optional().isISO8601().withMessage('Valid date required'),
];

const validateCreateNotification = [
  body('userId').trim().notEmpty().withMessage('User ID required'),
  body('type').trim().notEmpty().escape().withMessage('Notification type required'),
  body('message').trim().notEmpty().escape().withMessage('Message required'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  validateRegister,
  validateLogin,
  validateCreateOrganization,
  validateCreatePost,
  validateCreateReminder,
  validateCreateNotification,
  handleValidationErrors,
};
