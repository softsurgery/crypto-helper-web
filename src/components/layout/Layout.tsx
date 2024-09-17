import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { items } from "./StaticMenu";

interface LayoutProps {
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ className }) => {
  return (
    <div
      className={cn("flex flex-1 overflow-hidden h-screen w-full flex-col", className)}
    >
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Sidebar items={items}/>
      </aside>
      
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header items={items}/>
        <main className="flex flex-1 overflow-auto flex-col w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};