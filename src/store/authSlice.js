import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup(state, action) {
      state.currentUser = action.payload;
    },
    logout(state, action) {
      state.currentUser = null;
    },
  },
});

export const { signup, signin, logout } = authSlice.actions;

export default authSlice.reducer;
