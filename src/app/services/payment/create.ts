import { httpClient } from "../httpClient";

export interface CreatePaymentParams {
DebtId: string
InstallmentId: string
Amount: number
}

export async function create(params: CreatePaymentParams) {
  const { data } = await httpClient.post("/Payment", params);
  return data;
}
