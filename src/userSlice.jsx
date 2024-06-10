import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  token: "",
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInRed(state, action) {
      state._id = action.payload._id;
      state.token = action.payload.token;
      state.isLogged = true;
    },
    logOutRed(state) {
      state._id = ``;
      state.token = ``;
      state.isLogged = false;
    },
  },
});

export default userSlice.reducer;

export const { logInRed, logOutRed } = userSlice.actions;
