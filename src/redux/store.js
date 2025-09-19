import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    // add other reducers here
  },
});

export default store;
