import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    likeBlogSlice: (state, action) => {
      const id = action.payload;
      const blogToLike = state.find((blog) => blog.id === id);
      if (blogToLike) {
        blogToLike.likes += 1;
        state.sort((a, b) => b.likes - a.likes);
      }
    },
    deleteBlogSlice: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    addBlogSlice: (state, action) => {
      state.push(action.payload);
      state.sort((a, b) => b.likes - a.likes);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getById(id);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.update(id, updatedBlog);
      dispatch(likeBlogSlice(id));
      dispatch(showNotification(`You liked: ${updatedBlog.title}`, 5));
    } catch (error) {
      console.error("Error liking blog:", error);
      dispatch(showNotification("Error liking blog", 5));
    }
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error("Error initializing blogs:", error);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    if (window.confirm(`Do you wish to remove this blog?`)) {
      try {
        await blogService.remove(id);
        dispatch(deleteBlogSlice(id));
        dispatch(showNotification(`Blog successfully removed`, 5));
      } catch (error) {
        console.log("Error deleting blog:", error);
        dispatch(showNotification("Error removing blog", 5));
      }
    }
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(addBlogSlice(newBlog));
      dispatch(showNotification(`New blog created: ${newBlog.title}`, 5));
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error("Error creating blog:", error);
      dispatch(showNotification("Error creating blog", 5));
    }
  };
};

export const { addBlogSlice, setBlogs, likeBlogSlice, deleteBlogSlice } =
  blogSlice.actions;
export default blogSlice.reducer;
