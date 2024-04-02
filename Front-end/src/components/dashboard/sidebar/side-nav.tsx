"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown } from "lucide-react";
import { SideNavItem, SideNavItems } from "./nav-data";

const SideNav = () => {
  return (
    <div className="  h-screen w-full flex-1   md:flex ">
      <div className="flex w-full flex-col space-y-6">
        <Link
          href="/"
          className="flex h-12 w-full flex-row items-center justify-center space-x-3 border-b border-primary md:justify-start md:px-6"
        >
          <span className="h-7 w-7 rounded-lg" />
          <span className=" text-xl font-bold md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SideNavItems.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={` flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-primary-foreground ${
              pathname.includes(item.path) ? "hover:bg-primary-foreground" : ""
            }`}
          >
            <div className="flex flex-row items-center space-x-4">
              {item.icon}
              <span className="flex text-xl  font-semibold">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4  ">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`rounded p-2 hover:bg-primary-foreground ${
                      subItem.path === pathname
                        ? "font-bold hover:bg-primary-foreground"
                        : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row items-center space-x-4 rounded-lg p-2 hover:bg-primary-foreground ${
            item.path === pathname ? "bg-primary-foreground" : ""
          }`}
        >
          {item.icon}
          <span className="flex text-xl font-semibold">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
