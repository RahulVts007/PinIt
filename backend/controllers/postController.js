import { Post, PostTag, User } from '../models/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { Op } from 'sequelize';

export const getPostsByOrganization = async (req, res, next) => {
  try {
    const { organizationId } = req.params;

    const posts = await Post.findAll({
      where: { organizationId },
      include: [
        {
          model: PostTag,
          as: 'tags',
          attributes: ['tag'],
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, description, organizationId, type, tags } = req.body;

    if (!title || !organizationId || !type) {
      throw new AppError('Title, organization ID, and type are required', 400);
    }

    const post = await Post.create({
      title,
      description,
      type,
      organizationId,
      createdBy: req.userId,
    });

    // Add tags if provided
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        await PostTag.create({
          postId: post.id,
          tag: tag.substring(0, 50), // Limit tag length
        });
      }
    }

    // Get post with tags
    const result = await Post.findByPk(post.id, {
      include: [
        {
          model: PostTag,
          as: 'tags',
          attributes: ['tag'],
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.createdBy !== req.userId) {
      throw new AppError('You can only delete your own posts', 403);
    }

    await post.destroy();

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const { organizationId, search } = req.query;

    const where = {};

    if (organizationId) {
      where.organizationId = organizationId;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const posts = await Post.findAll({
      where,
      include: [
        {
          model: PostTag,
          as: 'tags',
          attributes: ['tag'],
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};
