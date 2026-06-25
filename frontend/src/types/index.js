/**
 * User type/interface reference
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {Date} createdAt
 */

/**
 * Organization type/interface reference
 * @typedef {Object} Organization
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} [logo]
 * @property {string} inviteCode
 * @property {number[]} members - User IDs
 * @property {Date} createdAt
 * @property {number} createdBy - User ID
 */

/**
 * Post types
 * @type {Array<string>}
 */
export const PostTypes = ['general', 'event', 'scholarship', 'announcement'];

/**
 * Post type/interface reference
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {string} content
 * @property {string} type - One of PostTypes
 * @property {string[]} tags
 * @property {number} organizationId
 * @property {Date} createdAt
 * @property {number} createdBy - User ID
 * @property {Date} [eventDate]
 * @property {Date} [deadlineDate]
 */

/**
 * Tag type/interface reference
 * @typedef {Object} Tag
 * @property {string} name
 * @property {string} color
 */

/**
 * Reminder type/interface reference
 * @typedef {Object} Reminder
 * @property {number} id
 * @property {number} postId
 * @property {number} userId
 * @property {Date} date
 * @property {string} title
 * @property {string} [description]
 * @property {boolean} isCompleted
 */

/**
 * Notification type/interface reference
 * @typedef {Object} Notification
 * @property {number} id
 * @property {number} userId
 * @property {string} title
 * @property {string} message
 * @property {boolean} read
 * @property {Date} createdAt
 * @property {string} [link]
 */
