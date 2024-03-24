import "@/app/globals.css";
import DesktopHeader from "@/components/sections/header";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

const primaryFont = localFont({
  src: "../assets/font/SolaimanLipi.woff2",
  variable: "--font-SolaimanLipi",
  display: "swap",
});

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

export const metadata: Metadata = {
  title:
    "কানেক্ট নিকাহ - বাংলাদেশী মুসলিম ম্যাট্রিমোনি | Connect Nikah - Bangladeshi Muslim Matrimony",
  description:
    "কানেক্ট নিকাহ হলো প্রধান বাংলাদেশী মুসলিম ম্যাট্রিমোনি ওয়েবসাইট, যা মানুষদের তাদের পূর্ণাঙ্গ জীবন সঙ্গী খুঁজে পেতে সহায়তা করে। Connect Nikah is the leading Bangladeshi Muslim matrimony website, helping people find their perfect life partners.",
  metadataBase: new URL("https://www.connectnikah.com"),
  generator: "Connect Nikah",
  keywords: [
    "Connect Nikah",
    "Bangladeshi Muslim Matrimony",
    "Marriage",
    "Matchmaking",
    "bibaho",
    "shadi",
    "patro",
    "patri",
    "নিকাহ",
    "কানেক্ট নিকাহ",
    "বাংলাদেশ",
    "ম্যাট্রিমোনি",
    "বিয়ে",
    "বিবাহ",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Connect Nikah Team",
  publisher: "Connect Nikah",
  category: "marriage",
  applicationName: "Connect Nikah | কানেক্ট নিকাহ",
  authors: [
    { name: "shorif" },
    {
      name: "Connect Nikah Team",
      url: new URL("https://www.connectnikah.com"),
    },
  ],
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  // share card
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    url: "https://www.connectnikah.com",
    siteName: "Next.js",
    images: [
      {
        url: "https://www.connectnikah.com/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://www.connectnikah.com/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // search engine bot
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // FILE BASED ICON

  manifest: "https://www.connectnikah.com/manifest.json",
  twitter: {
    card: "app",
    title: "Next.js",
    description: "The React Framework for the Web",
    siteId: "1467726470533754880",
    creator: "@nextjs",
    creatorId: "1467726470533754880",
    images: {
      url: "https://www.connectnikah.com/og.png",
      alt: "Next.js Logo",
    },
    app: {
      name: "twitter_app",
      id: {
        iphone: "twitter_app://iphone",
        ipad: "twitter_app://ipad",
        googleplay: "twitter_app://googleplay",
      },
      url: {
        iphone: "https://iphone_url",
        ipad: "https://ipad_url",
      },
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },
  //  APPLE APP
  alternates: {
    canonical: "https://www.connectnikah.com",
    languages: {
      "en-US": "https://www.connectnikah.com/en-US",
      "de-DE": "https://www.connectnikah.com/de-DE",
    },
    media: {
      "only screen and (max-width: 450px)":
        "https://www.connectnikah.com/mobile",
    },
    types: {
      "application/rss+xml": "https://www.connectnikah.com/rss",
    },
  },
  // APPS

  archives: ["https://www.connectnikah.com/about"],
  assets: ["https://www.connectnikah.com/assets"],
  bookmarks: ["https://www.connectnikah.com/about"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="dark" id="rootElement">
      <body
        className={cn(
          "min-h-screen bg-background font-primary  antialiased",
          primaryFont.variable
        )}
      >
        <DesktopHeader />
        {children}
      </body>
    </html>
  );
}
