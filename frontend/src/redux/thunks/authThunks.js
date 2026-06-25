import axios from 'axios';
import {
  setLoading,
  setError,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
} from '../slices/authSlice.js';

const API_URL = 'http://localhost:5000/api/auth';

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const data = response?.data?.data;
    if (!data?.user || !data?.token) throw new Error('Invalid server response');
    const { user, token } = data;
    dispatch(loginSuccess({ user, token }));
    return true;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    dispatch(loginFailure(message));
    return false;
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    const data = response?.data?.data;
    if (!data?.user || !data?.token) throw new Error('Invalid server response');
    const { user, token } = data;
    dispatch(registerSuccess({ user, token }));
    return true;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Registration failed';
    dispatch(registerFailure(message));
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const initializeAuth = () => (dispatch) => {
  try {
    const token = localStorage.getItem('pinit-token');
    const userStr = localStorage.getItem('pinit-user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(loginSuccess({ user, token }));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('pinit-user');
        localStorage.removeItem('pinit-token');
        dispatch(logout());
      }
    }
  } catch (error) {
    console.error('Auth initialization error:', error);
    dispatch(logout());
  }
};

export const changePassword = (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('pinit-token');
    const response = await axios.post(
      `${API_URL}/change-password`,
      { currentPassword, newPassword, confirmPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const message = response?.data?.message || 'Password changed successfully';
    dispatch(setError(null));
    return { success: true, message };
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to change password';
    dispatch(setError(message));
    return { success: false, message };
  }
};
