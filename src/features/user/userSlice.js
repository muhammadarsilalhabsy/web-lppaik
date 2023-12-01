import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getUserRolesFromLocalStore = () => {
  return JSON.parse(localStorage.getItem("roles")) || [];
};
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const getShowFromLocalStorage = () => {
  return localStorage.getItem("show") || "btq";
};
const initialState = {
  user: getUserFromLocalStorage(),
  roles: getUserRolesFromLocalStore(),
  theme: getThemeFromLocalStorage(),
  show: getShowFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("login", action.payload);
      const { roles, ...user } = action.payload.user;
      const data = {
        ...user,
        token: action.payload.token,
      };
      state.user = data;
      state.roles = roles;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("roles", JSON.stringify(roles));
    },
    logoutUser: (state) => {
      state.user = null;
      state.roles = [];
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      toast.success("Logged out successfully");
    },
    updateUser: (state, action) => {
      const { email, motto } = action.payload;

      if (state.user) {
        state.user.email = email;
        state.user.motto = motto;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
    removeUser: (state) => {
      state.user = null;
      state.roles = [];
      localStorage.removeItem("roles");
      localStorage.removeItem("user");
    },
    setShow: (state, action) => {
      state.show = action.payload;
      localStorage.setItem("show", action.payload);
    },
  },
});

export const {
  loginUser,
  logoutUser,
  toggleTheme,
  removeUser,
  setShow,
  updateUser,
} = userSlice.actions;
export default userSlice.reducer;
