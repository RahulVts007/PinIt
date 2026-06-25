import axios from 'axios';
import {
  setLoading,
  setError,
  setNotifications,
  addNotification,
  markAsRead,
  deleteNotification,
} from '../slices/notificationSlice.js';

const API_URL = 'http://localhost:5000/api/notifications';

const getAuthHeader = () => {
  const token = localStorage.getItem('pinit-token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchNotifications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeader(),
    });
    dispatch(setNotifications(response?.data?.data || []));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch notifications'));
    dispatch(setNotifications([]));
  }
};

export const markNotificationRead = (notificationId) => async (dispatch) => {
  try {
    await axios.patch(
      `${API_URL}/${notificationId}/read`,
      {},
      { headers: getAuthHeader() }
    );
    dispatch(markAsRead(notificationId));
    dispatch(setError(null));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to mark as read'));
    throw error;
  }
};

export const removeNotification = (notificationId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${notificationId}`, {
      headers: getAuthHeader(),
    });
    dispatch(deleteNotification(notificationId));
    dispatch(setError(null));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to delete notification'));
    throw error;
  }
};

export const handleNewNotification = (notification) => (dispatch) => {
  dispatch(addNotification(notification));
};
