import axios from "./axios";
import { CoinCategory } from "@/types/coin-catgeory.response";

const fetch = async ():Promise<CoinCategory[]> => {
  const response = await axios.get<CoinCategory[]>(`/api/coin-categories/all`);
  return response.data;
};

export const coinCategory = { fetch };
