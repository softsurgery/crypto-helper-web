import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelLeft, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ResponsiveSidebar } from "./ResponsiveSidebar";
import { MenuItem } from "./StaticMenu";
import { useNavigate } from "react-router-dom";
import { BreadcrumbCommon } from "../common/Breadcrumb";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

interface HeaderProps {
  className?: string;
  items?: MenuItem[];
}

export const Header: React.FC<HeaderProps> = ({ className, items }) => {
  const { routes } = useBreadcrumb();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className={cn("sm:max-w-xs", className)}>
          <ResponsiveSidebar items={items} />
        </SheetContent>
      </Sheet>
     {/* Breadcrumb */}
     <BreadcrumbCommon hierarchy={routes} />
      <div className="relative ml-auto flex-1 md:grow-0">
        
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/logout")}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

{
  /*  */
}
