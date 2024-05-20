import Link from "next/link";
import React from "react";
type MenuProps = {
  title: string;
  href: string | URL;
  icon: React.ReactNode;
};
const MobileMenuItem: React.FC<MenuProps> = ({ title, href, icon }) => {
  return (
    <Link
      className="hover:text-primary-500 dark:hover:text-primary-500 flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
      href={href}
    >
      {icon}
      <span className="text-base">{title}</span>
    </Link>
  );
};

export default MobileMenuItem;
