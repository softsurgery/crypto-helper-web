import React from "react";
import { ChartBar } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuItem } from "./StaticMenu";
import { Link, useLocation } from "react-router-dom";

interface ResponisveSidebarProps {
  className?: string;
  items?: MenuItem[];
}

export const ResponsiveSidebar: React.FC<ResponisveSidebarProps> = ({
  className,
  items,
}) => {
  const location = useLocation();
  return (
    <nav className={cn("grid gap-6 text-lg font-medium", className)}>
      <Link
        to="/"
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <ChartBar className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Crypto Helper</span>
      </Link>
      {items?.map((item) => {
        return (
          <Link
            to={item.href}
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              location.pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};