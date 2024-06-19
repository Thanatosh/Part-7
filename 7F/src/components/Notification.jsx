import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);

  if (!notification) {
    return null;
  }

  return (
    <div className={`notification ${notification.type}`}>{notification}</div>
  );
};

export default Notification;
