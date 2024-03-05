import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import ChangeThemeButton from "../components/custom-ui/changetheme";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.connectnikah.com"),
  title: "বাংলাদেশী",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <Button variant="secondary" className=" capitalize">
        This is a button
      </Button>
      {/*<Popover>
				<PopoverTrigger>Open</PopoverTrigger>
				<PopoverContent>Place content for the popover here.</PopoverContent>
			</Popover> */}
      <h2 className="capitalize max-sm:lowercase text-center">
        some text {process.env.APP_URL}
        {" and more ___ "}
      </h2>
      <ChangeThemeButton />
      {/* <Logo src="" /> */}
    </main>
  );
}
