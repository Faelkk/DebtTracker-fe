
import { httpClient } from "../httpClient";
import type { Installment } from "@/app/entities/installment";



type InstallmentsResponse = Array<Installment>;

export async function getAll() {
    const { data } = await httpClient.get<InstallmentsResponse>(
        "/Installment"
    );

    return data;
}