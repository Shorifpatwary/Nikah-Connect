import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface LogoProps {
  logo: {
    src: string | StaticImageData;
    width: number;
    height: number;
    alt: string;
  };
  link?: string;
}

const Logo: React.FC<LogoProps> = ({ logo, link = "/" }) => {
  return (
    <Link href={link} className=" h-14">
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
