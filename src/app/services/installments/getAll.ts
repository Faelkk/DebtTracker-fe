
import { httpClient } from "../httpClient";
import type { Installment } from "@/app/entities/installment";



type InstallmentsResponse = Array<Installment>;

export async function getAll(debtId: string) {
    const { data } = await httpClient.get<InstallmentsResponse>(
        `/Installment?debtId=${debtId}`
    );

    return data;
}