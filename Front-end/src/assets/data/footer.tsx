import Routes from "@/assets/data/route";
import website_logo_image from "@/assets/images/website-logo.png";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

const footerData = {
  logo: {
    src: website_logo_image,
    width: 300,
    height: 70,
    alt: "connect nikah logo",
  },
  description:
    "কানেক্ট নিকাহ হলো প্রধান বাংলাদেশী মুসলিম ম্যাট্রিমোনি ওয়েবসাইট, যা মানুষদের তাদের পূর্ণাঙ্গ জীবন সঙ্গী খুঁজে পেতে সহায়তা করে।",
  socialLinks: [
    {
      link: "https://www.facebook.com/connectnikahbd",
      icon: <FacebookIcon className="h-6 w-6" />,
    },
    {
      link: "https://www.twitter.com/connectnikahbd",
      icon: <TwitterIcon className="h-6 w-6" />,
    },
    {
      link: "https://www.linkedin.com/connectnikahbd",
      icon: <LinkedinIcon className="h-6 w-6" />,
    },
    {
      link: "https://www.youtube.com/connectnikahbd",
      icon: <YoutubeIcon className="h-6 w-6" />,
    },
  ],
  menus: [
    {
      title: "company",
      menus: [
        {
          title: "about us",
          href: Routes.Login,
        },
        {
          title: "our team",
          href: Routes.ourTeam,
        },
        {
          title: "careers",
          href: Routes.careers,
        },
      ],
    },
    {
      title: "help",
      menus: [
        {
          title: "support",
          href: Routes.support,
        },
        {
          title: "FAQs",
          href: Routes.FAQs,
        },
        {
          title: "contact-us",
          href: Routes.contactUs,
        },
      ],
    },
    {
      title: "explore",
      menus: [
        {
          title: "services",
          href: Routes.services,
        },
        {
          title: "affiliates",
          href: Routes.affiliates,
        },
        {
          title: "blog",
          href: Routes.blog,
        },
      ],
    },
  ],
  bottomInfo:
    "2024 <span class='capitalize'>connect nikah </span>. All rights reserved.",
};

export default footerData;
