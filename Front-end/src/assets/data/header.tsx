import Routes from "@/assets/data/routes";
import website_logo_image from "@/assets/images/website-logo.png";
import { Bookmark, BookOpenText, Group, HelpCircle, User } from "lucide-react";
export const header = {
  logo: {
    src: website_logo_image,
    width: 300,
    height: 70,
    alt: "connect nikah logo",
  },
  image: "@/",
  menus: [
    {
      title: "বায়ো ডাটা",
      href: Routes.bio,
    },
    {
      title: "বুকমার্ক",
      href: Routes.bookmark,
    },
    {
      title: "প্রশ্ন",
      href: Routes.FAQs,
    },
    {
      title: "আমাদের সম্পর্কে",
      href: Routes.aboutUs,
    },
  ],
  mobileMenu: [
    {
      title: "বায়ো ডাটা",
      href: Routes.bio,
      icon: <BookOpenText className="h-6 w-6" />,
    },
    {
      title: "বুকমার্ক",
      href: Routes.bookmark,
      icon: <Bookmark className="h-6 w-6" />,
    },
    {
      title: "প্রশ্ন",
      href: Routes.FAQs,
      icon: <HelpCircle className="h-6 w-6" />,
    },
    {
      title: "আমাদের সম্পর্কে",
      href: Routes.aboutUs,
      icon: <Group className="h-6 w-6" />,
    },
    {
      title: "প্রোফাইল",
      href: Routes.Profile,
      icon: <User className="h-6 w-6" />,
    },
  ],
};
