import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { app_icons } from '../../../public';
import { useUser } from '../../context/userContext';
import SubLinks from './SubLinks';

const NavigationLink = ({navLink}) => {
  const navigate = useNavigate();
  const {activeLink, setActiveLink} = useUser()
  return (
    <li
      className={`nav-link relative bg-[var(--secondary-color)] px-2 py-3  cursor-pointer transition-all ease-in rounded-sm ${
        activeLink === navLink.label.replace(/\s+/g, "").toLowerCase()
          ? "bg-red-900 text-white"
          : "hover:bg-gray-300"
      }`}
      onClick={() => {
        setActiveLink(navLink.label.replace(/\s+/g, "").toLowerCase());
        if (!navLink.sub_link) {
          navigate(navLink.href);
        } else {
          navigate(navLink.href);
        }
      }}
    >
      <div className="flex items-center justify-between">
        <p>{navLink.label}</p>
        {navLink.sub_link && <app_icons.downArrow />}
      </div>
      {navLink.sub_link && <SubLinks links={navLink.sub_link} />}
    </li>
  );
}

export default NavigationLink


