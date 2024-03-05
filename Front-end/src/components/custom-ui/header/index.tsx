import React from "react";
import Logo from "@/components/custom-ui/logo";
import { header } from "@/assets/data/header";
import Component from "@/components/custom-ui/header/header";
import MenuItem from "./menu-item";
const DasktopHeader = () => {
  return (
    <>
      <header className="w-11/12 h-auto mx-auto py-4 flex gap-4 ">
        {/* logo */}
        <div className=" w-3/12 h-14">
          <Logo logo={header.logo} />
        </div>
        {/* menu */}
        <nav className="flex gap-2 justify-center w-7/12">
          <ul className="flex justify-center gap-2 list-none capitalize align-middle">
            <li className=" text-base">somethnig</li>
            <li className="text-base">somethnig</li>
            <li className="text-base">somethnig</li>
            <li className="text-base">somethnig</li>
            <li className="text-base">somethnig</li>
            <li className="text-base">somethnig</li>
            <li className="text-base">somethnig</li>
          </ul>
          {/* <MenuItem  /> */}
        </nav>
      </header>
      {/* <Component /> */}
    </>
  );
};

export default React.memo(DasktopHeader);
// learn tailwind and speed up your development.
