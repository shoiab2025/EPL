import React, { useContext, useEffect, useState } from "react";
import { App_logo } from "../../../public";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  }); 
  const { setAdminData } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/signin`,
        data,
        { withCredentials: true }
      );
      if (response.data.succes) {
        if (response.data.data.isAdmin) {
          console.log(response.data.data)
          localStorage.setItem("adminData", JSON.stringify(response.data.data));
          setAdminData(response.data.data);
          setData({
            name: "",
            password: "",
          });
          navigate("/dashboard");
        } else {
          console.log("You Dont have access");
        }
      }
    } catch (err) {
      console.log(err.response.data);
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
    <div className="bg-[var(--secondary-color)] absolute right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white p-[50px] flex flex-col items-center gap-[20px] min-w-[400px] rounded-2xl"
      >
        <div className="w-[100px] rounded-full border border-gray-300">
          <img src={App_logo} alt="app logo" className="w-full rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="name"
            className="input-box"
            placeholder="User Name"
            onChange={handleChange}
            value={data.name}
            required
          />
          <input
            type="password"
            name="password"
            className="input-box"
            placeholder="Enter Your Password"
            onChange={handleChange}
            value={data.password}
            required
          />
        </div>
        <div className="flex justify-between w-full items-center mt-[-10px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" />
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
