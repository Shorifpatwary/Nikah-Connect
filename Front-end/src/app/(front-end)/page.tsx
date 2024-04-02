import ChangeThemeButton from "@/components/blocks/changeTheme";
// import HeroSection from "@/components/sections/hero-section";

import HeroSection from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectnikah.com"),
  title: "বাংলাদেশী",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <HeroSection /> */}
      <HeroSection />
      {/* <h2 className="capitalize">something more </h2> */}
      {/* testing */}
      {/* {GetWindowSize() > 1500 ? (
        <Button variant="secondary" className=" capitalize">
          This is a button now i'm testing this
        </Button>
      ) : (
        " this under 1500"
      )} */}
      <Button variant="secondary" className=" capitalize">
        This is a button
      </Button>
      {/*<Popover>
				<PopoverTrigger>Open</PopoverTrigger>
				<PopoverContent>Place content for the popover here.</PopoverContent>
			</Popover> */}
      <h2 className="text-center capitalize max-sm:lowercase">
        some text {process.env.APP_URL}
        {" and more ___ "}
      </h2>
      <ChangeThemeButton />
      <Link href="/admin" className="text-primary">
        dashboard{" "}
      </Link>
    </div>
  );
}
