

import { httpClient } from "../httpClient";
import type { Debt } from "@/app/entities/debt";



type DebtResponse = Array<Debt>;

export async function getAll() {
    const { data } = await httpClient.get<DebtResponse>(
        "/Debt"
    );

    return data;
}