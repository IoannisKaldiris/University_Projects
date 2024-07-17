import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => action.payload,
    logout: (state) => initialState,
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setSubType: (state, action) => {
      state.subType = action.payload;
    },
  },
});

export const { login, logout, setFirstName, setLastName, setSubType } =
  userSlice.actions;

export default userSlice.reducer;
