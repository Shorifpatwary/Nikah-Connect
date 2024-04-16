import ChangeThemeButton from "@/components/blocks/changeTheme";
import SideBar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
const DashboardHeader = () => {
  return (
    <div className="align-items-center absolute bottom-0 left-0 flex  max-w-52 justify-start rounded-sm p-2 ">
      <div className="flex items-center justify-evenly  gap-1 rounded border-2 border-primary ">
        <SideBar />
        {/* <Separator orientation="vertical" /> */}
        <Button variant="link" className="border-primary  capitalize">
          login
        </Button>
        {/* <Separator orientation="vertical" className=" font-primary" /> */}
        <ChangeThemeButton />
      </div>
    </div>
  );
};
export default React.memo(DashboardHeader);
