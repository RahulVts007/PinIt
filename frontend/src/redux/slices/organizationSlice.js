import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  organizations: [],
  currentOrganization: null,
  loading: false,
  error: null,
};

const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOrganizations: (state, action) => {
      state.organizations = action.payload;
      state.loading = false;
    },
    setCurrentOrganization: (state, action) => {
      state.currentOrganization = action.payload;
    },
    addOrganization: (state, action) => {
      state.organizations.push(action.payload);
    },
    updateOrganization: (state, action) => {
      const index = state.organizations.findIndex(org => org.id === action.payload.id);
      if (index !== -1) {
        state.organizations[index] = action.payload;
      }
    },
    deleteOrganization: (state, action) => {
      state.organizations = state.organizations.filter(org => org.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setOrganizations,
  setCurrentOrganization,
  addOrganization,
  updateOrganization,
  deleteOrganization,
} = organizationSlice.actions;

export default organizationSlice.reducer;
