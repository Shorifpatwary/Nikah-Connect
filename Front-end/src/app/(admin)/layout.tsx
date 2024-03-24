import "@/app/globals.css";
import { SheetSide } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import Link from "next/link";
import ChangeThemeButton from "../../components/blocks/changeTheme";
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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="dark" id="rootElement">
      <body>
        <div
          className={cn(
            "min-h-screen bg-background antialiased",
            noto_serif.className
          )}
        >
          <SheetSide />
          {children}
          <Link href="/" className="button-primary">
            website link
          </Link>
          <ChangeThemeButton />
        </div>
      </body>
    </html>
  );
}
