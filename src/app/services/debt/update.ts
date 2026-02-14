import { httpClient } from "../httpClient";



export async function update(id: string) {
  const { data } = await httpClient.patch(`/Debt/${id}`, { IsPaid: true });
  return data;
}

