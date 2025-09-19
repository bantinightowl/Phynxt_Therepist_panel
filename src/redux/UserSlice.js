import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    registerInfo: {fullName: "John Doe", email: "John@example.com", phone: "9834590233"},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
    setRegisterInfo: (state, action) => {
      state.registerInfo = action.payload;
    },
    clearRegisterInfo: (state) => {
      state.registerInfo = {};
    },
  },
});

export const { setUserInfo, clearUserInfo, setRegisterInfo, clearRegisterInfo } = userSlice.actions;
export default userSlice.reducer;