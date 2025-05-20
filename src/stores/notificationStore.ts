import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '../types';
import { useAuthStore } from './authStore';

interface NotificationState {
  notifications: Notification[];
  addNotification: (title: string, message: string, link?: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  getUserNotifications: () => Notification[];
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => {
  // Load notifications from localStorage if available
  const storedNotifications = localStorage.getItem('pinit-notifications');
  const initialNotifications: Notification[] = storedNotifications 
    ? JSON.parse(storedNotifications) 
    : [];

  return {
    notifications: initialNotifications,

    addNotification: (title, message, link) => {
      const { user } = useAuthStore.getState();
      
      if (!user) return;
      
      const newNotification: Notification = {
        id: uuidv4(),
        userId: user.id,
        title,
        message,
        read: false,
        createdAt: new Date(),
        link
      };
      
      set(state => {
        const updatedNotifications = [newNotification, ...state.notifications];
        
        // Save to localStorage
        localStorage.setItem('pinit-notifications', JSON.stringify(updatedNotifications));
        
        return { notifications: updatedNotifications };
      });
    },

    markAsRead: (id) => {
      set(state => {
        const updatedNotifications = state.notifications.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        );
        
        // Save to localStorage
        localStorage.setItem('pinit-notifications', JSON.stringify(updatedNotifications));
        
        return { notifications: updatedNotifications };
      });
    },

    markAllAsRead: () => {
      const { user } = useAuthStore.getState();
      
      if (!user) return;
      
      set(state => {
        const updatedNotifications = state.notifications.map(notification => 
          notification.userId === user.id 
            ? { ...notification, read: true } 
            : notification
        );
        
        // Save to localStorage
        localStorage.setItem('pinit-notifications', JSON.stringify(updatedNotifications));
        
        return { notifications: updatedNotifications };
      });
    },

    deleteNotification: (id) => {
      set(state => {
        const updatedNotifications = state.notifications.filter(
          notification => notification.id !== id
        );
        
        // Save to localStorage
        localStorage.setItem('pinit-notifications', JSON.stringify(updatedNotifications));
        
        return { notifications: updatedNotifications };
      });
    },

    getUserNotifications: () => {
      const { user } = useAuthStore.getState();
      
      if (!user) return [];
      
      return get().notifications
        .filter(notification => notification.userId === user.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    getUnreadCount: () => {
      const { user } = useAuthStore.getState();
      
      if (!user) return 0;
      
      return get().notifications.filter(
        notification => notification.userId === user.id && !notification.read
      ).length;
    }
  };
});