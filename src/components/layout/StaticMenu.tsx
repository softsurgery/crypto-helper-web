import {
  ChartNoAxesCombined,
  Gem,
  LogOut,
  Network,
  Settings,
} from "lucide-react";

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
    title: "Visualizer",
    href: "/visualizer",
    icon: <Network />,
  },
  {
    id: 4,
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
  },
  {
    id: 5,
    title: "Logout",
    href: "/logout",
    icon: <LogOut />,
  },
];
