import { httpClient } from "../httpClient";
import type { User } from "@/app/entities/user";


type UserResponse = User

export async function getById(userId: string): Promise<UserResponse> {
    const { data } = await httpClient.get<UserResponse>(
        `/user/${userId}`
    );

    return data;
}