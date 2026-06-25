import express from 'express';
import {
  getUserOrganizations,
  getOrganizationById,
  createOrganization,
  joinOrganization,
} from '../controllers/organizationController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateCreateOrganization, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.get('/', verifyToken, getUserOrganizations);
router.post('/join', verifyToken, joinOrganization);
router.post('/', verifyToken, validateCreateOrganization, handleValidationErrors, createOrganization);
router.get('/:id', verifyToken, getOrganizationById);

export default router;
