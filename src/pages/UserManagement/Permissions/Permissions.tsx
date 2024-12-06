import ContentSection from "@/components/common/ContentSection";
import { DataTable } from "./data-table/data-table";
import { getPermissionColumns } from "./data-table/columns";
import React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { PermissionActionsContext } from "./data-table/action-context";

export default function Permissions() {
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
    data: permissionsResponse,
    isPending: isPermissionsPending,
    refetch: refetchPermissions,
  } = useQuery({
    queryKey: [
      "permissions",
      debouncedPage,
      debouncedSize,
      debouncedSortDetails.order,
      debouncedSortDetails.sortKey,
      debouncedSearchTerm,
    ],
    queryFn: () =>
      api.permission.findPaginated(
        debouncedPage - 1,
        debouncedSize,
        debouncedSearchTerm,
        debouncedSortDetails.sortKey,
        debouncedSortDetails.order
      ),
  });

  const permissions = React.useMemo(() => {
    console.log("Permission", permissionsResponse);
    if (!permissionsResponse) return [];
    return permissionsResponse.content;
  }, [permissionsResponse]);

  const context = {
    //search, filtering, sorting & paging
    searchTerm,
    setSearchTerm,
    page,
    totalPageCount: permissionsResponse?.totalPages,
    setPage,
    size,
    setSize,
    order: sortDetails.order,
    sortKey: sortDetails.sortKey,
    setSortDetails: (order: boolean, sortKey: string) =>
      setSortDetails({ order, sortKey }),
  };

  const isPending =
    isPermissionsPending || paging || resizing || searching || sorting;
  return (
    <ContentSection
      title="Permissions"
      desc="Set and manage permissions to control access to features and resources securely and efficiently."
    >
      <PermissionActionsContext.Provider value={context}>
        <DataTable
          className="my-2"
          columns={getPermissionColumns()}
          data={permissions}
          isPending={isPending}
        />
      </PermissionActionsContext.Provider>
    </ContentSection>
  );
}
