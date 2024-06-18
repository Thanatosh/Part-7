import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogById, likeBlog, deleteBlog } from "../reducers/blogReducer";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.login);

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

  const isCreator = user && user.username === blog.user.username;

  return (
    <div>
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
    </div>
  );
};

export default BlogDetail;
