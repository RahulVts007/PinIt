import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Reminder } from '../types';
import { useAuthStore } from './authStore';

interface ReminderState {
  reminders: Reminder[];
  createReminder: (postId: string, date: Date, title: string, description?: string) => void;
  toggleReminderCompletion: (id: string) => void;
  deleteReminder: (id: string) => void;
  getUserReminders: () => Reminder[];
  getUpcomingReminders: (days: number) => Reminder[];
}

export const useReminderStore = create<ReminderState>((set, get) => {
  // Load reminders from localStorage if available
  const storedReminders = localStorage.getItem('pinit-reminders');
  const initialReminders: Reminder[] = storedReminders 
    ? JSON.parse(storedReminders) 
    : [];

  return {
    reminders: initialReminders,

    createReminder: (postId, date, title, description) => {
      const { user } = useAuthStore.getState();
      
      if (!user) {
        toast.error('You must be logged in to create a reminder');
        return;
      }
      
      const newReminder: Reminder = {
        id: uuidv4(),
        postId,
        userId: user.id,
        date,
        title,
        description,
        isCompleted: false
      };
      
      set(state => {
        const updatedReminders = [...state.reminders, newReminder];
        
        // Save to localStorage
        localStorage.setItem('pinit-reminders', JSON.stringify(updatedReminders));
        
        return { reminders: updatedReminders };
      });
      
      toast.success('Reminder set!');
    },

    toggleReminderCompletion: (id) => {
      set(state => {
        const updatedReminders = state.reminders.map(reminder => 
          reminder.id === id 
            ? { ...reminder, isCompleted: !reminder.isCompleted } 
            : reminder
        );
        
        // Save to localStorage
        localStorage.setItem('pinit-reminders', JSON.stringify(updatedReminders));
        
        return { reminders: updatedReminders };
      });
    },

    deleteReminder: (id) => {
      set(state => {
        const updatedReminders = state.reminders.filter(reminder => reminder.id !== id);
        
        // Save to localStorage
        localStorage.setItem('pinit-reminders', JSON.stringify(updatedReminders));
        
        return { reminders: updatedReminders };
      });
      
      toast.success('Reminder deleted');
    },

    getUserReminders: () => {
      const { user } = useAuthStore.getState();
      
      if (!user) return [];
      
      return get().reminders.filter(reminder => reminder.userId === user.id);
    },

    getUpcomingReminders: (days) => {
      const { user } = useAuthStore.getState();
      
      if (!user) return [];
      
      const now = new Date();
      const futureDate = new Date();
      futureDate.setDate(now.getDate() + days);
      
      return get().reminders.filter(reminder => 
        reminder.userId === user.id &&
        !reminder.isCompleted &&
        new Date(reminder.date) > now &&
        new Date(reminder.date) <= futureDate
      );
    }
  };
});