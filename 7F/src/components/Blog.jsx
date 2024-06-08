import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLike, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isCreator = user && user.username === blog.user.username;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async () => {
    if (window.confirm(`Do you wish to remove: "${blog.title}"?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.log("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="blog-container">
      <div>
        <strong>{blog.title}</strong> by {blog.author}
        <button style={{ marginLeft: "10px" }} onClick={toggleDetails}>
          {showDetails ? "Hide" : "View"}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>Url: {blog.url}</p>
          <p className="likes">
            Likes: {blog.likes}{" "}
            <button style={{ marginLeft: "6px" }} onClick={handleLike}>
              Like
            </button>
          </p>
          <p>Added by: {blog.user.name}</p>
          {isCreator && (
            <button id="remove-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
