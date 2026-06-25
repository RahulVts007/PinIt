import User from './User.js';
import Organization from './Organization.js';
import OrganizationMember from './OrganizationMember.js';
import Post from './Post.js';
import PostTag from './PostTag.js';
import Reminder from './Reminder.js';
import Notification from './Notification.js';

// Define associations
User.hasMany(Organization, { foreignKey: 'createdBy', as: 'organizations' });
Organization.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(OrganizationMember, { foreignKey: 'userId', as: 'memberships' });
Organization.hasMany(OrganizationMember, { foreignKey: 'organizationId', as: 'members' });
OrganizationMember.belongsTo(User, { foreignKey: 'userId' });
OrganizationMember.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Post, { foreignKey: 'organizationId', as: 'posts' });
Post.belongsTo(Organization, { foreignKey: 'organizationId' });
User.hasMany(Post, { foreignKey: 'createdBy', as: 'createdPosts' });
Post.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Post.hasMany(PostTag, { foreignKey: 'postId', as: 'tags', onDelete: 'CASCADE' });
PostTag.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Reminder, { foreignKey: 'userId', as: 'reminders' });
Reminder.belongsTo(User, { foreignKey: 'userId' });
Organization.hasMany(Reminder, { foreignKey: 'organizationId', as: 'reminders' });
Reminder.belongsTo(Organization, { foreignKey: 'organizationId' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId' });

export { User, Organization, OrganizationMember, Post, PostTag, Reminder, Notification };
