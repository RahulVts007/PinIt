import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Post, PostType } from '../types';
import { POSTS } from '../data/mockData';
import { useAuthStore } from './authStore';

interface PostState {
  posts: Post[];
  loading: boolean;
  filteredPosts: Post[];
  activeFilters: {
    type: PostType | null;
    tags: string[];
    search: string;
  };
  fetchPostsByOrganization: (organizationId: string) => void;
  createPost: (
    title: string, 
    content: string, 
    organizationId: string, 
    type: PostType, 
    tags: string[],
    eventDate?: Date,
    deadlineDate?: Date
  ) => void;
  deletePost: (id: string) => void;
  filterPosts: (type?: PostType | null, tags?: string[], search?: string) => void;
  getPost: (id: string) => Post | undefined;
}

export const usePostStore = create<PostState>((set, get) => {
  // Load posts from localStorage if available
  const storedPosts = localStorage.getItem('pinit-posts');
  const initialPosts: Post[] = storedPosts 
    ? JSON.parse(storedPosts) 
    : [...POSTS]; // Use mock data initially

  return {
    posts: initialPosts,
    filteredPosts: [],
    loading: false,
    activeFilters: {
      type: null,
      tags: [],
      search: '',
    },

    fetchPostsByOrganization: (organizationId) => {
      set({ loading: true });
      
      // In a real app, this would fetch from an API
      // For demo, filter posts for the specified organization
      const orgPosts = get().posts.filter(post => post.organizationId === organizationId);
      
      set({ 
        filteredPosts: orgPosts,
        loading: false,
      });
    },

    createPost: (title, content, organizationId, type, tags, eventDate, deadlineDate) => {
      const { user } = useAuthStore.getState();
      
      if (!user) {
        toast.error('You must be logged in to create a post');
        return;
      }
      
      const newPost: Post = {
        id: uuidv4(),
        title,
        content,
        type,
        tags,
        organizationId,
        createdAt: new Date(),
        createdBy: user.id,
        eventDate,
        deadlineDate
      };
      
      set(state => {
        const updatedPosts = [...state.posts, newPost];
        
        // Save to localStorage
        localStorage.setItem('pinit-posts', JSON.stringify(updatedPosts));
        
        // Update filtered posts if we're currently viewing this organization
        let updatedFiltered = [...state.filteredPosts];
        if (state.filteredPosts.length > 0 && state.filteredPosts[0].organizationId === organizationId) {
          updatedFiltered = [...updatedFiltered, newPost];
        }
        
        return {
          posts: updatedPosts,
          filteredPosts: updatedFiltered,
        };
      });
      
      toast.success('Post created successfully!');
    },

    deletePost: (id) => {
      set(state => {
        const updatedPosts = state.posts.filter(post => post.id !== id);
        const updatedFiltered = state.filteredPosts.filter(post => post.id !== id);
        
        // Save to localStorage
        localStorage.setItem('pinit-posts', JSON.stringify(updatedPosts));
        
        return {
          posts: updatedPosts,
          filteredPosts: updatedFiltered,
        };
      });
      
      toast.success('Post deleted');
    },

    filterPosts: (type = null, tags = [], search = '') => {
      const { filteredPosts, posts } = get();
      
      // Start with the current organization's posts
      let filtered = [...filteredPosts];
      
      // Apply type filter
      if (type) {
        filtered = filtered.filter(post => post.type === type);
      }
      
      // Apply tags filter (posts must contain ALL selected tags)
      if (tags.length > 0) {
        filtered = filtered.filter(post => 
          tags.every(tag => post.tags.includes(tag))
        );
      }
      
      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(searchLower) || 
          post.content.toLowerCase().includes(searchLower)
        );
      }
      
      set({
        filteredPosts: filtered,
        activeFilters: {
          type: type || null,
          tags: tags || [],
          search: search || '',
        }
      });
    },

    getPost: (id) => {
      return get().posts.find(post => post.id === id);
    }
  };
});