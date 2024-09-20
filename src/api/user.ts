
import { UserData } from "@/types/user.dto";
import axios from "./axios";

const fetchUsers = async (): Promise<UserData[]> => {
  const response = await axios.get<UserData[]>(`api/users`);
  return response.data;
};

const fetchUserById = async (userId: number): Promise<UserData> => {
  const response = await axios.get<UserData>(`api/users/${userId}`);
  return response.data;
};

const fetchUserByUsername = async (username: string): Promise<UserData> => {
  const response = await axios.get<UserData>(`api/users/by-username/${username}`);
  return response.data;
};

const createUser = async (userData: Partial<UserData>): Promise<UserData> => {
  const response = await axios.post<UserData>('api/users', userData);
  return response.data;
};

const updateUser = async (userId: number, userData: Partial<UserData>): Promise<UserData> => {
  const response = await axios.put<UserData>(`api/users/${userId}`, userData);
  return response.data;
};

const addFavouriteCoin = async (userId: number, coinId: number): Promise<void> => {
  await axios.post(`api/users/${userId}/favourite-coins/${coinId}`);
};

const removeFavouriteCoin = async (userId: number, coinId: number): Promise<void> => {
  await axios.delete(`api/users/${userId}/favourite-coins/${coinId}`);
};

const fetchFavouriteCoins = async (username: string): Promise<UserData["favouriteCoins"]> => {
  const response = await axios.get<UserData["favouriteCoins"]>(`api/users/${username}/favourite-coins`);
  return response.data;
};

export const userData = {
  fetchUsers,
  fetchUserById,
  fetchUserByUsername,
  createUser,
  updateUser,
  addFavouriteCoin,
  removeFavouriteCoin,
  fetchFavouriteCoins,
};
