import { httpClient } from "../httpClient";


export async function me() {
    const { data } = await httpClient.get(
        "/user/me",
    );

    return data;
}