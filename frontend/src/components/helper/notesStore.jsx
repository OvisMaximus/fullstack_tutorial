import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../../reducers/noteReducer.js";
import filterReducer from "../../reducers/filterReducer.js";

export const initStore = () => {
  const store = configureStore({
    reducer: {
      notes: notesReducer,
      filter: filterReducer,
    },
  });
  store.subscribe(() => console.log("store state", store.getState()));

  return store;
};
