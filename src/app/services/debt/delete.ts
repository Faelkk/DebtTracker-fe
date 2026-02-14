import { httpClient } from "../httpClient";



export async function deleteDebt(id: string) {
  const { data } = await httpClient.delete(`/Debt/${id}`);
  return data;
}

