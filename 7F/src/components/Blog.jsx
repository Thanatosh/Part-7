import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blog-details">
      <Link to={`/blogs/${blog.id}`}>
        <strong>{blog.title}</strong>
      </Link>{" "}
      by {blog.author}
    </div>
  );
};

export default Blog;
