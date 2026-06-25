import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  filteredPosts: [],
  loading: false,
  error: null,
  activeFilters: {
    type: null,
    tags: [],
    search: '',
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.filteredPosts = action.payload;
      state.loading = false;
    },
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
      state.filteredPosts.push(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
        const filteredIndex = state.filteredPosts.findIndex(p => p.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredPosts[filteredIndex] = action.payload;
        }
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.filteredPosts = state.filteredPosts.filter(post => post.id !== action.payload);
    },
    setActiveFilters: (state, action) => {
      state.activeFilters = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setPosts,
  setFilteredPosts,
  addPost,
  updatePost,
  deletePost,
  setActiveFilters,
} = postSlice.actions;

export default postSlice.reducer;
