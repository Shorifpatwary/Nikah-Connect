import { BookHeart, HelpCircle, Home, Settings, Users } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
export const SideNavItems: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin",
    icon: <Home />,
  },
  {
    title: "Users",
    path: "/admin/user",
    icon: <Users />,
  },
  {
    title: "bios",
    path: "/admin/bio",
    icon: <BookHeart />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: <HelpCircle />,
  },
];
