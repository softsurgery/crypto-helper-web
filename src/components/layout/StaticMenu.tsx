import { ChartNoAxesCombined, Gem, Settings, UsersIcon } from "lucide-react";

export interface MenuItem {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const items: MenuItem[] = [
  {
    id: 1,
    title: "My Coins",
    href: "/coins",
    icon: <Gem />,
  },
  {
    id: 2,
    title: "Analytics",
    href: "/analytics",
    icon: <ChartNoAxesCombined />,
  },
  {
    id: 3,
    title: "User Management",
    href: "/user-management",
    icon: <UsersIcon />,
  },
  {
    id: 4,
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
];
