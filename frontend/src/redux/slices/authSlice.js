import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const user = localStorage.getItem('pinit-user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    localStorage.removeItem('pinit-user');
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  token: localStorage.getItem('pinit-token') || null,
  isAuthenticated: !!localStorage.getItem('pinit-token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('pinit-user', JSON.stringify(user));
      localStorage.setItem('pinit-token', token);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    registerSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('pinit-user', JSON.stringify(user));
      localStorage.setItem('pinit-token', token);
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('pinit-user');
      localStorage.removeItem('pinit-token');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('pinit-user', JSON.stringify(state.user));
    },
    initializeAuth: (state, action) => {
      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  updateProfile,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
