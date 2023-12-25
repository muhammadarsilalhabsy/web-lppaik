import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const VipRoutes = () => {
  const roles = useSelector((state) => state.userState.roles);
  const allowedRoles = roles.some(
    (role) => role === "ADMIN" || role === "DOSEN" || role === "TUTOR"
  );
  return allowedRoles ? <Outlet /> : <Navigate to="/" />;
};

export default VipRoutes;
