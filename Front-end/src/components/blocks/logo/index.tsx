import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  logo: {
    src: string | StaticImageData;
    width: number;
    height: number;
    alt: string;
  };
  link?: string;
  className?: string;
}
{
}
const Logo: React.FC<LogoProps> = ({ logo, link = "/", className }) => {
  return (
    <Link href={link} className={cn("h-full", className)}>
      <Image
        width={logo.width}
        height={logo.height}
        src={logo.src}
        alt={logo.alt}
        objectFit="cover"
        className="rounded-md"
      />
    </Link>
  );
};

export default Logo;
