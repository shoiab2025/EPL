// import React from 'react'
// import { App_logo, App_Title, Navigation_Links } from '../../../public'
// import NavigationLink from '../NavLink/NavigationLink'

// const Navigation = () => {
//   return (
//     <div className="pt-[20px] px-1 min-h-screen">
//       <div className="nav-header flex gap-2 items-center flex-col">
//         <div className="w-[80px]  rounded-full">
//           <img src={App_logo} alt="logo" className="rounded-full" />
//         </div>
//         <p className="font-semibold text-xl  text-[var(--title-color)]">{App_Title}</p>
//       </div>
//       <ul className="nav-links mt-[2rem] flex flex-col gap-2">
//         {Navigation_Links.map((nav, index) => (
//           <NavigationLink navLink={nav} key={index} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Navigation


import React from 'react'
import { App_logo, App_Title, Navigation_Links } from '../../../public'
import NavigationLink from '../NavLink/NavigationLink'
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-[20px] px-1 min-h-screen z-20">
      {/* Mobile & Tablet Menu Button */}
      <button
        className="md:hidden absolute top-4 left-4 bg-gray-300 text-black p-2 rounded z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar (Hidden on mobile, visible on larger screens) */}
      <div
        className={`w-[250px] h-full bg-white shadow-lg transform  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-auto`}
      >
        <div className="nav-header flex gap-2 items-center flex-col p-4">
          <div className="w-[80px] rounded-full">
            <img src={App_logo} alt="logo" className="rounded-full" />
          </div>
          <p className="font-semibold text-xl text-[var(--title-color)]">
            {App_Title}
          </p>
        </div>
        <ul className="nav-links mt-[1rem] flex flex-col gap-2 px-2">
          {Navigation_Links.map((nav, index) => (
            <NavigationLink navLink={nav} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
