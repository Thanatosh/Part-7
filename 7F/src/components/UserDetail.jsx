import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../reducers/userReducer";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id),
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul className="blogs-ul">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
