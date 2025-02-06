import React, { useEffect, useState } from 'react'
import { App_logo } from '../../../public'
import axios from 'axios'

const LoginPage = () => {
  const [data, setData] = useState({
    name: "",
    password: ""
  })


  const handleLoginSubmit = async() => {
    try{
      console.log(data)
      console.log(`${import.meta.env.VITE_BACKEND_URL}/users/signin`);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signin`, data);
      console.log(response.data.message)
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
     const name = e.target.name;
     const value = e.target.value;
     setData(prev => (
      {
        ...prev,
        [name]:value
      }
     ))
  }

  return (
    <div className="bg-[var(--secondary-color)] absolute right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
      <div className="bg-white p-[50px] flex flex-col items-center gap-[20px] min-w-[400px] rounded-2xl">
        <div className="w-[100px] rounded-full border border-gray-300">
          <img src={App_logo} alt="app logo" className="w-full rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="name"
            className="input-box"
            placeholder="User Name"
            onChange = {handleChange}
          />
          <input
            type="password"
            name="password"
            className="input-box"
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full items-center mt-[-10px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              Remember Me
            </label>
          <p className="cursor-pointer hover:underline">Forgot Password</p>
        </div>
        <button type="submit" className="submit-button mt-[10px]" onClick={handleLoginSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage