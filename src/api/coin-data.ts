import { CoinData } from "@/types/coin-data.response";
import axios from "./axios";

const fetch = async (source: string = '', page: number = 1): Promise<CoinData[]> => {
  const url = source ? `api/web-data/by-category?source=${source}&` : 'api/web-data/coins?'
  const response = await axios.get<CoinData[]>(
    `${url}page=${page}`
  );
  return response.data;
};

export const coinData = { fetch };
