import { PagedResponse } from "@/types/paged-response";
import axios from "./axios";
import { Role } from "@/types/user-management";

const findPaginated = async (
  page: number,
  size: number,
  searchTerm: string,
  sortKey: string,
  order: boolean
): Promise<PagedResponse<Role>> => {
  const response = await axios.get<PagedResponse<Role>>(
    "/api/roles/list",
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

const findAll = async (): Promise<Role[]> => {
  const response = await axios.get<Role[]>(`api/roles`);
  return response.data;
};

const findById = async (roleId: number): Promise<Role> => {
  const response = await axios.get<Role>(`api/roles/${roleId}`);
  return response.data;
};

const create = async (Role: Partial<Role>): Promise<Role> => {
  const response = await axios.post<Role>('api/roles', Role);
  return response.data;
};

const update = async (roleId: number, Role: Partial<Role>): Promise<Role> => {
  const response = await axios.put<Role>(`api/roles/${roleId}`, Role);
  return response.data;
};

const remove = async (roleId: number): Promise<void> => {
  await axios.delete(`api/roles/${roleId}`);
};


export const role = {
  findPaginated,
  findAll,
  findById,
  create,
  update,
  remove
};
