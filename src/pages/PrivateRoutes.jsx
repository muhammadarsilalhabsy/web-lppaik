import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.userState.user);

  return user?.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
