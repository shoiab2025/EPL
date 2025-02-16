import React, { useContext, useEffect } from "react";
import { app_icons} from "../../../public";
import { useUser } from "../../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Header = () => {
  const { adminData, setAdminData } = useUser();
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     try {
  //       if(localStorage.getItem("token")){
  //         const response = await axios.get(
  //           `${import.meta.env.VITE_BACKEND_URL}/users/user`,
  //           {
  //             withCredentials: true,
  //           }
  //         );
  //         setAdminData(response.data.data)
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchAdminData();
  // },[localStorage.getItem("token")])

  const handleLoggout = async() => {
     try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signout`, {
        withCredentials: true,
      })
      if(response.data.success){
         localStorage.removeItem("token")
         navigate("/login")
         localStorage.removeItem("adminData")
         enqueueSnackbar(response.data.message, {variant: "success"})
      }
     }catch(err){
       enqueueSnackbar(response.data.message, {variant: "error"})
     }
  }

  return (
    <div className="flex justify-end py-5 px-10 bg-[var(--backgound-color)]">
      <div className="profile flex gap-[10px] items-center relative">
        <div>
          <app_icons.profile className="text-4xl text-[var(--primary-color)]" />
        </div>
        <div className="flex cursor-pointer items-center gap-8 border-b-2 border-[var(--primary-color)] p-1">
          <p>{adminData.name}</p>
          <app_icons.downArrow />
        </div>
        <div className="header-feature absolute top-full right-1 bg-[var(--primary-color)] py-3 px-2  hidden">
          <ul className="flex flex-col gap-4 text-[var(--secondary-color)] font-semibold">
            <li className="cursor-pointer hover:text-white" onClick={handleLoggout}>Logout</li>
            <li className="cursor-pointer hover:text-white">Change Password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Header;
