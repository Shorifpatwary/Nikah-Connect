import ChangeThemeButton from "@/components/blocks/changeTheme";
import SideBar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import React from "react";
const DashboardHeader = () => {
  return (
    <div className="align-items-center flex min-h-10 max-w-52 justify-start rounded-sm bg-primary px-2 ">
      <div className="flex  items-center justify-evenly  gap-1 ">
        <SideBar />
        <Button variant="outline" className="border-primary  capitalize">
          login
        </Button>
        <ChangeThemeButton />
      </div>
    </div>
  );
};
export default React.memo(DashboardHeader);
