import { auth } from "./auth";
export * from "./auth";

import { coinCategory } from "./coin-category";
export * from "./coin-category";

import { coinData } from "./coin-data";
export * from "./coin-data";

import { userData } from "./user";
export * from "./user";

export const api = { auth, coinCategory, coinData, userData };
