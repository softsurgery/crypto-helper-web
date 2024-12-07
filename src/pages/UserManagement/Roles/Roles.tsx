import { api } from "@/api";
import ContentSection from "@/components/common/ContentSection";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RoleActionsContext } from "./data-table/action-context";
import { DataTable } from "./data-table/data-table";
import { getRoleColumns } from "./data-table/columns";

export default function Roles() {
  const [page, setPage] = React.useState<number>(1);
  const { value: debouncedPage, loading: paging } = useDebounce<number>(
    page,
    500
  );
  const [size, setSize] = React.useState<number>(5);
  const { value: debouncedSize, loading: resizing } = useDebounce<number>(
    size,
    500
  );

  const [sortDetails, setSortDetails] = React.useState({
    order: true,
    sortKey: "id",
  });
  const { value: debouncedSortDetails, loading: sorting } = useDebounce<
    typeof sortDetails
  >(sortDetails, 500);

  const [searchTerm, setSearchTerm] = React.useState("");
  const { value: debouncedSearchTerm, loading: searching } =
    useDebounce<string>(searchTerm, 500);

  const {
    data: rolesResponse,
    isPending: isRolesPending,
    // refetch: refetchRoles,
  } = useQuery({
    queryKey: [
      "roles",
      debouncedPage,
      debouncedSize,
      debouncedSortDetails.order,
      debouncedSortDetails.sortKey,
      debouncedSearchTerm,
    ],
    queryFn: () =>
      api.role.findPaginated(
        debouncedPage - 1,
        debouncedSize,
        debouncedSearchTerm,
        debouncedSortDetails.sortKey,
        debouncedSortDetails.order
      ),
  });

  const roles = React.useMemo(() => {
    if (!rolesResponse) return [];
    return rolesResponse.content;
  }, [rolesResponse]);

  const context = {
    //search, filtering, sorting & paging
    searchTerm,
    setSearchTerm,
    page,
    totalPageCount: rolesResponse?.totalPages || 0,
    setPage,
    size,
    setSize,
    order: sortDetails.order,
    sortKey: sortDetails.sortKey,
    setSortDetails: (order: boolean, sortKey: string) =>
      setSortDetails({ order, sortKey }),
  };

  const isPending =
    isRolesPending || paging || resizing || searching || sorting;
  return (
    <ContentSection
      title="Roles"
      desc="Define and assign roles to streamline permissions and access control for users."
    >
     <RoleActionsContext.Provider value={context}>
        <DataTable
          className="my-2"
          columns={getRoleColumns()}
          data={roles}
          isPending={isPending}
        />
      </RoleActionsContext.Provider>
    </ContentSection>
  );
}
