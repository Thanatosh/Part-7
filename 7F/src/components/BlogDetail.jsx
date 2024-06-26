import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogById,
  likeBlog,
  deleteBlog,
  addCommentToBlog,
} from "../reducers/blogReducer";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.login);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    navigate("/blogs");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(blog.id, comment));
    setComment("");
  };

  const isCreator = user && user.username === blog.user.username;

  return (
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p>
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
      <div className="comment-section">
        <h3>Comments</h3>
        <ul className="comments-ul">
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetail;
