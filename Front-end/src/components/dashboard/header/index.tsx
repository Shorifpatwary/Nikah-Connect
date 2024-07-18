import LogoutButton from "@/app/(front-end)/(auth)/log-out/log-out-button";
import ChangeThemeButton from "@/components/blocks/changeTheme";
import DefaultLoading from "@/components/blocks/loading/default";
import DashboardBreadcrumb from "@/components/dashboard/header/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SearchIcon, UserRoundCog } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
const SideBar = dynamic(() => import("@/components/dashboard/sidebar"), {
  loading: () => <DefaultLoading />,
});

const DashboardHeader = () => {
  return (
    <header className="flex items-center gap-4 border-b bg-background p-2 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SideBar />
      <DashboardBreadcrumb />
      <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          placeholder="Search..."
          type="search"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="overflow-hidden rounded-full"
            size="icon"
            variant="outline"
          >
            <UserRoundCog />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ChangeThemeButton />
    </header>
  );
};
export default React.memo(DashboardHeader);
