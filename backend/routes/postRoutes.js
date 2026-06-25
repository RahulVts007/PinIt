import express from 'express';
import {
  getPostsByOrganization,
  createPost,
  deletePost,
  searchPosts,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateCreatePost, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.get('/search', verifyToken, searchPosts);
router.get('/organization/:organizationId', verifyToken, getPostsByOrganization);
router.post('/', verifyToken, validateCreatePost, handleValidationErrors, createPost);
router.delete('/:postId', verifyToken, deletePost);

export default router;
