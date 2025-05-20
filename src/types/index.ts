export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  inviteCode: string;
  members: string[]; // User IDs
  createdAt: Date;
  createdBy: string; // User ID
}

export type PostType = 'general' | 'event' | 'scholarship' | 'announcement';

export interface Post {
  id: string;
  title: string;
  content: string;
  type: PostType;
  tags: string[];
  organizationId: string;
  createdAt: Date;
  createdBy: string; // User ID
  eventDate?: Date;
  deadlineDate?: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Reminder {
  id: string;
  postId: string;
  userId: string;
  date: Date;
  title: string;
  description?: string;
  isCompleted: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}