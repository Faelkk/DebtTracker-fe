import { httpClient } from "../httpClient";

export interface CreateDebtParams {
  debtorId: string;
  creditorId: string;
  description: string;
  totalAmount: number;
  installments: number;
  dueDate: string; 
}

export async function create(params: CreateDebtParams) {
  const { data } = await httpClient.post("/Debt", params);
  return data;
}
