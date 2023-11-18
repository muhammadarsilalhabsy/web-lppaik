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
    setImages: (state, action) => {
      state.images = action.payload;
    },
    addImage: (state, action) => {
      // tambahkan disiini
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
      const index = action.payload;
      state.images.splice(index, 1);
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
});

export const { addImage, removeImage, clearImages, setImages } =
  activitySlice.actions;
export default activitySlice.reducer;
