import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { showNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(showNotification(`Logged in as ${user.name}`, 5));
    } catch (error) {
      dispatch(showNotification("Wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    dispatch(showNotification("Logged out successfully", 5));
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      createdBlog.user = user;
      setBlogs([...blogs, createdBlog]);
      dispatch(showNotification(`Blog "${newBlog.title}" added`, 5));
    } catch (error) {
      dispatch(showNotification("Please fill all input fields", 5));
    }
  };

  const handleLike = async (blogId) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === blogId);
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
      const response = await blogService.update(blogId, updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === blogId ? { ...blog, likes: response.likes } : blog,
      );
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
    } catch (error) {
      dispatch(showNotification("Error liking blog", 5));
    }
  };

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <BlogForm handleCreateBlog={handleCreateBlog} />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          handleLike={() => handleLike(blog.id)}
        />
      ))}
    </div>
  );

  return (
    <div>
      <Notification />
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && blogForm()}
    </div>
  );
};

export default App;
