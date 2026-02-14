import { httpClient } from "../httpClient";
import type { Payment } from "@/app/entities/payment";





type PaymentsResponse = Array<Payment>;

export async function getAll(debtId: string, installmentId: string) {
    const { data } = await httpClient.get<PaymentsResponse>(
        `/Payment?debtId=${debtId}&installmentId=${installmentId}`
    );

    return data;
}