import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { Outlet, useNavigate } from "react-router-dom";
import { items } from "./StaticMenu";
import React from "react";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ className }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const authKey = localStorage.getItem("authToken");
    if (!authKey) {
      navigate("/authentication");
    }
  }, [navigate]);

  if (localStorage.getItem("authToken"))
    return (
      <div
        className={cn(
          "flex flex-1 overflow-hidden h-screen w-full flex-col",
          className
        )}
      >
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <Sidebar items={items} />
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden sm:gap-4 sm:py-4 sm:pl-14">
          <Header items={items} />
          <main className="flex flex-1 overflow-auto flex-col w-full px-10">
            <Outlet />
          </main>
        </div>
      </div>
    );
};
