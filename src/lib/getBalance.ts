import { api } from "./axios";

export interface BalanceResponse {
  balance: string;
  available_balance: string;
  frozen_balance: string;
  currency: string;
}

export async function getUserBalance(): Promise<BalanceResponse> {
  const { data } = await api.get<BalanceResponse>("/wallet/balance");
  return data;
}
