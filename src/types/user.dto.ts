import { CoinData } from "./coin-data.response";

export interface UserData {
    id: number;
    username: string;
    email: string;
    role: {
      id: number;
      name: string;
    };
    favouriteCoins: CoinData[];
  }