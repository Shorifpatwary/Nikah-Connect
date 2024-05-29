import "@/app/globals.css";
import DashboardHeader from "@/components/dashboard/header";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  colorScheme: "dark",
};
const noto_serif = Noto_Serif_Bengali({
  subsets: ["bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  applicationName: "Connect Nikah",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="bn" className="dark" id="rootElement">
      <body>
        <div
          className={cn(
            "min-h-screen bg-background antialiased",
            noto_serif.className
          )}
        >
          <DashboardHeader />
          {children}
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
