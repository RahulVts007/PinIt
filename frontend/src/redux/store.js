import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import organizationReducer from './slices/organizationSlice.js';
import postReducer from './slices/postSlice.js';
import reminderReducer from './slices/reminderSlice.js';
import notificationReducer from './slices/notificationSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    posts: postReducer,
    reminders: reminderReducer,
    notifications: notificationReducer,
  },
});

export default store;
