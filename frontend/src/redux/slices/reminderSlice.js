import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [],
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setReminders: (state, action) => {
      state.reminders = action.payload;
      state.loading = false;
    },
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },
    updateReminder: (state, action) => {
      const index = state.reminders.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reminders[index] = action.payload;
      }
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(r => r.id !== action.payload);
    },
    completeReminder: (state, action) => {
      const reminder = state.reminders.find(r => r.id === action.payload);
      if (reminder) {
        reminder.isCompleted = true;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setReminders,
  addReminder,
  updateReminder,
  deleteReminder,
  completeReminder,
} = reminderSlice.actions;

export default reminderSlice.reducer;
