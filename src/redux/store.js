import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    // add other reducers here
  },
});

export default store;
