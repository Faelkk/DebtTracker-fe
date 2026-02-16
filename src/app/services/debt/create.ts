import { httpClient } from "../httpClient";

export interface CreateDebtParams {
  debtorName: string;
  creditorName: string
  description: string;
  totalAmount: number;
  installments: number;
  dueDate: string; 
  isMyDebt: boolean;
}

export async function create(params: CreateDebtParams) {
  const { data } = await httpClient.post("/Debt", params);
  return data;
}

