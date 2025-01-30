import React from 'react'

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="spinner w-[100px] h-[100px] border-gray-500 border-4  rounded-full border-t-red-900 animate-spin bg-white text-white">.</div>
    </div>
  )
}

export default LoadingPage