import { CoinData } from "./coin-data.response";

export interface User {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  favouriteCoins: CoinData[];
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[];
}

export interface Permission{
  id: number;
  name: string;
  description: string;
  roles: Role[];
}
