import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authData: null,
    isPending: false,
    error: false,
  },
  reducers: {
    authStart: (state) => {
      state.isPending = true;
      localStorage.clear();
      state.error = false;
    },
    authSuccess: (state, action) => {
      // localStorage.setItem("profile", JSON.stringify(action.payload));
      // console.log();
      // const user = JSON.parse(localStorage.getItem("profile"));
      state.authData = action.payload;
      state.isPending = false;
    },
    authLogout: (state) => {
      state.authData = null;
      localStorage.clear();
    },
    authError: (state, action) => {
      state.isPending = false;
      state.error = action.payload;
    },
    errorGone: (state) => {
      state.error = false;
    },
  },
});

export const { authSuccess, errorGone, authLogout, authStart, authError } =
  userSlice.actions;

export default userSlice.reducer;
