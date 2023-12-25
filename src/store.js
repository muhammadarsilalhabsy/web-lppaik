import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import activityReducer from "./features/activity/activitySlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    activityState: activityReducer,
  },
});
