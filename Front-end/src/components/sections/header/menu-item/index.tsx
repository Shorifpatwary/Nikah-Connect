import Link from "next/link";
import React from "react";
type MenuProps = {
  name: string;
  link: string | URL;
};
const MenuItem: React.FC<MenuProps> = ({ name, link }) => {
  return <Link href={link}>{name}</Link>;
};

export default MenuItem;
