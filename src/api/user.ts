import { User } from "@/types/user-management";
import axios from "./axios";

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`api/users`);
  return response.data;
};

const fetchUserById = async (userId: number): Promise<User> => {
  const response = await axios.get<User>(`api/users/${userId}`);
  return response.data;
};

const fetchUserByUsername = async (username: string): Promise<User> => {
  const response = await axios.get<User>(`api/users/by-username/${username}`);
  return response.data;
};

const createUser = async (User: Partial<User>): Promise<User> => {
  const response = await axios.post<User>("api/users", User);
  return response.data;
};

const updateUser = async (
  userId: number,
  User: Partial<User>
): Promise<User> => {
  const response = await axios.put<User>(`api/users/${userId}`, User);
  return response.data;
};

const addFavouriteCoin = async (
  userId: number,
  coinId: number
): Promise<void> => {
  await axios.post(`api/users/${userId}/favourite-coins/${coinId}`);
};

const removeFavouriteCoin = async (
  userId: number,
  coinId: number
): Promise<void> => {
  await axios.delete(`api/users/${userId}/favourite-coins/${coinId}`);
};

const fetchFavouriteCoins = async (
  username: string
): Promise<User["favouriteCoins"]> => {
  const response = await axios.get<User["favouriteCoins"]>(
    `api/users/${username}/favourite-coins`
  );
  return response.data;
};

export const user = {
  fetchUsers,
  fetchUserById,
  fetchUserByUsername,
  createUser,
  updateUser,
  addFavouriteCoin,
  removeFavouriteCoin,
  fetchFavouriteCoins,
};
