import Link from "next/link";
import React from "react";
type MenuProps = {
  title: string;
  href: string | URL;
};
const MenuItem: React.FC<MenuProps> = ({ title, href }) => {
  return (
    <Link className="text-xl" href={href} prefetch={false}>
      {title}
    </Link>
  );
};

export default MenuItem;
