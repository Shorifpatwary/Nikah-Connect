import { header } from "@/assets/data/header";
import Logo from "@/components/blocks/logo";
import Section from "@/components/blocks/section";
import { Button } from "@/components/ui/button";
import React from "react";
import ChangeThemeButton from "../../blocks/changeTheme";

const DesktopHeader = () => {
  return (
    <>
      <Section
        tag="header"
        className="mx-auto min-h-10 p-0 py-2 "
        rowClassName=" gap-1"
      >
        {/* logo */}
        <div className="w-3/12 max-md:w-4/12 max-sm:w-7/12">
          <Logo logo={header.logo} />
        </div>
        {/* menu */}
        <nav className="flex w-6/12 items-center  justify-center max-md:hidden">
          <ul className="flex list-none justify-center gap-2 align-middle capitalize">
            <li className="text-base">something</li>
            <li className="text-base">something</li>
            <li className="text-base">something</li>
            <li className="text-base">something</li>
          </ul>
          {/* <MenuItem  /> */}
        </nav>
        {/* header action */}
        <div className="flex w-2/12 items-center justify-evenly  gap-1 max-md:w-3/12  max-sm:w-4/12">
          {/* design this button later */}
          <Button variant="outline" className="border-primary  capitalize">
            login
          </Button>

          <ChangeThemeButton />
        </div>
      </Section>
    </>
  );
};

export default React.memo(DesktopHeader);
