import { auth } from "./auth";
export * from "./auth";

import { coinCategory } from "./coin-category";
export * from "./coin-category";

import { coinData } from "./coin-data";
export * from "./coin-data";

import { user } from "./user";
export * from "./user";

import { role } from "./role";
export * from "./role";

import { permission } from "./permission";
export * from "./permission";

export const api = { auth, coinCategory, coinData, user, role, permission };
