import { User, Organization, Post, Tag } from '../types';

// Mock users
export const USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    createdAt: new Date('2023-01-01')
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    createdAt: new Date('2023-01-15')
  }
];

// Mock organizations
export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org1',
    name: 'Tech University',
    description: 'The official notice board for Tech University students',
    logo: 'https://images.pexels.com/photos/5212359/pexels-photo-5212359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    inviteCode: 'tech123',
    members: ['u1', 'u2'],
    createdAt: new Date('2023-02-01'),
    createdBy: 'u1'
  },
  {
    id: 'org2',
    name: 'Developer Club',
    description: 'A community for passionate developers',
    logo: 'https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    inviteCode: 'dev456',
    members: ['u1'],
    createdAt: new Date('2023-03-15'),
    createdBy: 'u1'
  }
];

// Mock tags
export const TAGS: Tag[] = [
  { id: 't1', name: 'Important', color: '#EF4444' },
  { id: 't2', name: 'Technology', color: '#3B82F6' },
  { id: 't3', name: 'Arts', color: '#EC4899' },
  { id: 't4', name: 'Science', color: '#10B981' },
  { id: 't5', name: 'Business', color: '#F97316' },
  { id: 't6', name: 'Medicine', color: '#6366F1' },
  { id: 't7', name: 'Engineering', color: '#8B5CF6' },
  { id: 't8', name: 'Urgent', color: '#DC2626' }
];

// Mock posts
export const POSTS: Post[] = [
  {
    id: 'p1',
    title: 'Annual Tech Fest Registration',
    content: 'Register now for the annual tech fest happening next month. Exciting prizes and opportunities await!',
    type: 'event',
    tags: ['t2', 't1'],
    organizationId: 'org1',
    createdAt: new Date('2023-04-10'),
    createdBy: 'u1',
    eventDate: new Date('2023-05-15')
  },
  {
    id: 'p2',
    title: 'Scholarship Applications Open',
    content: 'Apply for the prestigious tech scholarship before the deadline. Requirements include a minimum GPA of 3.5 and a project portfolio.',
    type: 'scholarship',
    tags: ['t1', 't2'],
    organizationId: 'org1',
    createdAt: new Date('2023-04-15'),
    createdBy: 'u2',
    deadlineDate: new Date('2023-05-30')
  },
  {
    id: 'p3',
    title: 'New Coding Workshop Series',
    content: 'Join us every Wednesday for a series of coding workshops. Topics include web development, mobile app development, and machine learning.',
    type: 'announcement',
    tags: ['t2', 't7'],
    organizationId: 'org2',
    createdAt: new Date('2023-04-20'),
    createdBy: 'u1'
  },
  {
    id: 'p4',
    title: 'Hackathon Registration',
    content: 'The annual 48-hour hackathon is back! Register your team of 3-5 members and get ready to code for amazing prizes.',
    type: 'event',
    tags: ['t2', 't7', 't1'],
    organizationId: 'org2',
    createdAt: new Date('2023-04-25'),
    createdBy: 'u1',
    eventDate: new Date('2023-06-10')
  }
];