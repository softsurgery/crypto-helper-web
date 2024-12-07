import { Permission } from "@/types/user-management";
import axios from "./axios";
import { PagedResponse } from "@/types/paged-response";

const findPaginated = async (
  page: number,
  size: number,
  searchTerm: string,
  sortKey: string,
  order: boolean
): Promise<PagedResponse<Permission>> => {
  const response = await axios.get<PagedResponse<Permission>>(
    "/api/permissions/list",
    {
      params: {
        page,
        size,
        search: searchTerm,
        sort: sortKey,
        order: order ? "asc" : "desc",
      },
    }
  );
  return response.data;
};

const findAll = async (): Promise<Permission[]> => {
  const response = await axios.get<Permission[]>(`api/permissions`);
  return response.data;
};

const findById = async (permissionId: number): Promise<Permission> => {
  const response = await axios.get<Permission>(
    `api/permissions/${permissionId}`
  );
  return response.data;
};

const create = async (Permission: Partial<Permission>): Promise<Permission> => {
  const response = await axios.post<Permission>("api/permissions", Permission);
  return response.data;
};

const update = async (
  permissionId: number,
  Permission: Partial<Permission>
): Promise<Permission> => {
  const response = await axios.put<Permission>(
    `api/permissions/${permissionId}`,
    Permission
  );
  return response.data;
};

const remove = async (permissionId: number): Promise<void> => {
  await axios.delete(`api/permissions/${permissionId}`);
};

const assignPermissionToRole = async (
  roleId: number,
  permissionId: number
): Promise<void> => {
  await axios.post(`api/roles/${roleId}/permissions/${permissionId}`);
};

const removePermissionFromRole = async (
  roleId: number,
  permissionId: number
): Promise<void> => {
  await axios.delete(`api/roles/${roleId}/permissions/${permissionId}`);
};

export const permission = {
  // Permissions
  findPaginated,
  findAll,
  findById,
  create,
  update,
  remove,
  // Role-Permission associations
  assignPermissionToRole,
  removePermissionFromRole,
};
