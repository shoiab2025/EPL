import React, { useContext, useEffect, useState } from "react";
import { app_icons, App_logo } from "../../../public";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const [data, setData] = useState({
    userIdOrEmail: JSON.parse(localStorage.getItem("rememberEmail")) || "",
    password: "",
  });
  const [rememberme, setRememberMe] = useState(false);
  const { setAdminData } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   console.log(data)
  // },[data])

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/signin`,
        data,
        { withCredentials: true }
      );
      if (response.data.success) {
        // console.log(response.data)
        if (response.data.data.isAdmin && response.data.data.role === "admin") {
          if (rememberme) {
            localStorage.setItem(
              "rememberEmail",
              JSON.stringify(data.userIdOrEmail)
            );
          }
          localStorage.setItem("adminData", JSON.stringify(response.data.data));
          setAdminData(response.data.data);
          setData({
            userIdOrEmail: "",
            password: "",
          });
          navigate("/dashboard");
          enqueueSnackbar(response.data.message, { variant: "success" });
        } else {
          enqueueSnackbar("You Dont have access", { variant: "error" });
        }
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[var(--secondary-color)] fixed inset-0 flex justify-center items-center h-screen w-screen overflow-hidden z-100">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white p-[50px] flex flex-col items-center gap-[20px] w-[400px] rounded-2xl shadow-lg"
      >
        <div className="w-[100px] rounded-full border border-gray-300">
          <img src={App_logo} alt="app logo" className="w-full rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="userIdOrEmail"
            className="input-box"
            placeholder="userIDorEail"
            onChange={handleChange}
            value={data.userIdOrEmail}
            required
          />
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input-box w-full"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={data.password}
              required
            />
            <div
              className="absolute top-[10px] right-[10px] text-2xl text-[var(--primary-color)]"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <app_icons.showEye /> : <app_icons.closeEye />}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full items-center mt-[-10px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setRememberMe((prev) => !prev)}
            />
            Remember Me
          </label>
          <p className="cursor-pointer hover:underline">Forgot Password</p>
        </div>
        <button type="submit" className="submit-button mt-[10px]">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
