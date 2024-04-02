"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNav from "./side-nav";

const SideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SideNav />
        {/* <NavigationMenu orientation="horizontal">
          <NavigationMenuList className="flex-column">
      
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent className="flex ">
                <NavigationMenuLink>Link one </NavigationMenuLink>
                <NavigationMenuLink>Link two </NavigationMenuLink>
                <NavigationMenuLink>Link three </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
      
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link one </NavigationMenuLink>
                <NavigationMenuLink>Link two </NavigationMenuLink>
                <NavigationMenuLink>Link three </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
           
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link one </NavigationMenuLink>
                <NavigationMenuLink>Link two </NavigationMenuLink>
                <NavigationMenuLink>Link three </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link one </NavigationMenuLink>
                <NavigationMenuLink>Link two </NavigationMenuLink>
                <NavigationMenuLink>Link three </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>*/}
      </SheetContent>
    </Sheet>
  );
};
export default SideBar;
