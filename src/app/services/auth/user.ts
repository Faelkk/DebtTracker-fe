import { httpClient } from "../httpClient";


export async function me() {
    const { data } = await httpClient.get(
        "/user/me",
    );

    console.log("Fetched user data:", data); // Log the fetched user data for debugging

    return data;
}