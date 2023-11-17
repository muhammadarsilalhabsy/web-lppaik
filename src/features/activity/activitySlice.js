import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  images: [],
};

const getActivityItemsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("items")) || defaultState;
};

const activitySlice = createSlice({
  name: "activity",
  initialState: getActivityItemsFromLocalStorage(),
  reducers: {
    addImage: (state, action) => {
      // tambahkan disiini
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      const index = action.payload;
      state.images.splice(index, 1);
    },
  },
});

export const { addImage, removeImage } = activitySlice.actions;
export default activitySlice.reducer;
