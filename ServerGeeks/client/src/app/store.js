import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../feature/gameSlice";
import chatReducer from "../feature/chatSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    chat: chatReducer,
  },
});

export { store };
