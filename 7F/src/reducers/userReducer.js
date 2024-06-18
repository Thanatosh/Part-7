import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    setUser(state, action) {
      const user = action.payload;
      const existingUser = state.find((u) => u.id === user.id);
      if (existingUser) {
        Object.assign(existingUser, user);
      } else {
        state.push(user);
      }
    },
  },
});

export const { setUsers, setUser } = userSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const fetchUserById = (id) => {
  return async (dispatch) => {
    const user = await userService.getById(id);
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
