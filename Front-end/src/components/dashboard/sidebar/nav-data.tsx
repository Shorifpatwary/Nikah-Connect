import {
  BookHeart,
  CandlestickChart,
  HelpCircle,
  Home,
  Settings,
  Users,
} from "lucide-react";

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
    path: "/admin/setting",
    icon: <Settings />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/admin/settings/account" },
      { title: "Privacy", path: "/admin/settings/privacy" },
    ],
  },
  {
    title: "marketing",
    path: "/marketing",
    icon: <CandlestickChart />,
    submenu: true,
    subMenuItems: [
      { title: "users info", path: "/admin/marketing/user-info" },
      { title: "analytics", path: "/admin/marketing/analytics" },
    ],
  },
  {
    title: "Help",
    path: "/admin/help",
    icon: <HelpCircle />,
  },
];
