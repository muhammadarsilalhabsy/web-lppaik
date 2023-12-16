import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const VvipRoutes = () => {
  const roles = useSelector((state) => state.userState.roles);
  const isAdmin = roles.includes("ADMIN");
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default VvipRoutes;
