import { Organization, OrganizationMember, User } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../middleware/errorHandler.js';
import { Op } from 'sequelize';

export const getUserOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.findAll({
      include: [
        {
          model: OrganizationMember,
          as: 'members',
          where: { userId: req.userId },
          required: false,
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email'],
        },
      ],
      where: {
        [Op.or]: [
          { createdBy: req.userId },
          { '$members.userId$': req.userId },
        ],
      },
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: organizations,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrganizationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const organization = await Organization.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: OrganizationMember,
          as: 'members',
          include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        },
      ],
    });

    if (!organization) {
      throw new AppError('Organization not found', 404);
    }

    res.json({
      success: true,
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrganization = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      throw new AppError('Organization name is required', 400);
    }

    const inviteCode = uuidv4().substring(0, 8).toUpperCase();

    const organization = await Organization.create({
      name,
      description,
      createdBy: req.userId,
      inviteCode,
    });

    // Add creator as admin member
    await OrganizationMember.create({
      organizationId: organization.id,
      userId: req.userId,
      role: 'admin',
    });

    res.status(201).json({
      success: true,
      message: 'Organization created successfully',
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

export const joinOrganization = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;

    if (!inviteCode) {
      throw new AppError('Invite code is required', 400);
    }

    // Find organization by invite code
    const organization = await Organization.findOne({
      where: { inviteCode: inviteCode.toUpperCase() },
    });

    if (!organization) {
      throw new AppError('Invalid invite code', 404);
    }

    // Check if user is already a member
    const existingMember = await OrganizationMember.findOne({
      where: {
        organizationId: organization.id,
        userId: req.userId,
      },
    });

    if (existingMember) {
      throw new AppError('You are already a member of this organization', 409);
    }

    // Add user to organization
    await OrganizationMember.create({
      organizationId: organization.id,
      userId: req.userId,
      role: 'member',
    });

    // Get organization details
    const result = await Organization.findByPk(organization.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    res.json({
      success: true,
      message: 'Joined organization successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
