import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Role } from "@/types/user-management";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const getRoleColumns = (): ColumnDef<Role>[] => {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
          attribute="name"
        />
      ),
      cell: ({ row }) => <div>{row.original.name}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Description"
          attribute="description"
        />
      ),
      cell: ({ row }) => (
        <div>{row.original.description || "No Description"}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "permissions",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Permissions"
          attribute="permissions"
        />
      ),
      cell: ({ row }) => {
        const permissions = row.original.permissions;

        if (permissions.length === 0) {
          return <div className="opacity-70">No Permissions</div>;
        }

        const visiblePermissions = permissions.slice(0, 2); // Show first 3 permissions
        const hiddenPermissions = permissions.length - visiblePermissions.length;

        return (
          <div>
            <div className="line-clamp-1">
              {visiblePermissions.map((permission, index) => (
                <span key={index} className="mr-1">{permission.name}{index < visiblePermissions.length - 1 && ", "}</span>
              ))}
              {hiddenPermissions > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="font-extralight cursor-pointer mx-1">
                      {`+${hiddenPermissions} more`}
                    </TooltipTrigger>
                    <TooltipContent>
                      {permissions.slice(2).map((permission, index) => (
                        <p key={index}>{permission.name}</p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
  ];
};
