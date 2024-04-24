// Redux slice file for saveForLater
import { createSlice } from "@reduxjs/toolkit";
import { updateSaveForLater } from "../utils/saveUtils"; // Import the new utility function

const initialState = localStorage.getItem("saveForLater")
  ? JSON.parse(localStorage.getItem("saveForLater"))
  : { saveForLaterItems: [] };

const moveSlice = createSlice({
  name: "saveForLater",
  initialState,
  reducers: {
    moveToSave: (state, action) => {
      const item = action.payload;

      const existItem = state.saveForLaterItems.find((x) => x._id === item._id);

      if (existItem) {
        state.saveForLaterItems = state.saveForLaterItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.saveForLaterItems = [...state.saveForLaterItems, item];
      }

      // Update saveForLater items in localStorage using the new utility function
      updateSaveForLater(state);
    },
    removeFromSave: (state, action) => {
      state.saveForLaterItems = state.saveForLaterItems.filter((x) => x._id !== action.payload);
      // Update saveForLater items in localStorage using the new utility function
      updateSaveForLater(state);
    },
    clearSaveItems: (state, action) => {
      state.saveForLaterItems = [];
      return updateSaveForLater(state);
    },
  },
});

export const {
  moveToSave,
  removeFromSave,
  clearSaveItems,
} = moveSlice.actions;

export default moveSlice.reducer;
