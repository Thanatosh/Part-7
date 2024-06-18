import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    addBlog(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.likes - a.likes);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export const fetchBlogById = (id) => async (dispatch) => {
  const blog = await blogService.getById(id);
  dispatch(updateBlog(blog));
};

export const likeBlog = (id) => async (dispatch, getState) => {
  const blog = getState().blogs.find((b) => b.id === id);
  const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
  const response = await blogService.update(id, updatedBlog);
  dispatch(updateBlog(response));
  dispatch(fetchBlogById(id));
  dispatch(showNotification(`You liked ${blog.title}`, 5));
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const deleteBlog = (id) => async (dispatch) => {
  if (window.confirm(`Do you wish to remove this blog?`)) {
    await blogService.remove(id);
    dispatch(removeBlog(id));
    dispatch(showNotification(`Blog successfully removed`, 5));
  }
};

export const createBlog = (content) => async (dispatch) => {
  const newBlog = await blogService.create(content);
  dispatch(addBlog(newBlog));
  dispatch(showNotification(`New blog created: ${newBlog.title}`, 5));
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const addCommentToBlog = (id, comment) => async (dispatch) => {
  const updatedBlog = await blogService.addComment(id, comment);
  dispatch(updateBlog(updatedBlog));
  dispatch(fetchBlogById(id));
  dispatch(showNotification(`Comment saved on: ${blog.title}`, 5));
};

export default blogSlice.reducer;
