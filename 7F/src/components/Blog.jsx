import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isCreator = user && user.username === blog.user.username;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
            <button
              style={{ marginLeft: "6px" }}
              onClick={() => handleLike(blog.id)}
            >
              Like
            </button>
          </p>
          <p>Added by: {blog.user.name}</p>
          {isCreator && (
            <button id="remove-button" onClick={() => handleDelete(blog.id)}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
