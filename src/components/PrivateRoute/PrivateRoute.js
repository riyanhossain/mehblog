import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  return userLocal.signIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
