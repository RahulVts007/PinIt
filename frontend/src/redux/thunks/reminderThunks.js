import axios from 'axios';
import {
  setLoading,
  setError,
  setReminders,
  addReminder,
  deleteReminder,
  completeReminder,
} from '../slices/reminderSlice.js';

const API_URL = 'http://localhost:5000/api/reminders';

const getAuthHeader = () => {
  const token = localStorage.getItem('pinit-token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchReminders = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeader(),
    });
    dispatch(setReminders(response?.data?.data || []));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch reminders'));
    dispatch(setReminders([]));
  }
};

export const createReminder = (postId, date, title, description) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${API_URL}`,
      { postId, date, title, description },
      { headers: getAuthHeader() }
    );
    const reminder = response?.data?.data;
    if (!reminder) throw new Error('Invalid response from server');
    dispatch(addReminder(reminder));
    dispatch(setError(null));
    dispatch(setLoading(false));
    return reminder;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to create reminder';
    dispatch(setError(message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const removeReminder = (reminderId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${reminderId}`, {
      headers: getAuthHeader(),
    });
    dispatch(deleteReminder(reminderId));
    dispatch(setError(null));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to delete reminder'));
    throw error;
  }
};

export const markReminderComplete = (reminderId) => async (dispatch) => {
  try {
    await axios.patch(
      `${API_URL}/${reminderId}/complete`,
      {},
      { headers: getAuthHeader() }
    );
    dispatch(completeReminder(reminderId));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update reminder'));
    throw error;
  }
};

export const getUpcomingReminders = (reminders, days = 7) => {
  const now = new Date();
  const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  return reminders.filter(reminder => {
    const reminderDate = new Date(reminder.date);
    return reminderDate >= now && reminderDate <= future && !reminder.isCompleted;
  });
};
