import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { User } from '../types';
import { USERS } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check for existing user session in localStorage
  const storedUser = localStorage.getItem('pinit-user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    loading: false,
    error: null,
    
    initializeAuth: async () => {
      set({ loading: true });
      try {
        // In a real app, this would validate the stored token with the backend
        // For now, we'll just use the stored user data
        set({ loading: false });
      } catch (err) {
        set({ 
          user: null,
          isAuthenticated: false,
          loading: false,
          error: 'Session expired. Please login again.'
        });
        localStorage.removeItem('pinit-user');
      }
    },

    login: async (email, password) => {
      set({ loading: true, error: null });
      
      try {
        // In a real app, this would call an API
        // For this demo, we'll check against our mock data
        const foundUser = USERS.find(u => u.email === email);
        
        if (!foundUser || password !== 'password') { // Simple check for demo
          throw new Error('Invalid email or password');
        }
        
        // Save to localStorage for persistence
        localStorage.setItem('pinit-user', JSON.stringify(foundUser));
        
        set({
          user: foundUser,
          isAuthenticated: true,
          loading: false
        });
        
        toast.success('Login successful!');
      } catch (err) {
        set({
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to login'
        });
        toast.error('Login failed. Please check your credentials.');
      }
    },

    register: async (name, email, password) => {
      set({ loading: true, error: null });
      
      try {
        // In a real app, this would call an API
        // Check if user already exists
        const existingUser = USERS.find(u => u.email === email);
        if (existingUser) {
          throw new Error('User with this email already exists');
        }
        
        // Create new user
        const newUser: User = {
          id: `u-${Date.now()}`,
          name,
          email,
          createdAt: new Date(),
        };
        
        // In a real app, this would be saved to a database
        // For this demo, we'll just save to localStorage
        localStorage.setItem('pinit-user', JSON.stringify(newUser));
        
        set({
          user: newUser,
          isAuthenticated: true,
          loading: false
        });
        
        toast.success('Account created successfully!');
      } catch (err) {
        set({
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to register'
        });
        toast.error(err instanceof Error ? err.message : 'Registration failed');
      }
    },

    logout: () => {
      localStorage.removeItem('pinit-user');
      set({
        user: null,
        isAuthenticated: false
      });
      toast.success('Logged out successfully');
    },

    updateProfile: (updatedData) => {
      set(state => {
        if (!state.user) return state;
        
        const updatedUser = {
          ...state.user,
          ...updatedData
        };
        
        // Update localStorage
        localStorage.setItem('pinit-user', JSON.stringify(updatedUser));
        
        return {
          user: updatedUser
        };
      });
      
      toast.success('Profile updated successfully');
    }
  };
});