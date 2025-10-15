import { httpClient } from "../httpClient";


export async function me() {
    const { data } = await httpClient.post(
        "/user/me",
    );

    return data;
}