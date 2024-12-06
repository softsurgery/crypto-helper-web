import { Lock, PackageCheck, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import SidebarNav from "@/components/sidebar-nav";
import { Separator } from "@/components/ui/separator";

export function UserManagement() {
  return (
    <div>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          User Management
        </h1>
        <p className="text-muted-foreground">
          Manage user accounts, roles, and permissions effortlessly to ensure
          secure and efficient access control.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-hidden p-1 md:overflow-y-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    title: "Users",
    icon: <Users size={18} />,
    href: "/user-management/users",
  },
  {
    title: "Roles",
    icon: <PackageCheck size={18} />,
    href: "/user-management/roles",
  },
  {
    title: "Permissions",
    icon: <Lock size={18} />,
    href: "/user-management/permissions",
  },
];
