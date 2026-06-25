import axios from 'axios';
import {
  setLoading,
  setError,
  setPosts,
  addPost,
  deletePost,
} from '../slices/postSlice.js';

const API_URL = 'http://localhost:5000/api/posts';

const getAuthHeader = () => {
  const token = localStorage.getItem('pinit-token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchPostsByOrganization = (organizationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_URL}/organization/${organizationId}`, {
      headers: getAuthHeader(),
    });
    dispatch(setPosts(response?.data?.data || []));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch posts'));
    dispatch(setPosts([]));
  }
};

export const createPost = (title, content, organizationId, type, tags, eventDate, deadlineDate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${API_URL}`,
      { title, content, organizationId, type, tags, eventDate, deadlineDate },
      { headers: getAuthHeader() }
    );
    const post = response?.data?.data;
    if (!post) throw new Error('Invalid response from server');
    dispatch(addPost(post));
    dispatch(setError(null));
    dispatch(setLoading(false));
    return post;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to create post';
    dispatch(setError(message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${postId}`, {
      headers: getAuthHeader(),
    });
    dispatch(deletePost(postId));
    dispatch(setError(null));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to delete post'));
    throw error;
  }
};

export const filterPosts = (posts, type, tags, search) => (dispatch) => {
  let filtered = [...posts];
  
  if (type) {
    filtered = filtered.filter(p => p.type === type);
  }
  
  if (tags && tags.length > 0) {
    filtered = filtered.filter(p => 
      tags.some(tag => p.tags?.includes(tag))
    );
  }
  
  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  dispatch(setPosts(filtered));
};
