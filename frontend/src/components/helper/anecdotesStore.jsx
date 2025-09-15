import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "../../reducers/anecdoteReducer.js";
import anecdotesFilterReducer from "../../reducers/anecdotesFilterReducer.js";
import notificationReducer from "../../reducers/notificationReducer.js";

export const initStore = () => {
  const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filterText: anecdotesFilterReducer,
      notification: notificationReducer,
    },
  });
  store.subscribe(() => console.log("store state", store.getState()));

  return store;
};
