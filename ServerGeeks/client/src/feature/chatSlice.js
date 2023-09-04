import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isChatBoxOpen: false,
  unreadMessagesCount: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    updateUnreadCount(state) {
      state.unreadMessagesCount += 1;
    },

    updateChatBoxOpen(state, action) {
      state.isChatBoxOpen = action.payload;
    },

    resetUnreadCount(state) {
      state.unreadMessagesCount = 0;
    },

    resetChat() {
      return initialState;
    },
  },
});

export const {
  addMessage,
  updateUnreadCount,
  updateChatBoxOpen,
  resetUnreadCount,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
