import axios from 'axios';
import {
  setLoading,
  setError,
  setOrganizations,
  addOrganization,
} from '../slices/organizationSlice.js';

const API_URL = 'http://localhost:5000/api/organizations';

const getAuthHeader = () => {
  const token = localStorage.getItem('pinit-token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchUserOrganizations = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeader(),
    });
    dispatch(setOrganizations(response?.data?.data || []));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch organizations'));
    dispatch(setOrganizations([]));
  }
};

export const createOrganization = (name, description, logo) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${API_URL}`,
      { name, description, logo },
      { headers: getAuthHeader() }
    );
    const org = response?.data?.data;
    if (!org) throw new Error('Invalid response from server');
    dispatch(addOrganization(org));
    dispatch(setError(null));
    return org;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create organization';
    dispatch(setError(message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const joinOrganization = (inviteCode) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${API_URL}/join`,
      { inviteCode },
      { headers: getAuthHeader() }
    );
    const org = response?.data?.data;
    if (!org) throw new Error('Invalid response from server');
    dispatch(addOrganization(org));
    dispatch(setError(null));
    return org;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to join organization';
    dispatch(setError(message));
    dispatch(setLoading(false));
    throw error;
  }
};
