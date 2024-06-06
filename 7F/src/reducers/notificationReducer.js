import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
    clearNotification: (state) => {
      state.message = "";
    },
  },
});

export const showNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);

    return () => clearTimeout(timer);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
