import axios from "./axios";
import { Role } from "@/types/user-management";

const fetchRoles = async (): Promise<Role[]> => {
  const response = await axios.get<Role[]>(`api/roles`);
  return response.data;
};

const fetchRoleById = async (roleId: number): Promise<Role> => {
  const response = await axios.get<Role>(`api/roles/${roleId}`);
  return response.data;
};

const createRole = async (Role: Partial<Role>): Promise<Role> => {
  const response = await axios.post<Role>('api/roles', Role);
  return response.data;
};

const updateRole = async (roleId: number, Role: Partial<Role>): Promise<Role> => {
  const response = await axios.put<Role>(`api/roles/${roleId}`, Role);
  return response.data;
};

const deleteRole = async (roleId: number): Promise<void> => {
  await axios.delete(`api/roles/${roleId}`);
};


export const role = {
  fetchRoles,
  fetchRoleById,
  createRole,
  updateRole,
  deleteRole,
};
