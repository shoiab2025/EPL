import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const SubLinks = ({ links }) => {
  const { activeLink, setActiveLink, activeSubLink, setActiveSubLink } =
    useUser();
  const ulRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(ulRef.current){
      if(activeLink === "reports"){
        ulRef.current.style.height = ulRef.current.scrollHeight + "px";
        ulRef.current.style.overflow = "visible";
      }else{
         ulRef.current.style.height = "0px";
        ulRef.current.style.overflow = "hidden";
      }
    }
  },[activeLink])

  return (
    <ul
      ref={ulRef}
      className="absolute top-[100%] flex gap-2 flex-col mt-2 ml-2 right-0 left-0 h-0 overflow-x-hidden transition-all duration-500"
    >
      {links?.map((link, index) => (
        <li
          key={index}
          className={`top-[100%] text-black  bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] p-2 rounded-sm ${
            activeSubLink === link.label.replace(/\s+/g, "").toLowerCase()
              ? "bg-red-900 text-white"
              : "hover:bg-gray-300"
          }`}
          onClick={() => {
            setActiveSubLink(link.label.replace(/\s+/g, "").toLowerCase());
            navigate(link.href);
          }}
        >
          {link.label}
        </li>
      ))}
    </ul>
  );
};

export default SubLinks