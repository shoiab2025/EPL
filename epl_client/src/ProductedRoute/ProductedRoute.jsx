import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useSnackbar } from "notistack";


const ProductedRoute = () => {
  const admin = JSON.parse(localStorage.getItem("adminData"))
  const {enqueueSnackbar} = useSnackbar()
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  },[])

   if(!isOnline){
    return (
      <div className="h-screen flex justify-center items-center bg-[var(--primary-color)]">
        <p className="text-lg font-semibold text-white">
          You don't have internet service. Please connect to a network.
        </p>
      </div>
    );
   }

   if (!admin || !admin.isAdmin || admin.role !== "admin") {
    enqueueSnackbar("You are not logged in. Please login",{variant: "error"});
   return <Navigate to="/login" replace />;
 }
 
  return <Outlet />;
};

export default ProductedRoute;
