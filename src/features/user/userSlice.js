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

const initialState = {
  user: getUserFromLocalStorage(),
  roles: getUserRolesFromLocalStore(),
  theme: getThemeFromLocalStorage(),
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
  },
});

export const { loginUser, logoutUser, toggleTheme, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
