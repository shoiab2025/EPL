import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";


const ProductedRoute = () => {
  const admin = JSON.parse(localStorage.getItem("adminData"))

  if (!admin.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProductedRoute;
