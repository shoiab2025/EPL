import React, { useContext } from "react";
import { app_icons} from "../../../public";
import { useUser } from "../../context/userContext";

const Header = () => {
  const { userData } = useUser();
  return (
    <div className="flex justify-end py-5 px-10 bg-[var(--backgound-color)]">
      <div className="profile flex gap-[10px] items-center relative">
        <div>
          <app_icons.profile className="text-4xl text-[var(--primary-color)]" />
        </div>
        <div className="flex cursor-pointer items-center gap-8 border-b-2 border-[var(--primary-color)] p-1">
          <p>{userData.name}</p>
          <app_icons.downArrow />
        </div>
        <div className="header-feature absolute top-full right-1 bg-[var(--primary-color)] py-3 px-2  hidden">
          <ul className="flex flex-col gap-4 text-[var(--secondary-color)] font-semibold">
            <li className="cursor-pointer hover:text-white">Logout</li>
            <li className="cursor-pointer hover:text-white">Change Password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Header;
