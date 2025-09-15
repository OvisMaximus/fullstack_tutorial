import { createSlice } from "@reduxjs/toolkit";

const noMessage = {
  text: null,
  className: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: null,
    className: "",
  },
  reducers: {
    displayMessage(state, action) {
      return action.payload;
    },
    clearMessage() {
      return noMessage;
    },
  },
});

export const { displayMessage, clearMessage } = notificationSlice.actions;

let pendingTimeout = -1;

const displayMessageHelper = (dispatch, messageObject) => {
  const message = displayMessage(messageObject);
  console.log("dispatching ", message);
  dispatch(message);
  if (pendingTimeout !== -1) clearTimeout(pendingTimeout);
  pendingTimeout = setTimeout(() => dispatch(clearMessage()), 5000);
};

export const errorMessage = (message) => {
  return async (dispatch) => {
    displayMessageHelper(dispatch, { className: "error", text: message });
  };
};

export const successMessage = (message) => {
  return async (dispatch) => {
    displayMessageHelper(dispatch, { className: "success", text: message });
  };
};

export default notificationSlice.reducer;
