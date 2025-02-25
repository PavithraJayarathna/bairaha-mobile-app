import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  messages: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.count += 1;
      state.messages.push(action.payload);
    },
    clearNotifications: (state) => {
      state.count = 0;
      state.messages = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
