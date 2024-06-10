import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { initializeBlogs, likeBlog, deleteBlog } from "./reducers/blogReducer";
import { loginUser, logoutUser, setUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = ({ username, password }) => {
    dispatch(loginUser(username, password));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLike = (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const handleDelete = (blogId) => {
    dispatch(deleteBlog(blogId));
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
      <BlogForm />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
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
