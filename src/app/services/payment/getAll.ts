import { httpClient } from "../httpClient";
import type { Payment } from "@/app/entities/payment";





type PaymentsResponse = Array<Payment>;

export async function getAll() {
    const { data } = await httpClient.get<PaymentsResponse>(
        "/Payment"
    );

    return data;
}