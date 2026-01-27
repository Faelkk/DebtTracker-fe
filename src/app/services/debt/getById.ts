

import { httpClient } from "../httpClient";
import type { Debt } from "@/app/entities/debt";



type DebtResponse = Debt

export async function getById(id: string) {
    const { data } = await httpClient.get<DebtResponse>(
        `/Debt/${id}`
    );

    return data;
}