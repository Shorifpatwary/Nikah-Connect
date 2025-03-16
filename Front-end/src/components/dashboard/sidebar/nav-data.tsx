import {
  BookHeart,
  CandlestickChart,
  Eye,
  HelpCircle,
  Home,
  Settings,
  ShoppingCart,
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
    title: "coins",
    path: "/admin/coin",
    icon: <BookHeart />,
  },
  {
    title: "views",
    path: "/admin/bio/view",
    icon: <Eye />,
  },
  {
    title: "purchases",
    path: "/admin/bio/purchase",
    icon: <ShoppingCart />,
  },
  {
    title: "Attributes",
    path: "",
    icon: <Settings />,
    submenu: true,
    subMenuItems: [{ title: "tag", path: "/admin/tag" }],
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
