

import { httpClient } from "../httpClient";
import type { User } from "@/app/entities/user";



type UserResponse = Array<User>;

export async function getAll() {
    const { data } = await httpClient.get<UserResponse>(
        "/user"
    );

    return data;
}