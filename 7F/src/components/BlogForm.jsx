import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [blogFormVisible, setBlogFormVisible] = useState(false);
  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };

  const addBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    dispatch(createBlog(blog));
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <div>
      <div style={showWhenVisible}>
        <h2>Create new blog</h2>
      </div>
      <div style={hideWhenVisible}>
        <button
          style={{ marginBottom: "15px" }}
          onClick={() => setBlogFormVisible(true)}
        >
          New Blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            title:{" "}
            <input
              type="text"
              value={newBlogTitle}
              data-testid="title-input"
              id="title-input"
              onChange={(e) => setNewBlogTitle(e.target.value)}
            />
          </div>
          <div>
            author:{" "}
            <input
              type="text"
              value={newBlogAuthor}
              data-testid="author-input"
              id="author-input"
              onChange={(e) => setNewBlogAuthor(e.target.value)}
            />
          </div>
          <div>
            url:{" "}
            <input
              type="text"
              value={newBlogUrl}
              data-testid="url-input"
              id="url-input"
              onChange={(e) => setNewBlogUrl(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" onClick={() => setBlogFormVisible(false)}>
            Create
          </button>
          <button type="button" onClick={() => setBlogFormVisible(false)}>
            Cancel
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default BlogForm;
