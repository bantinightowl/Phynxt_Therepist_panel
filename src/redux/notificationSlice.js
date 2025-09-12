import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload); // add new notification to top
    },
    clearNotifications: (state) => {
      state.list = [];
    },

      markAsRead: (state, action) => {
      const notification = state.list.find(n => n._id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
  },
});

export const { addNotification, clearNotifications ,markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

// const notificationSlice = createSlice({
//   name: "notification",
//   initialState,
//   reducers: {
//     addNotification: (state, action) => {
//       state.list.unshift(action.payload);
//     },
//     clearNotifications: (state) => {
//       state.list = [];
//     },
  
//   },
// });