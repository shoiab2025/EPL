import React from 'react'
import { App_logo, App_Title, Navigation_Links } from '../../../public'
import NavigationLink from '../NavLink/NavigationLink'

const Navigation = () => {
  return (
    <div className="pt-[20px] px-1 min-h-screen">
      <div className="nav-header flex gap-2 items-center flex-col">
        <div className="w-[80px]  rounded-full">
          <img src={App_logo} alt="logo" className="rounded-full" />
        </div>
        <p className="font-semibold text-xl  text-[var(--title-color)]">{App_Title}</p>
      </div>
      <ul className="nav-links mt-[2rem] flex flex-col gap-2">
        {Navigation_Links.map((nav, index) => (
          <NavigationLink navLink={nav} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default Navigation